import { supabase } from '@/integrations/supabase/client';

interface WeatherForecast {
  date: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionCode: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
}

export async function getWeatherForecast(
  latitude: number,
  longitude: number,
  days: number = 14
): Promise<WeatherForecast[]> {
  try {
    console.log(`☁️ Fetching weather via edge function...`);
    
    const { data, error } = await supabase.functions.invoke('weather-forecast', {
      body: { latitude, longitude, days }
    });

    if (error) {
      console.error('Weather edge function error:', error);
      throw new Error('Weather fetch failed');
    }

    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid weather data');
    }

    console.log(`✅ Weather data received: ${data.length} days`);
    return data;

  } catch (error) {
    console.error('Weather service error:', error);
    console.warn('Falling back to mock data');
    return generateMockWeatherData(days);
  }
}

function generateMockWeatherData(days: number): WeatherForecast[] {
  const forecast: WeatherForecast[] = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      temperature: Math.round(22 + Math.random() * 10),
      feelsLike: Math.round(23 + Math.random() * 10),
      condition: ['sunny', 'cloudy', 'partly_cloudy', 'rainy'][Math.floor(Math.random() * 4)],
      conditionCode: 'clear sky',
      precipitation: Math.round(Math.random() * 50),
      humidity: Math.round(60 + Math.random() * 30),
      windSpeed: Math.round(5 + Math.random() * 20),
      uvIndex: Math.round(3 + Math.random() * 7)
    });
  }
  
  return forecast;
}

// Cache with localStorage
const CACHE_KEY = 'weather_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export async function getCachedWeather(
  latitude: number,
  longitude: number,
  days: number = 14
): Promise<WeatherForecast[]> {
  const cacheKey = `${CACHE_KEY}_${latitude}_${longitude}`;
  
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  } catch (e) {
    console.error('Cache error:', e);
  }
  
  const weather = await getWeatherForecast(latitude, longitude, days);
  
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      data: weather,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.error('Cache write error:', e);
  }
  
  return weather;
}

// Legacy adapter for backward compatibility with old WeatherData type
export async function fetchWeatherForecast(latitude: number, longitude: number): Promise<any[]> {
  const forecasts = await getCachedWeather(latitude, longitude, 7);
  
  // Map to old format
  return forecasts.map(f => ({
    date: f.date,
    temp: f.temperature,
    condition: f.condition.charAt(0).toUpperCase() + f.condition.slice(1),
    precipitation: f.precipitation,
    humidity: f.humidity,
    icon: '01d', // Default icon
  }));
}
