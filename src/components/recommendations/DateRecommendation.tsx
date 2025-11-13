import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, CloudSun, Users, TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { getCrowdLevelText } from '@/lib/data/crowdPredictions';

interface DateRecommendationProps {
  recommendations: any;
}

export default function DateRecommendation({ recommendations }: DateRecommendationProps) {
  if (!recommendations || !recommendations.bestDates) {
    return null;
  }

  const { bestDates, summary } = recommendations;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-blue-50 border-blue-200';
    if (score >= 40) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getCrowdBadgeVariant = (level: string) => {
    if (level === 'low') return 'default';
    if (level === 'moderate') return 'secondary';
    if (level === 'high') return 'destructive';
    return 'destructive';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatShortDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { weekday: 'short' });
  };

  const bestDate = bestDates[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Card */}
      {summary && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              AI Recommendation Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Best Date Highlight */}
      {bestDate && (
        <Card className={`border-2 shadow-lg ${getScoreBgColor(bestDate.score)}`}>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
                🏆 Best Choice
              </Badge>
              <div className={`text-4xl font-bold ${getScoreColor(bestDate.score)}`}>
                {bestDate.score}
              </div>
            </div>
            <CardTitle className="text-2xl">
              {formatDate(bestDate.date)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Weather & Crowd Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                <CloudSun className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-xs text-gray-500">Weather</div>
                  <div className="font-medium">{bestDate.weather.temp}°C</div>
                  <div className="text-xs text-gray-600">{bestDate.weather.condition}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                <Users className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="text-xs text-gray-500">Crowd Level</div>
                  <Badge variant={getCrowdBadgeVariant(bestDate.crowdLevel)}>
                    {getCrowdLevelText(bestDate.crowdLevel)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Capacity Info */}
            {bestDate.expectedVisitors && bestDate.capacityPercentage && (
              <div className="p-3 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Expected Visitors</span>
                  <span className="font-medium">{bestDate.expectedVisitors.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      bestDate.capacityPercentage < 40
                        ? 'bg-green-500'
                        : bestDate.capacityPercentage < 70
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${bestDate.capacityPercentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {bestDate.capacityPercentage}% capacity
                </div>
              </div>
            )}

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bestDate.pros && bestDate.pros.length > 0 && (
                <div className="p-3 bg-white rounded-lg">
                  <div className="font-medium text-sm text-green-700 mb-2">✓ Pros</div>
                  <ul className="space-y-1">
                    {bestDate.pros.map((pro: string, i: number) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <TrendingUp className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {bestDate.cons && bestDate.cons.length > 0 && (
                <div className="p-3 bg-white rounded-lg">
                  <div className="font-medium text-sm text-red-700 mb-2">⚠ Cons</div>
                  <ul className="space-y-1">
                    {bestDate.cons.map((con: string, i: number) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <TrendingDown className="w-3 h-3 text-red-500 mt-1 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* AI Insight */}
            {bestDate.aiInsight && (
              <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
                <div className="font-medium text-sm text-blue-700 mb-1">💡 AI Insight</div>
                <p className="text-sm text-gray-700 leading-relaxed">{bestDate.aiInsight}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* All Recommendations */}
      {bestDates.length > 1 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Next {bestDates.length} Days Forecast
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bestDates.map((rec: any, index: number) => (
              <Card
                key={rec.date}
                className={`hover:shadow-lg transition-all ${getScoreBgColor(rec.score)}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{getDayOfWeek(rec.date)}</Badge>
                    <span className={`text-2xl font-bold ${getScoreColor(rec.score)}`}>
                      {rec.score}
                    </span>
                  </div>
                  <CardTitle className="text-base">
                    {formatShortDate(rec.date)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <CloudSun className="w-3 h-3" />
                      Weather
                    </span>
                    <span className="font-medium">{rec.weather.temp}°C</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Crowds
                    </span>
                    <Badge variant={getCrowdBadgeVariant(rec.crowdLevel)} className="text-xs">
                      {rec.crowdLevel}
                    </Badge>
                  </div>
                  {rec.capacityPercentage && (
                    <div className="pt-2 border-t">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            rec.capacityPercentage < 40
                              ? 'bg-green-500'
                              : rec.capacityPercentage < 70
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${rec.capacityPercentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {rec.capacityPercentage}% full
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
