import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-xl transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-[#F5F1E8] border border-[#d4c9b8]',
        elevated: 'bg-[#F5F1E8] shadow-lg',
        outlined: 'bg-transparent border-2 border-[#d4c9b8]',
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