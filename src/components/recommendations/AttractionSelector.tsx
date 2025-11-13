import { useState, useMemo } from 'react';
import { Attraction, attractions } from '@/lib/data/attractions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search, X } from 'lucide-react';

interface AttractionSelectorProps {
  onSelect: (attraction: Attraction) => void;
  selected?: Attraction | null;
}

export default function AttractionSelector({ onSelect, selected }: AttractionSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Attractions' },
    { id: 'theme_park', label: 'Theme Parks' },
    { id: 'museum', label: 'Museums' },
    { id: 'nature', label: 'Nature' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'aquarium', label: 'Aquarium' }
  ];

  const filteredAttractions = useMemo(() => {
    return attractions.filter((attraction) => {
      const matchesSearch =
        attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search attractions, cities, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Found {filteredAttractions.length} {filteredAttractions.length === 1 ? 'attraction' : 'attractions'}
      </div>

      {/* Attractions Grid */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {filteredAttractions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">No attractions found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredAttractions.map((attraction) => (
            <Card
              key={attraction.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selected?.id === attraction.id
                  ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50'
                  : 'hover:scale-[1.02]'
              }`}
              onClick={() => onSelect(attraction)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {attraction.category.replace('_', ' ').toUpperCase()}
                  </Badge>
                  {selected?.id === attraction.id && (
                    <Badge className="bg-blue-600 text-xs">Selected</Badge>
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">{attraction.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-sm">
                  <MapPin className="w-3 h-3" />
                  {attraction.location.city}, {attraction.location.country}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {attraction.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {attraction.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {attraction.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{attraction.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    ⭐ {attraction.rating} ({attraction.totalReviews.toLocaleString()} reviews)
                  </span>
                  <span>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: attraction.currency,
                      minimumFractionDigits: 0
                    }).format(attraction.basePrice)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
