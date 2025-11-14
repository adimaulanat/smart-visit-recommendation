# Gemini Recommendations UI Component Guide

## Overview
A beautiful, modern UI component to display AI-powered visit recommendations from the Gemini API.

## Files Created

### 1. `GeminiRecommendations.tsx`
Location: `src/components/recommendations/GeminiRecommendations.tsx`

The main component that displays:
- **Best Date Card** - Hero card with the top recommendation
  - Overall score with color-coded display
  - Trophy badge for best choice
  - Score breakdown (Weather, Crowd, Price, Events)
  - Weather details with emoji icons
  - Crowd level with capacity visualization
  - Dynamic pricing information
  - Reasons why this date is recommended
  - Custom badges

- **Alternative Dates** - Grid of other good dates
  - Compact cards with key metrics
  - Quick comparison stats
  - Visual indicators for weather/crowd/price

- **AI Insights** - Tips and recommendations
  - Alert-style cards with AI-generated advice

### 2. `GeminiRecommendationsDemo.tsx`
Location: `src/components/recommendations/GeminiRecommendationsDemo.tsx`

A demo page showing the component with sample data.

### 3. Updated `RecommendationsPage.tsx`
Now uses the new `GeminiRecommendations` component instead of the old `DateRecommendation`.

## Features

### Visual Design
- ✨ Gradient backgrounds with color-coded scores
- 🏆 Trophy icon for best recommendation
- 📊 Score breakdown visualization
- 🌤️ Weather icons with emoji
- 👥 Crowd capacity progress bars
- 💰 IDR currency formatting
- 🎨 shadcn/ui components
- 📱 Fully responsive design

### Score Color Coding
- **Green (80+)**: Excellent
- **Blue (60-79)**: Good
- **Yellow (40-59)**: Fair
- **Red (<40)**: Poor

### Data Display
- Formatted Indonesian dates
- Temperature with conditions
- Crowd percentage with visual bar
- IDR currency formatting
- Precipitation percentage
- Custom badges from AI

## Usage

### Basic Implementation

```tsx
import GeminiRecommendations from '@/components/recommendations/GeminiRecommendations';

function MyPage() {
  const [recommendations, setRecommendations] = useState(null);

  // Fetch from Gemini API
  const fetchRecommendations = async () => {
    const result = await getCachedRecommendations({
      attraction,
      weatherData,
      crowdData,
      preferences: {
        budgetRange: 'medium',
        groupSize: 2,
        interests: ['family-friendly', 'outdoor'],
        avoidCrowds: true
      }
    });
    setRecommendations(result);
  };

  return (
    <div>
      {recommendations && (
        <GeminiRecommendations recommendations={recommendations} />
      )}
    </div>
  );
}
```

### Expected Data Structure

```typescript
interface GeminiRecommendationsData {
  recommendedDates: Array<{
    date: string;              // "2025-11-18"
    dayOfWeek: string;         // "Tuesday"
    score: number;             // 75
    scoreBreakdown: {
      weather: number;         // 40
      crowd: number;           // 25
      price: number;           // 10
      events: number;          // 0
    };
    weather: {
      temperature: number;     // 27
      condition: string;       // "partly_cloudy", "sunny", "rainy"
      precipitation: number;   // 18 (percentage)
    };
    crowd: {
      level: string;           // "Low", "Medium", "High"
      expectedVisitors: number;// 12778
      capacityPercentage: number; // 51
    };
    pricing: {
      dynamicPrice: number;    // 200000 (IDR)
      reason: string;          // "Standard pricing"
    };
    reasons: string[];         // ["Excellent weather...", ...]
    badges: string[];          // ["Best Weather", "Good Crowd"]
  }>;
  insights: Array<{
    type: string;              // "tip"
    title: string;             // "Best Time to Visit"
    message: string;           // "Weekdays typically..."
  }>;
}
```

## Testing

### View the Demo
1. Import the demo component:
```tsx
import GeminiRecommendationsDemo from '@/components/recommendations/GeminiRecommendationsDemo';
```

2. Add to your route or page:
```tsx
<Route path="/demo" element={<GeminiRecommendationsDemo />} />
```

3. Navigate to `/demo` to see the component with sample data

### Test with Real API
The component is already integrated into `RecommendationsPage.tsx`. Just:
1. Go to `/recommendations`
2. Select an attraction
3. Wait for Gemini API response
4. See the beautiful results!

## Customization

### Colors
Edit the gradient backgrounds in the component:
```tsx
getScoreBgColor(score) // Returns gradient classes
```

### Icons
Weather icons are emoji-based:
- ☀️ Sunny
- ☁️ Cloudy
- 🌧️ Rainy
- ⛅ Partly Cloudy

### Badge Icons
Customize badge icons in:
```tsx
getBadgeIcon(badge) // Returns emoji for badges
```

## Dependencies

Already installed in your project:
- `@/components/ui/card` - shadcn/ui Card components
- `@/components/ui/badge` - shadcn/ui Badge component
- `@/components/ui/alert` - shadcn/ui Alert component
- `lucide-react` - Icon library

## Animations

Uses Tailwind CSS animations (already configured):
- `animate-fade-in` - Smooth entrance
- `hover:shadow-lg` - Interactive shadows
- `transition-all` - Smooth transitions

## Mobile Responsive

The component is fully responsive with breakpoints:
- Mobile: Stacked layout
- Tablet (md): 2-column grid for alternatives
- Desktop (lg): Full grid layout

## Screenshots

The component displays:
1. **Hero Card**: Large card with best recommendation
2. **Score Breakdown**: Visual breakdown of 4 scoring categories
3. **Details Grid**: Weather, Crowd, and Pricing cards
4. **Reasons List**: Checkmark list of why this date is best
5. **Alternative Dates**: 2-column grid of other good options
6. **AI Insights**: Alert boxes with helpful tips

## Troubleshooting

### Component not displaying?
- Check if `recommendations` has `recommendedDates` array
- Ensure array is not empty
- Check browser console for TypeScript errors

### Dates not formatted correctly?
- Dates should be in format: "YYYY-MM-DD"
- Uses Indonesian locale ('id-ID')

### Colors not showing?
- Ensure Tailwind CSS is properly configured
- Check if gradient classes are available
- Verify custom colors in tailwind.config.ts

## Next Steps

1. ✅ Component created
2. ✅ Integrated into RecommendationsPage
3. ✅ Demo page created
4. 🔄 Test with real Gemini API
5. 🔄 Customize colors/styling as needed
6. 🔄 Add loading states if needed
7. 🔄 Add error handling UI

## Support

For issues or questions:
- Check the demo at `/demo`
- Review the data structure in `GeminiRecommendationsDemo.tsx`
- Ensure Gemini API returns correct format
- Verify Supabase edge function is working
