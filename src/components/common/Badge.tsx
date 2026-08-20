import React from 'react';
import { clsx } from '@/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-600',
  success: 'bg-green-50 text-success border border-green-200',
  warning: 'bg-amber-50 text-warning border border-amber-200',
  error: 'bg-red-50 text-error border border-red-200',
  info: 'bg-blue-50 text-blue-600 border border-blue-200',
  accent: 'bg-accent/10 text-accent-dark border border-accent/30',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-neutral-400',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-blue-500',
  accent: 'bg-accent',
};

export function Badge({ children, variant = 'default', size = 'md', dot, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1',
        variantClasses[variant],
        className
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
}

// Convenience badge for interview statuses
import type { InterviewStatus, InterviewDifficulty } from '@/types';

export function StatusBadge({ status }: { status: InterviewStatus }) {
  const map: Record<InterviewStatus, { variant: BadgeVariant; label: string }> = {
    completed: { variant: 'success', label: 'Completed' },
    in_progress: { variant: 'info', label: 'In Progress' },
    scheduled: { variant: 'accent', label: 'Scheduled' },
    cancelled: { variant: 'error', label: 'Cancelled' },
    pending: { variant: 'warning', label: 'Pending' },
  };
  const { variant, label } = map[status];
  return <Badge variant={variant} dot>{label}</Badge>;
}

export function DifficultyBadge({ difficulty }: { difficulty: InterviewDifficulty }) {
  const map: Record<InterviewDifficulty, { variant: BadgeVariant; label: string }> = {
    easy: { variant: 'success', label: 'Easy' },
    medium: { variant: 'warning', label: 'Medium' },
    hard: { variant: 'error', label: 'Hard' },
  };
  const { variant, label } = map[difficulty];
  return <Badge variant={variant}>{label}</Badge>;
}
