import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-lg border bg-white shadow-sm transition-shadow dark:bg-neutral-900 dark:border-neutral-800',
  {
    variants: {
      variant: {
        default: 'border-neutral-200',
        elevated: 'border-neutral-200 shadow-md hover:shadow-lg',
        outlined: 'border-2 border-primary shadow-none',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, header, footer, children, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, padding: header || footer ? 'none' : padding, className }))}
        ref={ref}
        {...props}
      >
        {header && (
          <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
            {header}
          </div>
        )}
        <div className={cn(header || footer ? 'p-6' : '')}>{children}</div>
        {footer && (
          <div className="border-t border-neutral-200 px-6 py-4 dark:border-neutral-800">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
