import { useState } from 'react';
import { Attraction } from '@/lib/data/attractions';
import { generateCrowdPredictions } from '@/lib/data/crowdPredictions';
import { getCachedWeather } from '@/lib/api/weatherService';
import { getCachedRecommendations } from '@/lib/api/geminiService';
import AttractionSelector from '@/components/recommendations/AttractionSelector';
import GeminiRecommendationsEnhanced from '@/components/recommendations/GeminiRecommendationsEnhanced';
import {
  RecommendationLoading,
  RecommendationError,
  RecommendationEmpty
} from '@/components/recommendations/RecommendationStates';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Info } from 'lucide-react';

export default function RecommendationsPageEnhanced() {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; type: 'network' | 'api' | 'data' | 'unknown' } | null>(null);

  const handleAttractionSelect = async (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setLoading(true);
    setError(null);
    setRecommendations(null); // Clear previous results

    try {
      console.log('🎯 Starting recommendation process for:', attraction.name);

      // Fetch weather with better error handling
      let weatherData;
      try {
        weatherData = await getCachedWeather(
          attraction.location.latitude,
          attraction.location.longitude,
          7 // Changed to 7 days as per Gemini prompt
        );
        console.log('✅ Weather data fetched:', weatherData.length, 'days');
      } catch (err: any) {
        console.error('Weather fetch error:', err);
        throw new Error('Failed to fetch weather data. Please check your connection.');
      }

      // Generate crowd predictions
      const crowdData = generateCrowdPredictions(
        attraction.id,
        attraction.capacity,
        7 // Changed to 7 days
      );
      console.log('✅ Crowd predictions generated:', crowdData.length, 'days');

      // Validate data
      if (!weatherData || weatherData.length === 0) {
        throw new Error('No weather data available for this location');
      }

      if (!crowdData || crowdData.length === 0) {
        throw new Error('No crowd prediction data available');
      }

      // Get AI recommendations
      console.log('🤖 Requesting AI recommendations...');
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

      console.log('✅ Recommendations received:', result);

      // Validate response structure
      if (!result || !result.recommendedDates || result.recommendedDates.length === 0) {
        throw new Error('No recommendations were generated. Please try again.');
      }

      setRecommendations(result);

    } catch (err: any) {
      console.error('Error in recommendation process:', err);

      // Categorize error type
      let errorType: 'network' | 'api' | 'data' | 'unknown' = 'unknown';
      let errorMessage = err.message || 'An unexpected error occurred';

      if (err.message?.includes('fetch') || err.message?.includes('network') || err.message?.includes('connection')) {
        errorType = 'network';
        errorMessage = 'Unable to connect to the service. Please check your internet connection.';
      } else if (err.message?.includes('API') || err.message?.includes('service') || err.message?.includes('Gemini')) {
        errorType = 'api';
        errorMessage = 'The AI recommendation service is temporarily unavailable. Please try again later.';
      } else if (err.message?.includes('data') || err.message?.includes('No recommendations')) {
        errorType = 'data';
        errorMessage = err.message;
      }

      setError({ message: errorMessage, type: errorType });
    } finally {
      setLoading(false);
    }
  };

  const handleBookDate = (date: string) => {
    // TODO: Implement booking logic
    console.log('Booking date:', date);
    alert(`Booking functionality for ${date} will be implemented soon!`);
  };

  const handleRetry = () => {
    if (selectedAttraction) {
      handleAttractionSelect(selectedAttraction);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 animate-scale-in">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">Powered by Google Gemini AI</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Find Your Perfect Visit Time
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              AI-powered recommendations analyzing weather, crowd levels, and pricing to help you plan the best experience
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { value: '100+', label: 'Attractions' },
                { value: '7', label: 'Days Analyzed' },
                { value: '99%', label: 'Accuracy' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Sidebar: Attraction Selector */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6 space-y-6">
              <AttractionSelector
                onSelect={handleAttractionSelect}
                selected={selectedAttraction}
              />

              {/* Info Card */}
              <Card className="border-2 border-blue-200 bg-blue-50/50 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-2">How it works:</p>
                    <ol className="space-y-1 text-xs">
                      <li>1. Select an attraction</li>
                      <li>2. AI analyzes 7 days of data</li>
                      <li>3. Get top 3 recommendations</li>
                      <li>4. Book your perfect date</li>
                    </ol>
                  </div>
                </div>
              </Card>

              {/* Features */}
              {!loading && !recommendations && (
                <Card className="border-2 p-4">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    What We Analyze
                  </h3>
                  <div className="space-y-2">
                    {[
                      { icon: '🌤️', label: 'Weather Conditions', score: '40pts' },
                      { icon: '👥', label: 'Crowd Levels', score: '35pts' },
                      { icon: '💰', label: 'Dynamic Pricing', score: '15pts' },
                      { icon: '🎉', label: 'Special Events', score: '10pts' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded border">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-gray-700">{item.label}</span>
                        </span>
                        <Badge variant="secondary" className="text-xs">{item.score}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-2">
            {loading && <RecommendationLoading />}

            {error && (
              <RecommendationError
                message={error.message}
                type={error.type}
                onRetry={handleRetry}
              />
            )}

            {recommendations && !loading && (
              <GeminiRecommendationsEnhanced
                recommendations={recommendations}
                attractionName={selectedAttraction?.name}
                onBookDate={handleBookDate}
              />
            )}

            {!selectedAttraction && !loading && !error && (
              <RecommendationEmpty />
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto border-2 bg-gradient-to-r from-purple-50 to-pink-50 p-8">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Powered by Advanced AI
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our recommendations are generated using Google's Gemini 2.5 Flash AI model,
              analyzing multiple data points to provide you with the most accurate and
              personalized suggestions for your visit.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Real-time Weather', 'ML Crowd Predictions', 'Dynamic Pricing', 'Smart Scheduling'].map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                  ✓ {feature}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
