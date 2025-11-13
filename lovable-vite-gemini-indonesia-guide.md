# AI-Powered Smart Visit Recommendation with Vite + React
## Frontend-Only Implementation using Google Gemini API

---

## 🎯 Overview

Building the entire app with **Vite + React + TypeScript** instead of Next.js.
Perfect for Lovable, lightweight, and super fast! ⚡

### Tech Stack:

```
Frontend Framework: Vite 5 + React 18
Language: TypeScript
Styling: Tailwind CSS + shadcn/ui
AI: Google Gemini API
Weather: OpenWeather API
State Management: React Context + Hooks
Routing: React Router v6
Storage: localStorage
Build Tool: Vite (super fast!)
Deployment: Vercel/Netlify (1-click from Lovable)
```

---

## 🚀 Complete Lovable Prompts for Vite

### STEP 1: Initial Vite Project Setup

**Prompt for Lovable:**

```
Create a modern AI-powered smart visit recommendation app using Vite, React 18, TypeScript, Tailwind CSS, and shadcn/ui.

TECH STACK:
- Vite 5 (fast build tool)
- React 18 with TypeScript
- Tailwind CSS for styling
- shadcn/ui for components
- React Router v6 for navigation
- Google Gemini API for AI recommendations
- OpenWeather API for weather data

PROJECT STRUCTURE:
/src
  /pages
    HomePage.tsx                      # Landing/home page
    RecommendationsPage.tsx           # Main recommendations page
  /components
    /recommendations
      AttractionSelector.tsx          # Select attraction
      DateRecommendation.tsx          # Show recommended dates
      AlternativeAttractions.tsx      # Show alternatives
      InsightCard.tsx                 # AI insights
    /ui
      button.tsx                      # shadcn button
      card.tsx                        # shadcn card
      badge.tsx                       # shadcn badge
      skeleton.tsx                    # shadcn skeleton
      dialog.tsx                      # shadcn dialog
      tabs.tsx                        # shadcn tabs
  /lib
    /api
      geminiService.ts                # Gemini API integration
      weatherService.ts               # Weather API integration
    /data
      attractions.ts                  # Mock attraction data
      crowdPredictions.ts             # Mock crowd data
    /types
      recommendation.ts               # TypeScript interfaces
    /utils
      dateHelpers.ts                  # Date utilities
      cn.ts                          # Tailwind utility
  /contexts
    RecommendationContext.tsx         # Global state
  App.tsx                             # Main app component
  main.tsx                            # Entry point
  index.css                           # Global styles

CONFIGURATION FILES:
- vite.config.ts
- tsconfig.json
- tailwind.config.js
- postcss.config.js
- .env.local

ENVIRONMENT VARIABLES (.env.local):
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_OPENWEATHER_API_KEY=your_openweather_api_key

IMPORTANT VITE NOTES:
- Use VITE_ prefix for environment variables (not NEXT_PUBLIC_)
- Access via import.meta.env.VITE_GEMINI_API_KEY
- Hot Module Replacement (HMR) is super fast
- No need for getServerSideProps or getStaticProps

DESIGN:
- Modern gradient-based design
- Mobile-first responsive
- Smooth animations with Framer Motion
- Loading states with skeletons
- Error boundaries

Start by creating the project structure, vite.config.ts, and basic routing setup.
```

---

### STEP 2: Vite Configuration

**Prompt for Lovable:**

```
Create vite.config.ts with proper configuration:

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['@google/generative-ai'],
  },
});

Also create tsconfig.json with proper paths:

{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

And package.json with all dependencies:

{
  "name": "smart-visit-recommendation",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0",
    "@google/generative-ai": "^0.21.0",
    "lucide-react": "^0.344.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "date-fns": "^3.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^8.56.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.4"
  }
}
```

---

### STEP 3: Environment Variables (Vite Style)

**Prompt for Lovable:**

```
Create .env.local file with Vite-specific environment variables:

VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here

Create .env.example for documentation:

VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_OPENWEATHER_API_KEY=your_openweather_api_key

IMPORTANT: 
- Vite uses VITE_ prefix (not NEXT_PUBLIC_)
- Access via import.meta.env.VITE_GEMINI_API_KEY
- Restart dev server after changing .env files

Create a type declaration file: src/vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string
  readonly VITE_OPENWEATHER_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

---

### STEP 4: Main Entry Point & Router

**Prompt for Lovable:**

```
Create src/main.tsx as the entry point:

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

