import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface InsightCardProps {
  insight: string;
}

export const InsightCard = ({ insight }: InsightCardProps) => {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="pt-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div>
            <div className="font-medium text-sm mb-1">AI Insight</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{insight}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
