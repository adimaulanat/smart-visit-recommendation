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
  // IMPORTANT: Use import.meta.env for Vite
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenWeather API key not found, using mock data');
    return generateMockWeatherData(days);
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&cnt=${days * 8}`
    );

    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await response.json();

    // Group by date
    const forecastMap = new Map<string, any[]>();
    data.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];
      if (!forecastMap.has(date)) {
        forecastMap.set(date, []);
      }
      forecastMap.get(date)!.push(item);
    });

    // Calculate daily averages
    const forecast: WeatherForecast[] = [];
    forecastMap.forEach((items, date) => {
      const avgTemp = items.reduce((sum, item) => sum + item.main.temp, 0) / items.length;
      const avgFeelsLike = items.reduce((sum, item) => sum + item.main.feels_like, 0) / items.length;
      const maxPrecipitation = Math.max(...items.map(item => item.pop * 100));

      forecast.push({
        date,
        temperature: Math.round(avgTemp),
        feelsLike: Math.round(avgFeelsLike),
        condition: items[0].weather[0].main.toLowerCase(),
        conditionCode: items[0].weather[0].description,
        precipitation: Math.round(maxPrecipitation),
        humidity: Math.round(items.reduce((sum: number, item: any) => sum + item.main.humidity, 0) / items.length),
        windSpeed: Math.round(items.reduce((sum: number, item: any) => sum + item.wind.speed, 0) / items.length * 3.6),
        uvIndex: 5
      });
    });

    return forecast.slice(0, days);
  } catch (error) {
    console.error('Weather API error:', error);
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
