import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Percent,
  Download,
  Share2,
  CalendarPlus,
  ArrowRight,
  ThumbsUp,
  MapPin,
  AlertCircle
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
  attractionName?: string;
  onBookDate?: (date: string) => void;
}

export default function GeminiRecommendationsEnhanced({
  recommendations,
  attractionName = 'this attraction',
  onBookDate
}: GeminiRecommendationsProps) {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  if (!recommendations || !recommendations.recommendedDates || recommendations.recommendedDates.length === 0) {
    return null;
  }

  const { recommendedDates, insights } = recommendations;
  const selectedDate = recommendedDates[selectedDateIndex];

  // Helper functions
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'from-emerald-50 via-green-50 to-teal-50 border-emerald-200';
    if (score >= 60) return 'from-blue-50 via-cyan-50 to-sky-50 border-blue-200';
    if (score >= 40) return 'from-amber-50 via-yellow-50 to-orange-50 border-amber-200';
    return 'from-red-50 via-rose-50 to-pink-50 border-red-200';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const getCrowdColor = (level: string): string => {
    const levelLower = level.toLowerCase();
    if (levelLower.includes('low')) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (levelLower.includes('medium') || levelLower.includes('moderate')) return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getWeatherIcon = (condition: string): string => {
    const condLower = condition.toLowerCase();
    if (condLower.includes('sunny') || condLower.includes('clear')) return '☀️';
    if (condLower.includes('cloud') && !condLower.includes('partly')) return '☁️';
    if (condLower.includes('rain')) return '🌧️';
    if (condLower.includes('partly')) return '⛅';
    return '🌤️';
  };

  const getBadgeIcon = (badge: string): string => {
    const badgeLower = badge.toLowerCase();
    if (badgeLower.includes('weather')) return '🌤️';
    if (badgeLower.includes('value') || badgeLower.includes('price')) return '💰';
    if (badgeLower.includes('crowd')) return '👥';
    if (badgeLower.includes('best')) return '⭐';
    return '✨';
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

  const formatShortDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      month: 'short',
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Visit ${attractionName}`,
          text: `Best date to visit: ${formatDate(selectedDate.date)} - Score: ${selectedDate.score}/100`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleExport = () => {
    const exportData = {
      attraction: attractionName,
      recommendations: recommendedDates,
      generatedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recommendations-${attractionName}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const bestDate = recommendedDates[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Quick Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-2 hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center">
              <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <div className={`text-3xl font-bold ${getScoreColor(bestDate.score)}`}>
                {bestDate.score}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Best Score</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center">
              <CloudSun className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-600">
                {bestDate.weather.temperature}°C
              </div>
              <p className="text-xs text-muted-foreground mt-1">Temperature</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-600">
                {bestDate.crowd.capacityPercentage}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Capacity</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center">
              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-600">
                {Math.round(bestDate.pricing.dynamicPrice / 1000)}K
              </div>
              <p className="text-xs text-muted-foreground mt-1">Price (IDR)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Recommendation Card */}
      <Card className={`border-2 shadow-2xl bg-gradient-to-br ${getScoreBgColor(bestDate.score)}`}>
        <CardHeader className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white mb-2 shadow-md">
                    🏆 Best Recommendation
                  </Badge>
                  <CardTitle className="text-3xl md:text-4xl font-bold">
                    {formatDate(bestDate.date)}
                  </CardTitle>
                  <CardDescription className="text-base mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {bestDate.dayOfWeek}
                  </CardDescription>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {bestDate.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-sm px-3 py-1 shadow-sm">
                    {getBadgeIcon(badge)} {badge}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className={`text-6xl md:text-7xl font-black ${getScoreColor(bestDate.score)} leading-none`}>
                {bestDate.score}
              </div>
              <p className="text-sm font-semibold text-muted-foreground mt-2">
                {getScoreLabel(bestDate.score)} Match
              </p>
              <div className="flex gap-2 mt-4 justify-center md:justify-end">
                <Button size="sm" variant="outline" onClick={handleShare} className="shadow-sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
                <Button size="sm" variant="outline" onClick={handleExport} className="shadow-sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Breakdown */}
          <div className="bg-white/90 backdrop-blur rounded-xl p-5 shadow-sm border">
            <h4 className="font-semibold text-base mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Score Breakdown
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: CloudSun, label: 'Weather', value: bestDate.scoreBreakdown.weather, max: 40, color: 'blue' },
                { icon: Users, label: 'Crowd', value: bestDate.scoreBreakdown.crowd, max: 35, color: 'purple' },
                { icon: DollarSign, label: 'Price', value: bestDate.scoreBreakdown.price, max: 15, color: 'green' },
                { icon: Calendar, label: 'Events', value: bestDate.scoreBreakdown.events, max: 10, color: 'orange' }
              ].map(({ icon: Icon, label, value, max, color }) => (
                <div key={label} className={`text-center p-4 bg-${color}-50 rounded-lg border border-${color}-200`}>
                  <Icon className={`w-6 h-6 text-${color}-600 mx-auto mb-2`} />
                  <div className="relative mb-2">
                    <div className="text-3xl font-bold text-${color}-600">{value}</div>
                    <div className="text-xs text-gray-500">/ {max}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-700">{label}</div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div
                      className={`h-1.5 rounded-full bg-${color}-500`}
                      style={{ width: `${(value / max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Information Grid */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Weather Card */}
            <div className="bg-white/90 backdrop-blur rounded-xl p-5 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <CloudSun className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-base">Weather Forecast</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{getWeatherIcon(bestDate.weather.condition)}</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{bestDate.weather.temperature}°C</div>
                    <p className="text-xs text-gray-600 mt-1">Feels comfortable</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 capitalize">
                    {bestDate.weather.condition.replace('_', ' ')}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Percent className="w-3 h-3" />
                      Precipitation
                    </span>
                    <span className="font-semibold text-blue-600">{bestDate.weather.precipitation}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Crowd Card */}
            <div className="bg-white/90 backdrop-blur rounded-xl p-5 border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-base">Crowd Forecast</h4>
              </div>
              <div className="space-y-3">
                <Badge className={`${getCrowdColor(bestDate.crowd.level)} w-full justify-center text-base py-2 shadow-sm`}>
                  {bestDate.crowd.level} Crowd
                </Badge>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expected visitors</span>
                    <span className="font-semibold text-purple-600">
                      {bestDate.crowd.expectedVisitors.toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          bestDate.crowd.capacityPercentage < 40
                            ? 'bg-emerald-500'
                            : bestDate.crowd.capacityPercentage < 60
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${bestDate.crowd.capacityPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Capacity</span>
                      <span className="font-semibold text-purple-600">
                        {bestDate.crowd.capacityPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white/90 backdrop-blur rounded-xl p-5 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-base">Pricing</h4>
              </div>
              <div className="space-y-3">
                <div className="text-center py-2">
                  <div className="text-3xl font-bold text-green-600">
                    {formatCurrency(bestDate.pricing.dynamicPrice)}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Per person</p>
                </div>
                <Separator />
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-xs text-green-800 leading-relaxed flex items-start gap-2">
                    <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    {bestDate.pricing.reason}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reasons */}
          <div className="bg-white/90 backdrop-blur rounded-xl p-5 border shadow-sm">
            <h4 className="font-semibold text-base mb-4 flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-emerald-600" />
              Why We Recommend This Date
            </h4>
            <ul className="space-y-3">
              {bestDate.reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-700 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          {onBookDate && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1 text-lg py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                onClick={() => onBookDate(bestDate.date)}
              >
                <CalendarPlus className="w-5 h-5 mr-2" />
                Book This Date
              </Button>
              <Button size="lg" variant="outline" className="sm:w-auto px-8 py-6" onClick={handleShare}>
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alternative Dates - Tabs View */}
      {recommendedDates.length > 1 && (
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                Alternative Dates
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComparison(!showComparison)}
              >
                {showComparison ? 'Grid View' : 'Compare All'}
              </Button>
            </div>
            <CardDescription>
              Other great times to visit based on your preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showComparison ? (
              <div className="grid md:grid-cols-2 gap-4">
                {recommendedDates.slice(1).map((date, index) => (
                  <Card
                    key={date.date}
                    className={`border-2 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br ${getScoreBgColor(date.score)}`}
                    onClick={() => setSelectedDateIndex(index + 1)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{formatDate(date.date)}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{date.dayOfWeek}</p>
                        </div>
                        <div className="text-center">
                          <div className={`text-4xl font-bold ${getScoreColor(date.score)}`}>
                            {date.score}
                          </div>
                          <p className="text-xs text-muted-foreground">{getScoreLabel(date.score)}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {date.badges.map((badge, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {getBadgeIcon(badge)} {badge}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/70 rounded-lg p-3 text-center">
                          <div className="text-2xl mb-1">{getWeatherIcon(date.weather.condition)}</div>
                          <div className="text-lg font-bold text-blue-600">{date.weather.temperature}°C</div>
                          <div className="text-xs text-gray-600">Weather</div>
                        </div>
                        <div className="bg-white/70 rounded-lg p-3 text-center">
                          <div className="text-2xl mb-1">👥</div>
                          <div className={`text-lg font-bold ${date.crowd.capacityPercentage < 40 ? 'text-green-600' : date.crowd.capacityPercentage < 60 ? 'text-amber-600' : 'text-red-600'}`}>
                            {date.crowd.capacityPercentage}%
                          </div>
                          <div className="text-xs text-gray-600">Capacity</div>
                        </div>
                        <div className="bg-white/70 rounded-lg p-3 text-center">
                          <div className="text-2xl mb-1">💰</div>
                          <div className="text-lg font-bold text-green-600">
                            {Math.round(date.pricing.dynamicPrice / 1000)}K
                          </div>
                          <div className="text-xs text-gray-600">Price</div>
                        </div>
                      </div>

                      {/* Reasons Preview */}
                      <div className="bg-white/70 rounded-lg p-3 border">
                        <ul className="space-y-1">
                          {date.reasons.slice(0, 2).map((reason, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-2">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button variant="outline" size="sm" className="w-full" onClick={() => onBookDate?.(date.date)}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // Comparison Table View
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Date</th>
                      <th className="text-center p-3 font-semibold">Score</th>
                      <th className="text-center p-3 font-semibold">Weather</th>
                      <th className="text-center p-3 font-semibold">Crowd</th>
                      <th className="text-center p-3 font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendedDates.map((date, index) => (
                      <tr key={date.date} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-semibold">{formatShortDate(date.date)}</div>
                          <div className="text-xs text-gray-600">{date.dayOfWeek}</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className={`text-2xl font-bold ${getScoreColor(date.score)}`}>
                            {date.score}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="text-xl">{getWeatherIcon(date.weather.condition)}</div>
                          <div className="text-sm font-semibold">{date.weather.temperature}°C</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className={`text-sm font-bold ${date.crowd.capacityPercentage < 40 ? 'text-green-600' : date.crowd.capacityPercentage < 60 ? 'text-amber-600' : 'text-red-600'}`}>
                            {date.crowd.capacityPercentage}%
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="text-sm font-semibold text-green-600">
                            {Math.round(date.pricing.dynamicPrice / 1000)}K
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      {insights && insights.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            AI-Powered Insights
          </h3>
          <div className="grid gap-4">
            {insights.map((insight, index) => (
              <Alert key={index} className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-sm">
                <Info className="h-5 w-5 text-blue-600" />
                <AlertTitle className="text-blue-900 font-semibold text-lg">
                  {insight.title}
                </AlertTitle>
                <AlertDescription className="text-blue-800 leading-relaxed mt-2">
                  {insight.message}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
