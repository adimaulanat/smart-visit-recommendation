import { WeatherData } from '../types/recommendation';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherForecast = async (location: string): Promise<WeatherData[]> => {
  try {
    // For demo purposes, we'll use Paris coordinates
    const lat = 48.8566;
    const lon = 2.3522;
    
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather API request failed');
    }
    
    const data = await response.json();
    
    // Process forecast data - take one forecast per day
    const dailyForecasts = data.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 7);
    
    return dailyForecasts.map((forecast: any) => ({
      date: forecast.dt_txt.split(' ')[0],
      temp: Math.round(forecast.main.temp),
      condition: forecast.weather[0].main,
      precipitation: forecast.pop * 100,
      humidity: forecast.main.humidity,
      icon: forecast.weather[0].icon,
    }));
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Return mock data as fallback
    return generateMockWeather();
  }
};

const generateMockWeather = (): WeatherData[] => {
  const conditions = ['Clear', 'Clouds', 'Rain', 'Snow'];
  const forecasts: WeatherData[] = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    forecasts.push({
      date: date.toISOString().split('T')[0],
      temp: Math.floor(Math.random() * 15) + 15,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      precipitation: Math.floor(Math.random() * 50),
      humidity: Math.floor(Math.random() * 40) + 40,
      icon: '01d',
    });
  }
  
  return forecasts;
};
