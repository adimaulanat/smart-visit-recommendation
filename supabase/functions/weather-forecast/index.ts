import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('VITE_OPENWEATHER_API_KEY');
    
    if (!apiKey) {
      console.error('VITE_OPENWEATHER_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Weather API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { latitude, longitude, days = 14 } = await req.json();
    
    console.log(`Fetching weather for: ${latitude}, ${longitude}`);

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

    const result = forecast.slice(0, days);
    
    console.log(`✅ Weather data fetched: ${result.length} days`);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in weather-forecast:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
