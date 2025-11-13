import { Attraction, WeatherData, CrowdPrediction, DateRecommendation, AlternativeAttraction } from '../types/recommendation';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export const generateDateRecommendations = async (
  attraction: Attraction,
  weatherData: WeatherData[],
  crowdData: CrowdPrediction[]
): Promise<DateRecommendation[]> => {
  const prompt = `As a travel expert AI, analyze the best dates to visit ${attraction.name} in ${attraction.location}.

Attraction details:
- Type: ${attraction.type}
- Weather dependent: ${attraction.weatherDependent ? 'Yes' : 'No'}
- Average crowd level: ${attraction.averageCrowd}%

Weather forecast for the next 7 days:
${weatherData.map(w => `${w.date}: ${w.temp}°C, ${w.condition}, ${w.precipitation}% precipitation`).join('\n')}

Crowd predictions:
${crowdData.map(c => `${c.date}: ${c.crowdLevel} crowd (${c.predictedVisitors} visitors)`).join('\n')}

For each date, provide:
1. A score from 0-100 (100 being the best)
2. A brief insight (max 50 words)
3. 2-3 pros
4. 1-2 cons

Return ONLY a valid JSON array with this exact structure:
[{
  "date": "YYYY-MM-DD",
  "score": 85,
  "aiInsight": "Perfect day with...",
  "pros": ["Low crowds", "Great weather"],
  "cons": ["Slightly humid"]
}]`;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Gemini API request failed');
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    const recommendations = JSON.parse(jsonMatch[0]);
    
    return recommendations.map((rec: any) => ({
      ...rec,
      weather: weatherData.find(w => w.date === rec.date)!,
      crowdLevel: crowdData.find(c => c.date === rec.date)!,
    }));
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return generateMockRecommendations(weatherData, crowdData);
  }
};

export const generateAlternatives = async (
  currentAttraction: Attraction,
  allAttractions: Attraction[]
): Promise<AlternativeAttraction[]> => {
  const prompt = `Given that a user is interested in ${currentAttraction.name} (${currentAttraction.type}), suggest 3 alternative attractions from this list that they might also enjoy:

${allAttractions.filter(a => a.id !== currentAttraction.id).map(a => `- ${a.name}: ${a.description} (${a.type})`).join('\n')}

For each alternative, provide:
1. A similarity score (0-100)
2. A brief reason why they might like it (max 30 words)

Return ONLY a valid JSON array:
[{
  "name": "Attraction Name",
  "similarityScore": 85,
  "reason": "Similar historical significance..."
}]`;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Gemini API request failed');
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    const alternatives = JSON.parse(jsonMatch[0]);
    
    return alternatives.map((alt: any) => {
      const attraction = allAttractions.find(a => a.name === alt.name);
      return attraction ? { ...attraction, ...alt } : null;
    }).filter(Boolean);
  } catch (error) {
    console.error('Error generating alternatives:', error);
    return generateMockAlternatives(currentAttraction, allAttractions);
  }
};

const generateMockRecommendations = (
  weatherData: WeatherData[],
  crowdData: CrowdPrediction[]
): DateRecommendation[] => {
  return weatherData.map((weather) => {
    const crowd = crowdData.find(c => c.date === weather.date)!;
    const score = calculateMockScore(weather, crowd);
    
    return {
      date: weather.date,
      score,
      weather,
      crowdLevel: crowd,
      aiInsight: `${weather.condition === 'Clear' ? 'Beautiful' : 'Variable'} weather with ${crowd.crowdLevel} crowds expected.`,
      pros: [
        weather.condition === 'Clear' ? 'Perfect weather' : 'Manageable conditions',
        crowd.crowdLevel === 'low' ? 'Few visitors' : 'Moderate crowds',
      ],
      cons: [weather.precipitation > 50 ? 'High chance of rain' : 'Typical weather'],
    };
  });
};

const calculateMockScore = (weather: WeatherData, crowd: CrowdPrediction): number => {
  let score = 50;
  
  if (weather.condition === 'Clear') score += 20;
  if (weather.precipitation < 30) score += 15;
  if (crowd.crowdLevel === 'low') score += 15;
  
  return Math.min(score, 100);
};

const generateMockAlternatives = (
  current: Attraction,
  all: Attraction[]
): AlternativeAttraction[] => {
  return all
    .filter(a => a.id !== current.id && a.type === current.type)
    .slice(0, 3)
    .map(a => ({
      ...a,
      similarityScore: Math.floor(Math.random() * 30) + 70,
      reason: `Similar ${current.type} experience with unique characteristics`,
    }));
};
