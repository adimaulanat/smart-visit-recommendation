import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("VITE_GEMINI_API_KEY");

    if (!apiKey) {
      console.error("VITE_GEMINI_API_KEY not configured");
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { input } = await req.json();

    console.log("Generating recommendations for:", input.attraction?.name);

    // Build the prompt
    const prompt = buildPrompt(input);

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
            responseModalities: ["TEXT"],
          },
          systemInstruction: {
            parts: [{ text: "Respond directly without extended reasoning. Analyze data and return JSON immediately." }]
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      throw new Error(`Gemini API failed: ${response.status}`);
    }

    const data = await response.json();

    // Log the full response for debugging
    console.log("Gemini response:", JSON.stringify(data, null, 2));

    // Check for safety ratings or other issues
    if (
      data.candidates?.[0]?.finishReason &&
      data.candidates[0].finishReason !== "STOP"
    ) {
      console.error(
        "Full Gemini payload:",
        JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          },
        })
      );
      console.error("Gemini finish reason:", data.candidates[0].finishReason);
      console.error("Safety ratings:", data.candidates[0].safetyRatings);
      throw new Error(
        `Gemini blocked response: ${data.candidates[0].finishReason}`
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("Full Gemini response:", JSON.stringify(data, null, 2));
      throw new Error("No text in Gemini response");
    }

    // Extract JSON from response
    let jsonText = text;
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonText = codeBlockMatch[1];
    }

    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Raw Gemini response:", text);
      throw new Error("No valid JSON in Gemini response");
    }

    const recommendations = JSON.parse(jsonMatch[0]);

    console.log("✅ Recommendations generated successfully");

    return new Response(JSON.stringify(recommendations), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in gemini-recommendations:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function buildPrompt(input: any): string {
  // Compact weather data - only 7 days, no humidity
  const weatherSummary = input.weatherData
    .slice(0, 7)
    .map(
      (w: {
        date: string;
        temperature: number;
        condition: string;
        precipitation: number;
      }) =>
        `${w.date}|${w.temperature}°C|${w.condition}|${w.precipitation}%`
    )
    .join("\n");

  // Simplified crowd data - only visitors and capacity%
  const crowdSummary = input.crowdData
    .slice(0, 7)
    .map(
      (c: {
        date: string;
        expectedVisitors: number;
        capacityPercentage: number;
      }) =>
        `${c.date}|${c.expectedVisitors}|${c.capacityPercentage}%`
    )
    .join("\n");

  const avoidCrowds = input.preferences.avoidCrowds ? "avoid crowds" : "crowds OK";

  return `Analyze the provided 7 days of data to recommend the top 3 best visit dates for ${input.attraction.name}.

ATTRACTION: ${input.attraction.name} | Capacity: ${input.attraction.capacity} | Base Price: IDR ${input.attraction.basePrice.toLocaleString()}
USER PREFERENCES: ${input.preferences.budgetRange} budget, ${input.preferences.groupSize} people, ${avoidCrowds}.

SCORING (100pts total):
- Weather (40pts): 26-30°C and low precipitation is best. Sunny/partly cloudy is a bonus.
- Crowd (35pts): <40% capacity=35pts; 40-60%=25pts; >60%=10pts.
- Price (15pts): Assume discounts on low-crowd days and premium prices on weekends.
- Events (10pts): No events data provided.

WEATHER DATA (date|temp|condition|precip%):
${weatherSummary}

CROWD DATA (date|visitors|capacity%):
${crowdSummary}

Return a JSON object with the top 3 dates based on your analysis. Use this exact structure:
{
  "recommendedDates": [
    {
      "date": "YYYY-MM-DD",
      "dayOfWeek": "string",
      "score": integer,
      "scoreBreakdown": {"weather": integer, "crowd": integer, "price": integer, "events": integer},
      "weather": {"temperature": integer, "condition": "string", "precipitation": integer},
      "crowd": {"level": "string", "expectedVisitors": integer, "capacityPercentage": integer},
      "pricing": {"dynamicPrice": integer, "reason": "string"},
      "reasons": ["string"],
      "badges": ["string"]
    }
  ],
  "insights": [
    {"type": "tip", "title": "Best Time to Visit", "message": "string"}
  ]
}`;
}
