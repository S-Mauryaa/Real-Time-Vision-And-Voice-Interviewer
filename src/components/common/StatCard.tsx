import { clsx } from '@/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
  accent?: boolean;
  className?: string;
}

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function StatCard({ label, value, icon, trend, accent, className }: StatCardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-card p-5 border border-border shadow-card hover:shadow-card-hover transition-shadow',
        accent && 'border-primary/30 bg-primary/5',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wide">{label}</p>
          <p className="text-metric font-semibold text-text mt-1">{value}</p>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-card-sm bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-3">
          {trend.value >= 0 ? (
            <TrendingUp className="w-3.5 h-3.5 text-success" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-error" />
          )}
          <span className={clsx('text-xs font-medium', trend.value >= 0 ? 'text-success' : 'text-error')}>
            {trend.value >= 0 ? '+' : ''}{trend.value}%
          </span>
          <span className="text-xs text-text-muted">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
