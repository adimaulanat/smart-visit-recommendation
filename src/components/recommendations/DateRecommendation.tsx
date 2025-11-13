import { DateRecommendation as DateRec } from '@/lib/types/recommendation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { InsightCard } from './InsightCard';
import { formatDate, getDayOfWeek } from '@/lib/utils/dateHelpers';
import { Calendar, CloudSun, Users, TrendingUp, TrendingDown } from 'lucide-react';

interface DateRecommendationProps {
  recommendations: DateRec[];
  loading: boolean;
}

export const DateRecommendation = ({ recommendations, loading }: DateRecommendationProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  const bestRecommendation = [...recommendations].sort((a, b) => b.score - a.score)[0];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-primary';
    return 'text-muted-foreground';
  };

  const getCrowdBadgeVariant = (level: string) => {
    if (level === 'low') return 'default';
    if (level === 'medium') return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Best Recommendation Highlight */}
      <Card className="bg-gradient-card border-2 border-primary/20 shadow-glow">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <Badge className="bg-gradient-primary">Best Choice</Badge>
          </div>
          <CardTitle className="text-2xl">
            {formatDate(bestRecommendation.date)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(bestRecommendation.score)}`}>
                {bestRecommendation.score}
              </div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CloudSun className="w-4 h-4 text-primary" />
                <span>{bestRecommendation.weather.temp}°C, {bestRecommendation.weather.condition}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-secondary" />
                <Badge variant={getCrowdBadgeVariant(bestRecommendation.crowdLevel.crowdLevel)}>
                  {bestRecommendation.crowdLevel.crowdLevel} crowds
                </Badge>
              </div>
            </div>
          </div>
          <InsightCard insight={bestRecommendation.aiInsight} />
        </CardContent>
      </Card>

      {/* All Recommendations */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Next 7 Days
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <Card
              key={rec.date}
              className="hover:shadow-lg transition-all animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{getDayOfWeek(rec.date)}</Badge>
                  <span className={`text-2xl font-bold ${getScoreColor(rec.score)}`}>
                    {rec.score}
                  </span>
                </div>
                <CardTitle className="text-base">
                  {new Date(rec.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Weather</span>
                  <span className="font-medium">{rec.weather.temp}°C</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Crowds</span>
                  <Badge variant={getCrowdBadgeVariant(rec.crowdLevel.crowdLevel)}>
                    {rec.crowdLevel.crowdLevel}
                  </Badge>
                </div>
                <div className="pt-2 border-t space-y-1">
                  {rec.pros.slice(0, 2).map((pro, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <TrendingUp className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{pro}</span>
                    </div>
                  ))}
                  {rec.cons.slice(0, 1).map((con, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <TrendingDown className="w-3 h-3 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{con}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
