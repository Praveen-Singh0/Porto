import GlassCard from './GlassCard';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change?: number;
  color: string;
  delay?: number;
}

export default function StatsCard({ icon: Icon, title, value, change, color, delay }: StatsCardProps) {
  return (
    <GlassCard delay={delay} className="relative overflow-hidden">
      {/* Color accent */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl"
        style={{ backgroundColor: color }}
      />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          {change && (
            <span className={cn(
              "text-sm font-medium",
              change > 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
            )}>
              {change > 0 ? '+' : ''}{change}%
            </span>
          )}
        </div>

        <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </GlassCard>
  );
}
