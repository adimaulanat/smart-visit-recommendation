import { Attraction } from '@/lib/types/recommendation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface AttractionSelectorProps {
  attractions: Attraction[];
  onSelect: (attraction: Attraction) => void;
  selectedId?: string;
}

export const AttractionSelector = ({ attractions, onSelect, selectedId }: AttractionSelectorProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
      {attractions.map((attraction, index) => (
        <Card
          key={attraction.id}
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedId === attraction.id
              ? 'ring-2 ring-primary shadow-glow'
              : 'hover:scale-105'
          }`}
          onClick={() => onSelect(attraction)}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <Badge variant="secondary">
                {attraction.category.replace('_', ' ')}
              </Badge>
              {selectedId === attraction.id && (
                <Badge className="bg-gradient-primary">Selected</Badge>
              )}
            </div>
            <CardTitle className="text-lg">{attraction.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm">
              <MapPin className="w-3 h-3" />
              {attraction.location.city}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {attraction.description}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>⭐ {attraction.rating} ({attraction.totalReviews.toLocaleString()})</span>
              <span>Capacity: {attraction.capacity.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