Create src/App.tsx with React Router:

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecommendationsPage from './pages/RecommendationsPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
      </Routes>
    </div>
  );
}

export default App;

Create src/index.css with Tailwind directives:

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

Create tailwind.config.js:

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
```

---

### STEP 5: Gemini Service (Vite Compatible)

**Prompt for Lovable:**

```
Create src/lib/api/geminiService.ts that works with Vite:

import { GoogleGenerativeAI } from '@google/generative-ai';

interface GeminiRecommendationInput {
  attraction: any;
  weatherData: any[];
  crowdData: any[];
  selectedDate?: string;
  preferences: {
    budgetRange: 'low' | 'medium' | 'high';
    groupSize: number;
    interests: string[];
    avoidCrowds: boolean;
  };
}

// IMPORTANT: Vite uses import.meta.env instead of process.env
function getGeminiAPI() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY not found. Please add it to .env.local');
  }

  return new GoogleGenerativeAI(apiKey);
}

export async function getAIRecommendations(
  input: GeminiRecommendationInput
): Promise<any> {
  const genAI = getGeminiAPI();
  
  // Use Gemini 1.5 Flash for speed (or gemini-1.5-pro for better quality)
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 4096,
    }
  });

  const prompt = buildPrompt(input);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    let jsonText = text;
    
    // Remove markdown code blocks if present
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonText = codeBlockMatch[1];
    }

    // Find JSON object
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Raw Gemini response:', text);
      throw new Error('No valid JSON in Gemini response');
    }

    const recommendations = JSON.parse(jsonMatch[0]);
    return recommendations;
  } catch (error: any) {
    console.error('Gemini API error:', error);
    
    if (error.message?.includes('API_KEY_INVALID')) {
      throw new Error('Invalid Gemini API key. Check your .env.local file');
    }
    if (error.message?.includes('QUOTA_EXCEEDED')) {
      throw new Error('Gemini API quota exceeded. Try again later or upgrade');
    }
    
    throw new Error(`AI recommendations failed: ${error.message}`);
  }
}

function buildPrompt(input: GeminiRecommendationInput): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `You are an AI travel recommendation assistant. Analyze the data and provide recommendations in JSON format.

CONTEXT:
- Attraction: ${input.attraction.name}
- Category: ${input.attraction.category}
- Location: ${input.attraction.location.city}
- Capacity: ${input.attraction.capacity}
- Base Price: $${input.attraction.basePrice}
- Selected Date: ${input.selectedDate || 'Not specified - recommend best dates'}
- Current Date: ${currentDate}

USER PREFERENCES:
- Budget: ${input.preferences.budgetRange}
- Group Size: ${input.preferences.groupSize}
- Interests: ${input.preferences.interests.join(', ')}
- Avoid Crowds: ${input.preferences.avoidCrowds}

WEATHER DATA (next 14 days):
${JSON.stringify(input.weatherData.slice(0, 14), null, 2)}

CROWD PREDICTIONS (next 14 days):
${JSON.stringify(input.crowdData.slice(0, 14), null, 2)}

SCORING:
1. Weather (40 pts): 20-28°C, sunny = best
2. Crowd (35 pts): <40% capacity = best
3. Price (15 pts): Higher discounts = better
4. Events (10 pts): Special events = bonus

OUTPUT (JSON only):
{
  "recommendedDates": [
    {
      "date": "2025-11-20",
      "dayOfWeek": "Thursday",
      "score": 92,
      "scoreBreakdown": {"weather": 38, "crowd": 32, "price": 14, "events": 8},
      "weather": {"temperature": 24, "condition": "sunny", "precipitation": 5},
      "crowd": {"level": "low", "score": 25, "expectedVisitors": 8500, "capacityPercentage": 42},
      "pricing": {"basePrice": ${input.attraction.basePrice}, "dynamicPrice": ${input.attraction.basePrice * 0.9}, "discount": ${input.attraction.basePrice * 0.1}, "reason": "Weekday discount"},
      "reasons": ["Perfect weather", "Low crowds", "Discount available"],
      "badges": ["best-weather", "best-value"]
    }
  ],
  "insights": [
    {"type": "tip", "title": "Best Time", "message": "Arrive early to avoid crowds", "confidence": "high", "icon": "lightbulb"}
  ],
  "confidence": 0.92
}`;
}

