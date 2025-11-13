export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: 'theme_park' | 'museum' | 'nature' | 'entertainment' | 'cultural' | 'aquarium';
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  imageUrl: string;
  basePrice: number;
  currency: string;
  tags: string[];
  rating: number;
  totalReviews: number;
  capacity: number;
  openHours: Record<string, string>;
}

export interface WeatherData {
  date: string;
  temp: number;
  condition: string;
  precipitation: number;
  humidity: number;
  icon: string;
}

export interface CrowdPrediction {
  date: string;
  crowdLevel: 'low' | 'medium' | 'high';
  predictedVisitors: number;
}

export interface DateRecommendation {
  date: string;
  score: number;
  weather: WeatherData;
  crowdLevel: CrowdPrediction;
  aiInsight: string;
  pros: string[];
  cons: string[];
}

export interface AlternativeAttraction extends Attraction {
  similarityScore: number;
  reason: string;
}
