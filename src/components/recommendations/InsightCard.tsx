import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Lightbulb,
  AlertTriangle,
  Star,
  Info,
  TrendingUp,
  Heart,
  Zap,
  Target,
  LucideIcon
} from 'lucide-react';

interface InsightCardProps {
  insight: string | {
    type?: 'tip' | 'warning' | 'highlight' | 'info' | 'success' | 'trending' | 'recommendation';
    title?: string;
    content: string;
    priority?: 'low' | 'medium' | 'high';
  };
}

export default function InsightCard({ insight }: InsightCardProps) {
  // Handle both string and object formats
  const insightData = typeof insight === 'string'
    ? { type: 'tip' as const, content: insight }
    : insight;

  const { type = 'tip', title, content, priority = 'medium' } = insightData;

  // Configuration for different insight types
  const typeConfig: Record<string, {
    icon: LucideIcon;
    bgColor: string;
    borderColor: string;
    iconBgColor: string;
    iconColor: string;
    titleColor: string;
    label: string;
  }> = {
    tip: {
      icon: Lightbulb,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-900',
      label: 'Tip'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconBgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-900',
      label: 'Warning'
    },
    highlight: {
      icon: Star,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      titleColor: 'text-purple-900',
      label: 'Highlight'
    },
    info: {
      icon: Info,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      iconBgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      titleColor: 'text-gray-900',
      label: 'Info'
    },
    success: {
      icon: Target,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      titleColor: 'text-green-900',
      label: 'Success'
    },
    trending: {
      icon: TrendingUp,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconBgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      titleColor: 'text-orange-900',
      label: 'Trending'
    },
    recommendation: {
      icon: Heart,
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      iconBgColor: 'bg-pink-100',
      iconColor: 'text-pink-600',
      titleColor: 'text-pink-900',
      label: 'Recommendation'
    }
  };

  const config = typeConfig[type] || typeConfig.tip;
  const IconComponent = config.icon;

  // Priority badge styling
  const priorityConfig = {
    low: 'bg-gray-200 text-gray-700',
    medium: 'bg-blue-200 text-blue-700',
    high: 'bg-red-200 text-red-700'
  };

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-l-4 transition-all hover:shadow-md`}>
      <CardContent className="pt-4">
        <div className="flex gap-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full ${config.iconBgColor} flex items-center justify-center`}>
              <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className={`font-semibold text-sm ${config.titleColor}`}>
                {title || config.label}
              </div>
              {priority !== 'medium' && (
                <Badge variant="secondary" className={`text-xs ${priorityConfig[priority]}`}>
                  {priority}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