// Cache in localStorage
const CACHE_KEY = 'gemini_recommendations';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedRecommendations(
  input: GeminiRecommendationInput
): Promise<any> {
  const cacheKey = `${CACHE_KEY}_${input.attraction.id}_${input.selectedDate || 'any'}`;
  
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log('✅ Using cached recommendations');
        return data;
      }
    }
  } catch (e) {
    console.error('Cache read error:', e);
  }
  
  console.log('🔄 Fetching fresh recommendations...');
  const recommendations = await getAIRecommendations(input);
  
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      data: recommendations,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.error('Cache write error:', e);
  }
  
  return recommendations;
}

// Test connection
export async function testGeminiConnection(): Promise<boolean> {
  try {
    const genAI = getGeminiAPI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent("Say hello in JSON: {\"message\": \"...\"}");
    const response = await result.response;
    
    console.log('✅ Gemini connected:', response.text());
    return true;
  } catch (error: any) {
    console.error('❌ Gemini test failed:', error.message);
    return false;
  }
}
```

---

### STEP 6: Weather Service (Vite Compatible)

**Prompt for Lovable:**

```
Create src/lib/api/weatherService.ts using Vite environment variables:

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
```

---

### STEP 7: Mock Data Files (Indonesian Attractions)

**Prompt for Lovable:**

```
Create src/lib/data/attractions.ts with Indonesian attraction data:

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

