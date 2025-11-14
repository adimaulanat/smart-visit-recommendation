import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertCircle,
  WifiOff,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Clock
} from 'lucide-react';

// Enhanced Loading State with Skeleton
export function RecommendationLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Loading Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="relative">
            <Sparkles className="w-12 h-12 text-purple-500 animate-pulse" />
            <div className="absolute inset-0 w-12 h-12 bg-purple-500/20 rounded-full animate-ping" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          AI is analyzing your perfect visit date...
        </h3>
        <p className="text-gray-600">
          Processing weather, crowd data, and pricing information
        </p>
      </div>

      {/* Progress Steps */}
      <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {[
          { icon: TrendingUp, label: 'Analyzing weather patterns', delay: '0s' },
          { icon: Target, label: 'Calculating crowd levels', delay: '0.2s' },
          { icon: Clock, label: 'Optimizing recommendations', delay: '0.4s' }
        ].map(({ icon: Icon, label, delay }, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 animate-pulse"
            style={{ animationDelay: delay }}
          >
            <Icon className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-700">{label}</span>
          </div>
        ))}
      </div>

      {/* Quick Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-2">
            <CardContent className="pt-6">
              <Skeleton className="h-8 w-8 mx-auto mb-2 rounded-full" />
              <Skeleton className="h-8 w-16 mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Card Skeleton */}
      <Card className="border-2 shadow-xl">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
            <Skeleton className="h-20 w-20 rounded-xl" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Breakdown Skeleton */}
          <div className="bg-gray-50 rounded-xl p-5">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center p-4 bg-white rounded-lg">
                  <Skeleton className="h-6 w-6 mx-auto mb-2 rounded" />
                  <Skeleton className="h-8 w-12 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto mb-2" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Grid Skeleton */}
          <div className="grid md:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border">
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-20 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>

          {/* Reasons Skeleton */}
          <div className="bg-white rounded-xl p-5 border space-y-3">
            <Skeleton className="h-6 w-48 mb-4" />
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Enhanced Error State
interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  type?: 'network' | 'api' | 'data' | 'unknown';
}

export function RecommendationError({ message, onRetry, type = 'unknown' }: ErrorStateProps) {
  const getErrorIcon = () => {
    switch (type) {
      case 'network':
        return <WifiOff className="w-16 h-16 text-red-500" />;
      case 'api':
        return <AlertCircle className="w-16 h-16 text-orange-500" />;
      default:
        return <AlertCircle className="w-16 h-16 text-red-500" />;
    }
  };

  const getErrorTitle = () => {
    switch (type) {
      case 'network':
        return 'Connection Lost';
      case 'api':
        return 'Service Unavailable';
      case 'data':
        return 'Data Error';
      default:
        return 'Something Went Wrong';
    }
  };

  const getErrorSuggestions = () => {
    switch (type) {
      case 'network':
        return [
          'Check your internet connection',
          'Try refreshing the page',
          'Disable VPN if enabled'
        ];
      case 'api':
        return [
          'Our AI service is temporarily unavailable',
          'Please try again in a few moments',
          'Contact support if this persists'
        ];
      case 'data':
        return [
          'Some data might be missing or invalid',
          'Try selecting a different attraction',
          'Refresh the page to reload data'
        ];
      default:
        return [
          'An unexpected error occurred',
          'Try refreshing the page',
          'Contact support if the problem persists'
        ];
    }
  };

  return (
    <div className="animate-fade-in">
      <Card className="border-2 border-red-200 bg-red-50/50 shadow-lg">
        <CardContent className="py-16">
          <div className="max-w-md mx-auto text-center">
            {/* Error Icon */}
            <div className="mb-6 inline-flex">
              {getErrorIcon()}
            </div>

            {/* Error Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {getErrorTitle()}
            </h3>

            {/* Error Message */}
            <Alert variant="destructive" className="mb-6 text-left">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Details</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>

            {/* Suggestions */}
            <div className="mb-6 text-left bg-white rounded-lg p-4 border-2 border-gray-200">
              <h4 className="font-semibold text-sm text-gray-900 mb-3">What you can try:</h4>
              <ul className="space-y-2">
                {getErrorSuggestions().map((suggestion, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              {onRetry && (
                <Button
                  onClick={onRetry}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Empty State - No Attraction Selected
export function RecommendationEmpty() {
  return (
    <div className="animate-fade-in">
      <Card className="border-2 border-dashed border-gray-300 bg-gradient-to-br from-blue-50/30 to-purple-50/30">
        <CardContent className="py-20">
          <div className="max-w-md mx-auto text-center">
            {/* Illustration */}
            <div className="mb-8 relative">
              <div className="text-8xl mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
                🎯
              </div>
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-32 h-32 bg-purple-200/30 rounded-full blur-2xl" />
              </div>
            </div>

            {/* Text */}
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Ready to Plan Your Visit?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Select an attraction from the list to get AI-powered recommendations for the best time to visit.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: '🌤️', label: 'Weather Analysis' },
                { icon: '👥', label: 'Crowd Predictions' },
                { icon: '💰', label: 'Smart Pricing' }
              ].map(({ icon, label }, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-purple-300 transition-colors"
                >
                  <div className="text-3xl mb-2">{icon}</div>
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <p className="text-sm text-gray-500">
              👈 Choose an attraction to get started
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// No Results State
export function RecommendationNoResults() {
  return (
    <div className="animate-fade-in">
      <Card className="border-2 border-amber-200 bg-amber-50/50">
        <CardContent className="py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Recommendations Available
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't generate recommendations for this attraction at the moment.
              This might be due to insufficient data or temporary service issues.
            </p>
            <Button variant="outline" size="lg">
              Try Another Attraction
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
