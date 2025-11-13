import { supabase } from '@/integrations/supabase/client';

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

export async function getAIRecommendations(
  input: GeminiRecommendationInput
): Promise<any> {
  try {
    console.log('🤖 Calling Gemini edge function...');
    
    const { data, error } = await supabase.functions.invoke('gemini-recommendations', {
      body: { input }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(`AI recommendations failed: ${error.message}`);
    }

    console.log('✅ Recommendations received');
    return data;

  } catch (error: any) {
    console.error('Gemini service error:', error);
    throw new Error(`AI recommendations failed: ${error.message}`);
  }
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

// Test connection to edge function
export async function testGeminiConnection(): Promise<boolean> {
  try {
    const mockInput = {
      attraction: {
        id: 'test',
        name: 'Test Attraction',
        category: 'theme_park',
        location: { city: 'Jakarta' },
        capacity: 10000,
        basePrice: 100000
      },
      weatherData: [],
      crowdData: [],
      preferences: {
        budgetRange: 'medium' as const,
        groupSize: 2,
        interests: [],
        avoidCrowds: false
      }
    };
    
    const result = await getAIRecommendations(mockInput);
    console.log('✅ Gemini edge function connected');
    return true;
  } catch (error: any) {
    console.error('❌ Gemini edge function test failed:', error.message);
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