export const attractions: Attraction[] = [
  {
    id: 'attr_001',
    name: 'Dufan (Dunia Fantasi)',
    description: 'Jakarta\'s largest theme park with thrilling rides, family attractions, and entertainment shows at Ancol',
    category: 'theme_park',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.1247,
      longitude: 106.8420
    },
    imageUrl: 'https://images.unsplash.com/photo-1594753657788-7e3791d3a475?w=800',
    basePrice: 200000,
    currency: 'IDR',
    tags: ['family-friendly', 'outdoor', 'entertainment', 'rides', 'waterfront'],
    rating: 4.3,
    totalReviews: 45230,
    capacity: 25000,
    openHours: {
      monday: '10:00-18:00',
      tuesday: '10:00-18:00',
      wednesday: '10:00-18:00',
      thursday: '10:00-18:00',
      friday: '10:00-20:00',
      saturday: '09:00-20:00',
      sunday: '09:00-20:00'
    }
  },
  {
    id: 'attr_002',
    name: 'Taman Mini Indonesia Indah (TMII)',
    description: 'Cultural park showcasing Indonesian diversity with pavilions representing all provinces, museums, and gardens',
    category: 'cultural',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.3025,
      longitude: 106.8953
    },
    imageUrl: 'https://images.unsplash.com/photo-1555881673-7e5e48f10a60?w=800',
    basePrice: 25000,
    currency: 'IDR',
    tags: ['cultural', 'educational', 'outdoor', 'family-friendly', 'museum'],
    rating: 4.4,
    totalReviews: 38900,
    capacity: 30000,
    openHours: {
      monday: '07:00-22:00',
      tuesday: '07:00-22:00',
      wednesday: '07:00-22:00',
      thursday: '07:00-22:00',
      friday: '07:00-22:00',
      saturday: '07:00-22:00',
      sunday: '07:00-22:00'
    }
  },
  {
    id: 'attr_003',
    name: 'Jakarta Aquarium & Safari',
    description: 'Modern aquarium featuring diverse marine life, interactive exhibits, and safari-themed experiences',
    category: 'aquarium',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.2254,
      longitude: 106.8209
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    basePrice: 150000,
    currency: 'IDR',
    tags: ['family-friendly', 'indoor', 'educational', 'marine-life', 'interactive'],
    rating: 4.5,
    totalReviews: 28450,
    capacity: 8000,
    openHours: {
      monday: '10:00-20:00',
      tuesday: '10:00-20:00',
      wednesday: '10:00-20:00',
      thursday: '10:00-20:00',
      friday: '10:00-21:00',
      saturday: '09:00-21:00',
      sunday: '09:00-21:00'
    }
  },
  {
    id: 'attr_004',
    name: 'Ragunan Zoo',
    description: 'One of the oldest and largest zoos in Southeast Asia with over 2,000 animals in natural habitats',
    category: 'nature',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.3106,
      longitude: 106.8201
    },
    imageUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800',
    basePrice: 5000,
    currency: 'IDR',
    tags: ['family-friendly', 'outdoor', 'nature', 'educational', 'wildlife'],
    rating: 4.2,
    totalReviews: 52100,
    capacity: 35000,
    openHours: {
      monday: 'Closed',
      tuesday: '06:00-16:00',
      wednesday: '06:00-16:00',
      thursday: '06:00-16:00',
      friday: '06:00-16:00',
      saturday: '06:00-16:30',
      sunday: '06:00-16:30'
    }
  },
  {
    id: 'attr_005',
    name: 'Museum Nasional Indonesia',
    description: 'National Museum showcasing Indonesian history, art, and culture with extensive archaeological collections',
    category: 'museum',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.1762,
      longitude: 106.8227
    },
    imageUrl: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3a6?w=800',
    basePrice: 10000,
    currency: 'IDR',
    tags: ['cultural', 'educational', 'indoor', 'history', 'art'],
    rating: 4.6,
    totalReviews: 15680,
    capacity: 5000,
    openHours: {
      monday: 'Closed',
      tuesday: '08:00-16:00',
      wednesday: '08:00-16:00',
      thursday: '08:00-16:00',
      friday: '08:00-16:00',
      saturday: '08:00-16:00',
      sunday: '08:00-16:00'
    }
  },
  {
    id: 'attr_006',
    name: 'Trans Studio Cibubur',
    description: 'Indoor theme park with various rides, attractions, and entertainment zones perfect for all ages',
    category: 'theme_park',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.3716,
      longitude: 106.8945
    },
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
    basePrice: 175000,
    currency: 'IDR',
    tags: ['family-friendly', 'indoor', 'entertainment', 'rides', 'climate-controlled'],
    rating: 4.4,
    totalReviews: 32800,
    capacity: 18000,
    openHours: {
      monday: '10:00-18:00',
      tuesday: '10:00-18:00',
      wednesday: '10:00-18:00',
      thursday: '10:00-18:00',
      friday: '10:00-20:00',
      saturday: '09:00-20:00',
      sunday: '09:00-20:00'
    }
  },
  {
    id: 'attr_007',
    name: 'Kota Tua Jakarta',
    description: 'Historic old town area with colonial architecture, museums, cafes, and cultural performances',
    category: 'cultural',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.1351,
      longitude: 106.8133
    },
    imageUrl: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=800',
    basePrice: 0,
    currency: 'IDR',
    tags: ['cultural', 'outdoor', 'history', 'photography', 'architecture'],
    rating: 4.3,
    totalReviews: 67500,
    capacity: 50000,
    openHours: {
      monday: '07:00-22:00',
      tuesday: '07:00-22:00',
      wednesday: '07:00-22:00',
      thursday: '07:00-22:00',
      friday: '07:00-22:00',
      saturday: '07:00-23:00',
      sunday: '07:00-23:00'
    }
  },
  {
    id: 'attr_008',
    name: 'Waterbom Jakarta',
    description: 'Premier water park with thrilling slides, lazy river, and family-friendly water attractions',
    category: 'theme_park',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.2346,
      longitude: 106.8042
    },
    imageUrl: 'https://images.unsplash.com/photo-1581361796865-2ce8a63d2e86?w=800',
    basePrice: 250000,
    currency: 'IDR',
    tags: ['family-friendly', 'outdoor', 'water-park', 'summer', 'slides'],
    rating: 4.5,
    totalReviews: 41250,
    capacity: 15000,
    openHours: {
      monday: '10:00-18:00',
      tuesday: '10:00-18:00',
      wednesday: '10:00-18:00',
      thursday: '10:00-18:00',
      friday: '10:00-19:00',
      saturday: '09:00-19:00',
      sunday: '09:00-19:00'
    }
  },
  {
    id: 'attr_009',
    name: 'Kidzania Jakarta',
    description: 'Interactive edutainment center where children can role-play various professions in a mini city',
    category: 'entertainment',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.2254,
      longitude: 106.8209
    },
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    basePrice: 150000,
    currency: 'IDR',
    tags: ['family-friendly', 'indoor', 'educational', 'children', 'interactive'],
    rating: 4.7,
    totalReviews: 36900,
    capacity: 5000,
    openHours: {
      monday: '09:00-19:00',
      tuesday: '09:00-19:00',
      wednesday: '09:00-19:00',
      thursday: '09:00-19:00',
      friday: '09:00-19:00',
      saturday: '09:00-20:00',
      sunday: '09:00-20:00'
    }
  },
  {
    id: 'attr_010',
    name: 'Sea World Ancol',
    description: 'Oceanarium featuring underwater tunnel, touch pool, and various marine species from Indonesian waters',
    category: 'aquarium',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.1237,
      longitude: 106.8485
    },
    imageUrl: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800',
    basePrice: 120000,
    currency: 'IDR',
    tags: ['family-friendly', 'indoor', 'educational', 'marine-life', 'aquarium'],
    rating: 4.4,
    totalReviews: 29850,
    capacity: 10000,
    openHours: {
      monday: '09:00-18:00',
      tuesday: '09:00-18:00',
      wednesday: '09:00-18:00',
      thursday: '09:00-18:00',
      friday: '09:00-18:00',
      saturday: '09:00-18:00',
      sunday: '09:00-18:00'
    }
  },
  {
    id: 'attr_011',
    name: 'Museum Macan',
    description: 'Modern and contemporary art museum featuring Indonesian and international artists with rotating exhibitions',
    category: 'museum',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.1701,
      longitude: 106.7950
    },
    imageUrl: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800',
    basePrice: 100000,
    currency: 'IDR',
    tags: ['cultural', 'indoor', 'art', 'modern', 'photography'],
    rating: 4.8,
    totalReviews: 18400,
    capacity: 3000,
    openHours: {
      monday: 'Closed',
      tuesday: '10:00-18:00',
      wednesday: '10:00-18:00',
      thursday: '10:00-18:00',
      friday: '10:00-18:00',
      saturday: '10:00-20:00',
      sunday: '10:00-20:00'
    }
  },
  {
    id: 'attr_012',
    name: 'Taman Impian Jaya Ancol',
    description: 'Beachfront recreation area with various attractions, restaurants, and entertainment venues by the sea',
    category: 'entertainment',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.1239,
      longitude: 106.8396
    },
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    basePrice: 25000,
    currency: 'IDR',
    tags: ['family-friendly', 'outdoor', 'beach', 'entertainment', 'waterfront'],
    rating: 4.2,
    totalReviews: 89300,
    capacity: 100000,
    openHours: {
      monday: '06:00-18:00',
      tuesday: '06:00-18:00',
      wednesday: '06:00-18:00',
      thursday: '06:00-18:00',
      friday: '06:00-18:00',
      saturday: '06:00-18:00',
      sunday: '06:00-18:00'
    }
  }
];

