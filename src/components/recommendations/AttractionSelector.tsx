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
              <Badge variant={attraction.weatherDependent ? 'default' : 'secondary'}>
                {attraction.type}
              </Badge>
              {selectedId === attraction.id && (
                <Badge className="bg-gradient-primary">Selected</Badge>
              )}
            </div>
            <CardTitle className="text-lg">{attraction.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm">
              <MapPin className="w-3 h-3" />
              {attraction.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {attraction.description}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-primary transition-all"
                  style={{ width: `${attraction.averageCrowd}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {attraction.averageCrowd}% avg
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
