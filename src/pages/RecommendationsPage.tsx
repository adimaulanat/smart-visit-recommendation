import { useState } from 'react';
import { AttractionSelector } from '@/components/recommendations/AttractionSelector';
import { DateRecommendation } from '@/components/recommendations/DateRecommendation';
import { AlternativeAttractions } from '@/components/recommendations/AlternativeAttractions';
import { Attraction, DateRecommendation as DateRec, AlternativeAttraction } from '@/lib/types/recommendation';
import { attractions } from '@/lib/data/attractions';
import { generateCrowdPredictions } from '@/lib/data/crowdPredictions';
import { fetchWeatherForecast } from '@/lib/api/weatherService';
import { generateDateRecommendations, generateAlternatives } from '@/lib/api/geminiService';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecommendationsPage = () => {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [recommendations, setRecommendations] = useState<DateRec[]>([]);
  const [alternatives, setAlternatives] = useState<AlternativeAttraction[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAttractionSelect = async (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setLoading(true);

    try {
      // Fetch data in parallel
      const [weatherData, crowdData] = await Promise.all([
        fetchWeatherForecast(attraction.location),
        Promise.resolve(generateCrowdPredictions(attraction.id)),
      ]);

      // Generate recommendations and alternatives
      const [recs, alts] = await Promise.all([
        generateDateRecommendations(attraction, weatherData, crowdData),
        generateAlternatives(attraction, attractions),
      ]);

      setRecommendations(recs);
      setAlternatives(alts);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Find Your Perfect Visit Day
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select an attraction to get AI-powered recommendations based on weather and crowd predictions
            </p>
          </div>

          <AttractionSelector
            attractions={attractions}
            onSelect={handleAttractionSelect}
            selectedId={selectedAttraction?.id}
          />

          {selectedAttraction && (
            <div className="mt-8 space-y-8">
              <DateRecommendation
                recommendations={recommendations}
                loading={loading}
              />
              
              {alternatives.length > 0 && (
                <AlternativeAttractions
                  alternatives={alternatives}
                  onSelect={handleAttractionSelect}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