export function getAttractionById(id: string): Attraction | undefined {
  return attractions.find(attr => attr.id === id);
}

export function searchAttractions(query: string): Attraction[] {
  const lowerQuery = query.toLowerCase();
  return attractions.filter(attr =>
    attr.name.toLowerCase().includes(lowerQuery) ||
    attr.description.toLowerCase().includes(lowerQuery) ||
    attr.tags.some(tag => tag.includes(lowerQuery))
  );
}

export function getAttractionsByCategory(category: string): Attraction[] {
  return attractions.filter(attr => attr.category === category);
}

export function getAttractionsByCity(city: string): Attraction[] {
  return attractions.filter(attr => attr.location.city.toLowerCase() === city.toLowerCase());
}

export function formatPrice(price: number, currency: string = 'IDR'): string {
  if (currency === 'IDR') {
    return `Rp ${price.toLocaleString('id-ID')}`;
  }
  return `${currency} ${price.toLocaleString()}`;
}

export const categories = [
  { id: 'all', label: 'All Attractions', icon: '🎯' },
  { id: 'theme_park', label: 'Theme Parks', icon: '🎢' },
  { id: 'museum', label: 'Museums', icon: '🏛️' },
  { id: 'nature', label: 'Nature & Wildlife', icon: '🌳' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎭' },
  { id: 'cultural', label: 'Cultural Sites', icon: '🕌' },
  { id: 'aquarium', label: 'Aquariums', icon: '🐠' },
];

export const cities = [
  { id: 'jakarta', label: 'Jakarta', count: 12 },
  // Add more cities as you expand
];
```

Also create src/lib/data/crowdPredictions.ts with Indonesian context:

```

export interface CrowdPrediction {
  date: string;
  level: 'low' | 'moderate' | 'high' | 'very-high';
  score: number;
  expectedVisitors: number;
  capacityPercentage: number;
  factors: string[];
}

export function generateCrowdPredictions(
  attractionId: string,
  capacity: number,
  days: number = 14
): CrowdPrediction[] {
  const predictions: CrowdPrediction[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dayOfWeek = date.getDay();

    // Base visitor calculation
    let expectedVisitors = capacity * 0.5;
    const factors: string[] = [];

    // Weekend multiplier (higher in Indonesia)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      expectedVisitors *= 1.5;
      factors.push('Weekend peak - libur akhir pekan');
    } else {
      factors.push('Weekday normal pattern');
    }

    // Friday is popular (preparing for weekend)
    if (dayOfWeek === 5) {
      expectedVisitors *= 1.3;
      factors.push('Jumat - preparing for weekend');
    }

    // Monday is typically quieter
    if (dayOfWeek === 1) {
      expectedVisitors *= 0.85;
      factors.push('Senin - mulai pekan, lebih sepi');
    }

    // Indonesian holiday detection
    const holiday = getIndonesianHoliday(date);
    if (holiday) {
      expectedVisitors *= 1.8;
      factors.push(`Libur nasional: ${holiday}`);
    }

    // School holiday periods
    if (isSchoolHoliday(date)) {
      expectedVisitors *= 1.4;
      factors.push('Libur sekolah - family season');
    }

    // Add randomness
    expectedVisitors *= (0.85 + Math.random() * 0.3);
    expectedVisitors = Math.round(expectedVisitors);

    const capacityPercentage = Math.min(100, Math.round((expectedVisitors / capacity) * 100));
    
    let level: 'low' | 'moderate' | 'high' | 'very-high';
    if (capacityPercentage < 40) level = 'low';
    else if (capacityPercentage < 70) level = 'moderate';
    else if (capacityPercentage < 90) level = 'high';
    else level = 'very-high';

    predictions.push({
      date: date.toISOString().split('T')[0],
      level,
      score: 100 - capacityPercentage,
      expectedVisitors,
      capacityPercentage,
      factors
    });
  }

  return predictions;
}

