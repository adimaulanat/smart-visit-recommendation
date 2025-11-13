export interface Attraction {
  id: string;
  name: string;
  description: string;
  type: 'museum' | 'park' | 'landmark' | 'entertainment' | 'historical';
  location: string;
  image: string;
  averageCrowd: number;
  weatherDependent: boolean;
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
