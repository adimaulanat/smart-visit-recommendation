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

    // Define fallback models in order of preference
    const models = [
      "gemini-2.5-flash",
      "gemini-2.0-flash-lite",
      "gemini-2.0-flash",
      "gemini-2.5-pro"
    ];

    let data;
    let lastError;

    // Try each model until one succeeds
    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`);
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
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

        const responseData = await response.json();

        if (!response.ok) {
          const errorCode = responseData?.error?.code;
          const errorStatus = responseData?.error?.status;
          
          console.error(`Model ${model} error:`, JSON.stringify(responseData, null, 2));
          
          // If overloaded (503) or unavailable, try next model
          if (errorCode === 503 || errorStatus === "UNAVAILABLE") {
            console.log(`Model ${model} is overloaded, trying next model...`);
            lastError = responseData;
            continue;
          }
          
          // For other errors, throw immediately
          throw new Error(`Gemini API failed: ${response.status} - ${JSON.stringify(responseData)}`);
        }

        // Success! Use this response
        data = responseData;
        console.log(`✅ Successfully got response from model: ${model}`);
        break;
        
      } catch (error) {
        console.error(`Error with model ${model}:`, error);
        lastError = error;
        // Try next model
        continue;
      }
    }

    // If all models failed, throw error
    if (!data) {
      console.error("All models failed. Last error:", lastError);
      throw new Error(`All Gemini models are unavailable. Please try again later.`);
    }

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