// Indonesian public holidays (2025)
function getIndonesianHoliday(date: Date): string | null {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const holidays: { [key: string]: string } = {
    '1-1': 'Tahun Baru',
    '3-29': 'Isra Mi\'raj',
    '3-31': 'Hari Raya Nyepi',
    '4-18': 'Wafat Yesus Kristus',
    '5-1': 'Hari Buruh',
    '5-29': 'Kenaikan Yesus Kristus',
    '6-1': 'Hari Pancasila',
    '8-17': 'Hari Kemerdekaan',
    '12-25': 'Hari Natal',
  };
  
  return holidays[`${month}-${day}`] || null;
}

// School holiday periods in Indonesia
function isSchoolHoliday(date: Date): boolean {
  const month = date.getMonth() + 1;
  // June-July and mid-December
  return (month === 6 || month === 7 || (month === 12 && date.getDate() >= 15));
}

// Peak hours for Indonesian context
export function getPeakHours(date: Date): string[] {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return ['10:00-12:00', '13:00-15:00'];
  }
  return ['15:00-17:00', '18:00-20:00'];
}

// Get crowd level text in Indonesian
export function getCrowdLevelText(level: string): string {
  const texts: { [key: string]: string } = {
    'low': 'Sepi - Waktu terbaik berkunjung',
    'moderate': 'Ramai sedang - Cukup nyaman',
    'high': 'Ramai - Perlu sabar',
    'very-high': 'Sangat ramai - Hindari jika bisa'
  };
  return texts[level] || level;
}
```

---

### STEP 8: Main Recommendations Page (Vite + React)

**Prompt for Lovable:**

```
Create src/pages/RecommendationsPage.tsx as the main page:

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
```

---

### STEP 9: Build All UI Components

Use the same component logic as before, but ensure they're React components without Next.js specific features:

**Prompt for Lovable:**

```
Build the following UI components in src/components/recommendations/:

