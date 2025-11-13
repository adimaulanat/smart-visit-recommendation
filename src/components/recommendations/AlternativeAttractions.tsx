import { AlternativeAttraction } from '@/lib/types/recommendation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Sparkles } from 'lucide-react';

interface AlternativeAttractionsProps {
  alternatives: AlternativeAttraction[];
  onSelect: (attraction: AlternativeAttraction) => void;
}

export const AlternativeAttractions = ({ alternatives, onSelect }: AlternativeAttractionsProps) => {
  if (alternatives.length === 0) return null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent" />
        <h3 className="text-xl font-semibold">You Might Also Like</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {alternatives.map((attraction, index) => (
          <Card
            key={attraction.id}
            className="hover:shadow-lg transition-all animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary">{attraction.category.replace('_', ' ')}</Badge>
                <div className="text-right">
                  <div className="text-lg font-bold text-accent">
                    {attraction.similarityScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">match</div>
                </div>
              </div>
              <CardTitle className="text-lg">{attraction.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-sm">
                <MapPin className="w-3 h-3" />
                {attraction.location.city}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {attraction.reason}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onSelect(attraction)}
              >
                View Recommendations
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
