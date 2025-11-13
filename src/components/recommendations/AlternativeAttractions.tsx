import { Attraction } from '@/lib/data/attractions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Sparkles, TrendingUp, TrendingDown, DollarSign, Star } from 'lucide-react';

interface AlternativeAttractionsProps {
  alternatives: any[];
  onSelect?: (attraction: any) => void;
}

export default function AlternativeAttractions({ alternatives, onSelect }: AlternativeAttractionsProps) {
  if (!alternatives || alternatives.length === 0) {
    return null;
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  const getPriceComparison = (currentPrice: number, comparePrice: number) => {
    const diff = ((currentPrice - comparePrice) / comparePrice) * 100;
    return {
      percentage: Math.abs(Math.round(diff)),
      isHigher: diff > 0,
      isLower: diff < 0,
      isSame: Math.abs(diff) < 5
    };
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-xl font-semibold">You Might Also Like</h3>
        <Badge variant="secondary" className="ml-auto">
          {alternatives.length} alternatives
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alternatives.map((alt: any, index: number) => {
          const attraction = alt.attraction || alt;
          const similarityScore = alt.similarityScore || alt.score || 0;
          const reason = alt.reason || '';
          const baseAttraction = alternatives[0]?.originalAttraction;

          return (
            <Card
              key={attraction.id}
              className="hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {attraction.category?.replace('_', ' ').toUpperCase()}
                  </Badge>
                  {similarityScore > 0 && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">
                        {similarityScore}%
                      </div>
                      <div className="text-xs text-gray-500">match</div>
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">{attraction.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-sm">
                  <MapPin className="w-3 h-3" />
                  {attraction.location?.city}, {attraction.location?.country}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Description/Reason */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {reason || attraction.description}
                </p>

                {/* Rating */}
                {attraction.rating && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{attraction.rating}</span>
                    </div>
                    <span className="text-gray-500">
                      ({attraction.totalReviews?.toLocaleString()} reviews)
                    </span>
                  </div>
                )}

                {/* Price Comparison */}
                {attraction.basePrice && (
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <DollarSign className="w-3 h-3" />
                        Price
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {formatPrice(attraction.basePrice, attraction.currency || 'IDR')}
                        </div>
                        {baseAttraction && baseAttraction.basePrice && (
                          (() => {
                            const comparison = getPriceComparison(
                              attraction.basePrice,
                              baseAttraction.basePrice
                            );
                            return !comparison.isSame ? (
                              <div className="flex items-center gap-1 text-xs">
                                {comparison.isLower ? (
                                  <>
                                    <TrendingDown className="w-3 h-3 text-green-500" />
                                    <span className="text-green-600">
                                      {comparison.percentage}% cheaper
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <TrendingUp className="w-3 h-3 text-red-500" />
                                    <span className="text-red-600">
                                      {comparison.percentage}% higher
                                    </span>
                                  </>
                                )}
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500">Similar price</div>
                            );
                          })()
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {attraction.tags && attraction.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {attraction.tags.slice(0, 3).map((tag: string) => (
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
                )}

                {/* Available Dates Info */}
                {alt.bestDates && alt.bestDates.length > 0 && (
                  <div className="pt-2 border-t">
                    <div className="text-xs text-gray-500 mb-1">Best dates available:</div>
                    <div className="flex flex-wrap gap-1">
                      {alt.bestDates.slice(0, 3).map((date: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {new Date(date).toLocaleDateString('id-ID', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {onSelect && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => onSelect(attraction)}
                  >
                    View Recommendations
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