1. AttractionSelector.tsx
   - Display list of attractions
   - Search functionality
   - Category filters
   - Click to select

2. DateRecommendation.tsx
   - Display recommended dates
   - Show scores and badges
   - Weather and crowd info
   - Pricing details

3. AlternativeAttractions.tsx
   - Show similar attractions
   - Price comparison
   - Available dates

4. InsightCard.tsx
   - Display AI insights
   - Different types (tip/warning/highlight)
   - Icons and styling

All components should:
- Use TypeScript
- Use Tailwind CSS for styling
- Be fully responsive
- Include proper prop types
- Have loading and error states
```

---

## 🚀 Key Differences: Vite vs Next.js

| Feature | Vite | Next.js |
|---------|------|---------|
| **Env Variables** | `import.meta.env.VITE_*` | `process.env.NEXT_PUBLIC_*` |
| **Config File** | `vite.config.ts` | `next.config.js` |
| **Routing** | React Router | File-based routing |
| **Entry Point** | `main.tsx` | `_app.tsx` / `app/layout.tsx` |
| **Build** | `vite build` | `next build` |
| **Dev Server** | `vite` | `next dev` |
| **Speed** | ⚡ Fastest | 🚀 Fast |
| **HMR** | Instant | Fast |

---

## 📦 Complete package.json

```json
{
  "name": "smart-visit-recommendation",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0",
    "@google/generative-ai": "^0.21.0",
    "lucide-react": "^0.344.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "date-fns": "^3.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.4"
  }
}
```

---

## ⚡ Why Vite is Great for This Project

1. **⚡ Lightning Fast**
   - Instant HMR (Hot Module Replacement)
   - <100ms updates
   - Native ES modules

2. **📦 Simple Setup**
   - Less boilerplate than Next.js
   - Straightforward configuration
   - Easy to understand

3. **🚀 Fast Build**
   - Faster production builds
   - Optimized bundle size
   - Better tree-shaking

4. **💯 Perfect for SPAs**
   - No server-side rendering complexity
   - Pure client-side app
   - Simpler deployment

5. **🔧 Great DX**
   - Clear error messages
   - Better debugging
   - Faster iteration

---

## 🎯 Development Workflow

```bash
# Start development
npm run dev
# → Opens http://localhost:3000
# → Super fast HMR

# Build for production
npm run build
# → Outputs to /dist folder

# Preview production build
npm run preview
```

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Option 2: Netlify
```bash
# Build command: npm run build
# Publish directory: dist

# Add environment variables in Netlify dashboard
```

### Option 3: GitHub Pages
```bash
# Add to vite.config.ts:
base: '/your-repo-name/'

# Build and deploy
npm run build
# Push dist folder to gh-pages branch
```

---

## ✅ Complete Setup Checklist

- [ ] Create Vite project in Lovable
- [ ] Install dependencies (@google/generative-ai, react-router-dom)
- [ ] Get Gemini API key (free!)
- [ ] Get OpenWeather API key (free!)
- [ ] Create .env.local with VITE_ prefix
- [ ] Setup vite.config.ts with path aliases
- [ ] Create all service files (gemini, weather)
- [ ] Create mock data (attractions, crowds)
- [ ] Build UI components
- [ ] Test locally
- [ ] Deploy (1-click in Lovable!)

---

## 💡 Vite Pro Tips

1. **Fast Refresh**: Vite's HMR is instant, use it!
2. **Import Aliases**: Use `@/` for cleaner imports
3. **Environment Variables**: Always use `VITE_` prefix
4. **Lazy Loading**: Use dynamic imports for code splitting
5. **Asset Optimization**: Vite handles images/fonts automatically

---

## 🎉 Final Summary

**Vite Stack:**
```
Vite 5 + React 18 + TypeScript
+ Gemini API (FREE!)
+ OpenWeather API (FREE!)
+ React Router v6
+ Tailwind CSS
+ shadcn/ui
= Fast, Modern, FREE! 🚀
```

**Total Cost: $0/month** ✨

Your app will be:
- ⚡ Lightning fast (Vite HMR)
- 🎨 Beautiful (Tailwind + shadcn/ui)
- 🤖 Intelligent (Gemini AI)
- 💰 Free (1M requests/month)
- 🚀 Easy to deploy (Lovable 1-click)

Start building now! 🎯
