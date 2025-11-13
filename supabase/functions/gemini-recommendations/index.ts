import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('VITE_GEMINI_API_KEY');
    
    if (!apiKey) {
      console.error('VITE_GEMINI_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { input } = await req.json();
    
    console.log('Generating recommendations for:', input.attraction?.name);

    // Build the prompt
    const prompt = buildPrompt(input);

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API failed: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No text in Gemini response');
    }

    // Extract JSON from response
    let jsonText = text;
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonText = codeBlockMatch[1];
    }

    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Raw Gemini response:', text);
      throw new Error('No valid JSON in Gemini response');
    }

    const recommendations = JSON.parse(jsonMatch[0]);
    
    console.log('✅ Recommendations generated successfully');

    return new Response(
      JSON.stringify(recommendations),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in gemini-recommendations:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function buildPrompt(input: any): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `You are an AI travel recommendation assistant. Analyze the data and provide recommendations in JSON format.

CONTEXT:
- Attraction: ${input.attraction.name}
- Category: ${input.attraction.category}
- Location: ${input.attraction.location.city}
- Capacity: ${input.attraction.capacity}
- Base Price: $${input.attraction.basePrice}
- Selected Date: ${input.selectedDate || 'Not specified - recommend best dates'}
- Current Date: ${currentDate}

USER PREFERENCES:
- Budget: ${input.preferences.budgetRange}
- Group Size: ${input.preferences.groupSize}
- Interests: ${input.preferences.interests.join(', ')}
- Avoid Crowds: ${input.preferences.avoidCrowds}

WEATHER DATA (next 14 days):
${JSON.stringify(input.weatherData.slice(0, 14), null, 2)}

CROWD PREDICTIONS (next 14 days):
${JSON.stringify(input.crowdData.slice(0, 14), null, 2)}

SCORING:
1. Weather (40 pts): 20-28°C, sunny = best
2. Crowd (35 pts): <40% capacity = best
3. Price (15 pts): Higher discounts = better
4. Events (10 pts): Special events = bonus

OUTPUT (JSON only):
{
  "recommendedDates": [
    {
      "date": "2025-11-20",
      "dayOfWeek": "Thursday",
      "score": 92,
      "scoreBreakdown": {"weather": 38, "crowd": 32, "price": 14, "events": 8},
      "weather": {"temperature": 24, "condition": "sunny", "precipitation": 5},
      "crowd": {"level": "low", "score": 25, "expectedVisitors": 8500, "capacityPercentage": 42},
      "pricing": {"basePrice": ${input.attraction.basePrice}, "dynamicPrice": ${input.attraction.basePrice * 0.9}, "discount": ${input.attraction.basePrice * 0.1}, "reason": "Weekday discount"},
      "reasons": ["Perfect weather", "Low crowds", "Discount available"],
      "badges": ["best-weather", "best-value"]
    }
  ],
  "insights": [
    {"type": "tip", "title": "Best Time", "message": "Arrive early to avoid crowds", "confidence": "high", "icon": "lightbulb"}
  ],
  "confidence": 0.92
}`;
}
