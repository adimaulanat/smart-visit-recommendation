import { GoogleGenerativeAI } from '@google/generative-ai';

interface GeminiRecommendationInput {
  attraction: any;
  weatherData: any[];
  crowdData: any[];
  selectedDate?: string;
  preferences: {
    budgetRange: 'low' | 'medium' | 'high';
    groupSize: number;
    interests: string[];
    avoidCrowds: boolean;
  };
}

// IMPORTANT: Vite uses import.meta.env instead of process.env
function getGeminiAPI() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY not found. Please add it to .env.local');
  }

  return new GoogleGenerativeAI(apiKey);
}

export async function getAIRecommendations(
  input: GeminiRecommendationInput
): Promise<any> {
  const genAI = getGeminiAPI();
  
  // Use Gemini 1.5 Flash for speed (or gemini-1.5-pro for better quality)
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 4096,
    }
  });

  const prompt = buildPrompt(input);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    let jsonText = text;
    
    // Remove markdown code blocks if present
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonText = codeBlockMatch[1];
    }

    // Find JSON object
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Raw Gemini response:', text);
      throw new Error('No valid JSON in Gemini response');
    }

    const recommendations = JSON.parse(jsonMatch[0]);
    return recommendations;
  } catch (error: any) {
    console.error('Gemini API error:', error);
    
    if (error.message?.includes('API_KEY_INVALID')) {
      throw new Error('Invalid Gemini API key. Check your .env.local file');
    }
    if (error.message?.includes('QUOTA_EXCEEDED')) {
      throw new Error('Gemini API quota exceeded. Try again later or upgrade');
    }
    
    throw new Error(`AI recommendations failed: ${error.message}`);
  }
}

function buildPrompt(input: GeminiRecommendationInput): string {
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
      "pricing": {"basePrice": ${input.attraction.basePrice || 50}, "dynamicPrice": ${(input.attraction.basePrice || 50) * 0.9}, "discount": ${(input.attraction.basePrice || 50) * 0.1}, "reason": "Weekday discount"},
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

// Cache in localStorage
const CACHE_KEY = 'gemini_recommendations';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedRecommendations(
  input: GeminiRecommendationInput
): Promise<any> {
  const cacheKey = `${CACHE_KEY}_${input.attraction.id}_${input.selectedDate || 'any'}`;
  
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log('✅ Using cached recommendations');
        return data;
      }
    }
  } catch (e) {
    console.error('Cache read error:', e);
  }
  
  console.log('🔄 Fetching fresh recommendations...');
  const recommendations = await getAIRecommendations(input);
  
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      data: recommendations,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.error('Cache write error:', e);
  }
  
  return recommendations;
}

// Test connection
export async function testGeminiConnection(): Promise<boolean> {
  try {
    const genAI = getGeminiAPI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent("Say hello in JSON: {\"message\": \"...\"}");
    const response = await result.response;
    
    console.log('✅ Gemini connected:', response.text());
    return true;
  } catch (error: any) {
    console.error('❌ Gemini test failed:', error.message);
    return false;
  }
}

// Legacy adapter functions for backward compatibility
export async function generateDateRecommendations(
  attraction: any,
  weatherData: any[],
  crowdData: any[]
): Promise<any[]> {
  try {
    // Adapt old structure to new API
    const input = {
      attraction: {
        ...attraction,
        category: attraction.type || 'attraction',
        location: { city: attraction.location || 'Unknown' },
        capacity: 20000,
        basePrice: 50,
      },
      weatherData,
      crowdData,
      preferences: {
        budgetRange: 'medium' as const,
        groupSize: 2,
        interests: [attraction.type || 'general'],
        avoidCrowds: false,
      },
    };

    const result = await getCachedRecommendations(input);
    
    // Map new structure back to old structure
    return result.recommendedDates.map((rec: any) => ({
      date: rec.date,
      score: rec.score,
      weather: rec.weather,
      crowdLevel: rec.crowd,
      aiInsight: rec.reasons.join('. '),
      pros: rec.reasons,
      cons: [],
    }));
  } catch (error) {
    console.error('Error in generateDateRecommendations:', error);
    // Return mock data as fallback
    return weatherData.map((weather, i) => ({
      date: weather.date,
      score: 70 + Math.random() * 20,
      weather,
      crowdLevel: crowdData[i],
      aiInsight: 'Good day to visit with favorable conditions.',
      pros: ['Good weather', 'Moderate crowds'],
      cons: [],
    }));
  }
}

export async function generateAlternatives(
  currentAttraction: any,
  allAttractions: any[]
): Promise<any[]> {
  // Simple similarity matching as fallback
  return allAttractions
    .filter(a => a.id !== currentAttraction.id && a.type === currentAttraction.type)
    .slice(0, 3)
    .map(a => ({
      ...a,
      similarityScore: 70 + Math.random() * 25,
      reason: `Similar ${currentAttraction.type} experience with unique appeal`,
    }));
}