import { useState } from 'react';
import { Attraction } from '@/lib/data/attractions';
import { generateCrowdPredictions } from '@/lib/data/crowdPredictions';
import { getCachedWeather } from '@/lib/api/weatherService';
import { getCachedRecommendations } from '@/lib/api/geminiService';
import AttractionSelector from '@/components/recommendations/AttractionSelector';
import DateRecommendation from '@/components/recommendations/DateRecommendation';
import AlternativeAttractions from '@/components/recommendations/AlternativeAttractions';
import InsightCard from '@/components/recommendations/InsightCard';

export default function RecommendationsPage() {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAttractionSelect = async (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setLoading(true);
    setError(null);

    try {
      // Fetch weather
      const weatherData = await getCachedWeather(
        attraction.location.latitude,
        attraction.location.longitude,
        14
      );

      // Generate crowd predictions
      const crowdData = generateCrowdPredictions(
        attraction.id,
        attraction.capacity,
        14
      );

      // Get AI recommendations
      const result = await getCachedRecommendations({
        attraction,
        weatherData,
        crowdData,
        preferences: {
          budgetRange: 'medium',
          groupSize: 2,
          interests: attraction.tags,
          avoidCrowds: true
        }
      });

      setRecommendations(result);
    } catch (err: any) {
      setError(err.message || 'Failed to get recommendations');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Perfect Visit Time
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered recommendations for the best experience
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Attraction Selector */}
          <div className="lg:col-span-1">
            <AttractionSelector
              onSelect={handleAttractionSelect}
              selected={selectedAttraction}
            />
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-2">
            {loading && <LoadingState />}

            {error && (
              <ErrorState
                message={error}
                onRetry={() => selectedAttraction && handleAttractionSelect(selectedAttraction)}
              />
            )}

            {recommendations && !loading && (
              <div className="space-y-6">
                <DateRecommendation recommendations={recommendations} />

                {recommendations.insights && recommendations.insights.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendations.insights.map((insight: any) => (
                      <InsightCard key={insight.id} insight={insight} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {!selectedAttraction && !loading && !error && (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Component
function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="h-32 bg-gray-200 rounded-lg animate-pulse" />
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
    </div>
  );
}

// Error Component
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p className="text-red-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
}

// Empty State
function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🎯</div>
      <h2 className="text-2xl font-bold mb-2">Select an Attraction</h2>
      <p className="text-gray-600">
        Choose an attraction to get AI-powered date recommendations
      </p>
    </div>
  );
}
