import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Calendar,
  CloudSun,
  Users,
  DollarSign,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Info,
  Trophy,
  Clock,
  Percent
} from 'lucide-react';

interface WeatherInfo {
  temperature: number;
  condition: string;
  precipitation: number;
}

interface CrowdInfo {
  level: string;
  expectedVisitors: number;
  capacityPercentage: number;
}

interface PricingInfo {
  dynamicPrice: number;
  reason: string;
}

interface ScoreBreakdown {
  weather: number;
  crowd: number;
  price: number;
  events: number;
}

interface RecommendedDate {
  date: string;
  dayOfWeek: string;
  score: number;
  scoreBreakdown: ScoreBreakdown;
  weather: WeatherInfo;
  crowd: CrowdInfo;
  pricing: PricingInfo;
  reasons: string[];
  badges: string[];
}

interface Insight {
  type: string;
  title: string;
  message: string;
}

interface GeminiRecommendationsProps {
  recommendations: {
    recommendedDates: RecommendedDate[];
    insights: Insight[];
  };
}

export default function GeminiRecommendations({ recommendations }: GeminiRecommendationsProps) {
  if (!recommendations || !recommendations.recommendedDates || recommendations.recommendedDates.length === 0) {
    return null;
  }

  const { recommendedDates, insights } = recommendations;

  // Helper functions
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'from-green-50 to-emerald-50 border-green-300';
    if (score >= 60) return 'from-blue-50 to-cyan-50 border-blue-300';
    if (score >= 40) return 'from-yellow-50 to-orange-50 border-yellow-300';
    return 'from-red-50 to-pink-50 border-red-300';
  };

  const getCrowdColor = (level: string): string => {
    const levelLower = level.toLowerCase();
    if (levelLower.includes('low')) return 'bg-green-100 text-green-800 border-green-300';
    if (levelLower.includes('medium') || levelLower.includes('moderate')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getWeatherIcon = (condition: string): string => {
    const condLower = condition.toLowerCase();
    if (condLower.includes('sunny') || condLower.includes('clear')) return '☀️';
    if (condLower.includes('cloud')) return '☁️';
    if (condLower.includes('rain')) return '🌧️';
    if (condLower.includes('partly')) return '⛅';
    return '🌤️';
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getBadgeIcon = (badge: string): string => {
    const badgeLower = badge.toLowerCase();
    if (badgeLower.includes('weather')) return '🌤️';
    if (badgeLower.includes('value') || badgeLower.includes('price')) return '💰';
    if (badgeLower.includes('crowd')) return '👥';
    if (badgeLower.includes('best')) return '⭐';
    return '✨';
  };

  const bestDate = recommendedDates[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Best Recommendation - Hero Card */}
      <Card className={`border-2 shadow-xl bg-gradient-to-br ${getScoreBgColor(bestDate.score)}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white mb-2">
                  🏆 Best Choice
                </Badge>
                <CardTitle className="text-3xl font-bold">
                  {formatDate(bestDate.date)}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{bestDate.dayOfWeek}</p>
              </div>
            </div>
            <div className="text-center">
              <div className={`text-5xl font-bold ${getScoreColor(bestDate.score)}`}>
                {bestDate.score}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Overall Score</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {bestDate.badges.map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {getBadgeIcon(badge)} {badge}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Breakdown */}
          <div className="bg-white/80 backdrop-blur rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Score Breakdown
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <CloudSun className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-blue-600">{bestDate.scoreBreakdown.weather}</div>
                <div className="text-xs text-gray-600">Weather</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <Users className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-purple-600">{bestDate.scoreBreakdown.crowd}</div>
                <div className="text-xs text-gray-600">Crowd</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-green-600">{bestDate.scoreBreakdown.price}</div>
                <div className="text-xs text-gray-600">Price</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <Calendar className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-orange-600">{bestDate.scoreBreakdown.events}</div>
                <div className="text-xs text-gray-600">Events</div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Weather */}
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <CloudSun className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-sm">Weather</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{getWeatherIcon(bestDate.weather.condition)}</span>
                  <span className="text-2xl font-bold text-blue-600">{bestDate.weather.temperature}°C</span>
                </div>
                <p className="text-sm text-gray-700 capitalize">{bestDate.weather.condition.replace('_', ' ')}</p>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Percent className="w-3 h-3" />
                  {bestDate.weather.precipitation}% precipitation
                </div>
              </div>
            </div>

            {/* Crowd */}
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-sm">Crowd Level</h4>
              </div>
              <div className="space-y-2">
                <Badge className={`${getCrowdColor(bestDate.crowd.level)} w-full justify-center text-sm py-1`}>
                  {bestDate.crowd.level}
                </Badge>
                <div className="text-sm text-gray-700">
                  <div className="flex justify-between mb-1">
                    <span>Expected visitors</span>
                    <span className="font-semibold">{bestDate.crowd.expectedVisitors.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        bestDate.crowd.capacityPercentage < 40
                          ? 'bg-green-500'
                          : bestDate.crowd.capacityPercentage < 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${bestDate.crowd.capacityPercentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 mt-1 text-center">
                    {bestDate.crowd.capacityPercentage}% capacity
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-sm">Pricing</h4>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(bestDate.pricing.dynamicPrice)}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {bestDate.pricing.reason}
                </p>
              </div>
            </div>
          </div>

          {/* Reasons */}
          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Why This Date?
            </h4>
            <ul className="space-y-2">
              {bestDate.reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Dates */}
      {recommendedDates.length > 1 && (
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Alternative Dates
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendedDates.slice(1).map((date, index) => (
              <Card
                key={date.date}
                className={`border hover:shadow-lg transition-all bg-gradient-to-br ${getScoreBgColor(date.score)}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{formatDate(date.date)}</CardTitle>
                      <p className="text-sm text-muted-foreground">{date.dayOfWeek}</p>
                    </div>
                    <div className={`text-3xl font-bold ${getScoreColor(date.score)}`}>
                      {date.score}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {date.badges.map((badge, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {getBadgeIcon(badge)} {badge}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/60 rounded p-2">
                      <div className="text-xl">{getWeatherIcon(date.weather.condition)}</div>
                      <div className="text-xs font-semibold text-blue-600">{date.weather.temperature}°C</div>
                    </div>
                    <div className="bg-white/60 rounded p-2">
                      <div className="text-xl">👥</div>
                      <div className={`text-xs font-semibold ${date.crowd.capacityPercentage < 40 ? 'text-green-600' : date.crowd.capacityPercentage < 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {date.crowd.capacityPercentage}%
                      </div>
                    </div>
                    <div className="bg-white/60 rounded p-2">
                      <div className="text-xl">💰</div>
                      <div className="text-xs font-semibold text-green-600">
                        {Math.round(date.pricing.dynamicPrice / 1000)}K
                      </div>
                    </div>
                  </div>

                  {/* Reasons */}
                  <div className="bg-white/60 rounded-lg p-3">
                    <ul className="space-y-1">
                      {date.reasons.slice(0, 2).map((reason, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Insights */}
      {insights && insights.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            AI Insights
          </h3>
          {insights.map((insight, index) => (
            <Alert key={index} className="border-blue-200 bg-blue-50/50">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-900">{insight.title}</AlertTitle>
              <AlertDescription className="text-blue-800">
                {insight.message}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
}
