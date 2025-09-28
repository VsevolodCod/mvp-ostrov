import React from 'react';
import { Badge as ShadcnBadge, type BadgeProps as ShadcnBadgeProps } from '@/components/ui/badge';

interface BadgeProps extends Omit<ShadcnBadgeProps, 'variant'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', ...props }, ref) => {
    return <ShadcnBadge ref={ref} variant={variant} {...props} />;
  }
);

Badge.displayName = 'Badge';
