import GeminiRecommendations from './GeminiRecommendations';

/**
 * Demo component showing the GeminiRecommendations UI with sample data
 * This demonstrates the exact structure expected from the Gemini API
 */
export default function GeminiRecommendationsDemo() {
  // Sample data matching your Gemini API response
  const sampleRecommendations = {
    recommendedDates: [
      {
        date: '2025-11-18',
        dayOfWeek: 'Tuesday',
        score: 75,
        scoreBreakdown: {
          weather: 40,
          crowd: 25,
          price: 10,
          events: 0
        },
        weather: {
          temperature: 27,
          condition: 'partly_cloudy',
          precipitation: 18
        },
        crowd: {
          level: 'Medium',
          expectedVisitors: 12778,
          capacityPercentage: 51
        },
        pricing: {
          dynamicPrice: 200000,
          reason: 'Standard pricing'
        },
        reasons: [
          'Excellent weather with ideal temperature and low precipitation, coupled with manageable crowd levels and standard pricing.'
        ],
        badges: ['Best Weather', 'Good Crowd']
      },
      {
        date: '2025-11-17',
        dayOfWeek: 'Monday',
        score: 65,
        scoreBreakdown: {
          weather: 30,
          crowd: 25,
          price: 10,
          events: 0
        },
        weather: {
          temperature: 25,
          condition: 'partly_cloudy',
          precipitation: 23
        },
        crowd: {
          level: 'Medium',
          expectedVisitors: 12171,
          capacityPercentage: 49
        },
        pricing: {
          dynamicPrice: 200000,
          reason: 'Standard pricing'
        },
        reasons: [
          'Good weather conditions with manageable crowd levels and standard pricing. Slightly cooler temperature than ideal.'
        ],
        badges: ['Good Crowd']
      },
      {
        date: '2025-11-19',
        dayOfWeek: 'Wednesday',
        score: 65,
        scoreBreakdown: {
          weather: 30,
          crowd: 25,
          price: 10,
          events: 0
        },
        weather: {
          temperature: 24,
          condition: 'partly_cloudy',
          precipitation: 1
        },
        crowd: {
          level: 'Medium',
          expectedVisitors: 12769,
          capacityPercentage: 51
        },
        pricing: {
          dynamicPrice: 200000,
          reason: 'Standard pricing'
        },
        reasons: [
          'Excellent low precipitation, but slightly cooler temperature. Manageable crowd levels and standard pricing.'
        ],
        badges: ['Good Crowd']
      }
    ],
    insights: [
      {
        type: 'tip',
        title: 'Best Time to Visit',
        message:
          'Weekdays, especially Monday to Wednesday, typically offer lower crowd levels and standard pricing compared to weekends. Aim for days with temperatures between 26-30°C and low precipitation for the most comfortable experience.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gemini Recommendations Demo
          </h1>
          <p className="text-gray-600">
            This is how your AI-powered recommendations will look
          </p>
        </div>
        <GeminiRecommendations recommendations={sampleRecommendations} />
      </div>
    </div>
  );
}
