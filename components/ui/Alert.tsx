import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:rtl:left-auto [&>svg]:rtl:right-4 [&>svg+div]:pl-8 [&>svg+div]:rtl:pr-8 [&>svg+div]:rtl:pl-0',
  {
    variants: {
      variant: {
        info: 'bg-info-50 border-info-200 text-info-900 [&>svg]:text-info-600 dark:bg-info-900/20 dark:border-info-800 dark:text-info-100',
        success: 'bg-success-50 border-success-200 text-success-900 [&>svg]:text-success-600 dark:bg-success-900/20 dark:border-success-800 dark:text-success-100',
        warning: 'bg-warning-50 border-warning-200 text-warning-900 [&>svg]:text-warning-600 dark:bg-warning-900/20 dark:border-warning-800 dark:text-warning-100',
        error: 'bg-error-50 border-error-200 text-error-900 [&>svg]:text-error-600 dark:bg-error-900/20 dark:border-error-800 dark:text-error-100',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, dismissible, onDismiss, children, ...props }, ref) => {
    const Icon = variant ? iconMap[variant] : iconMap.info;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
        <div className={cn(dismissible && 'pr-8 rtl:pl-8 rtl:pr-0')}>
          {title && (
            <h5 className="mb-1 font-medium leading-none tracking-tight rtl:text-right">
              {title}
            </h5>
          )}
          <div className="text-sm [&_p]:leading-relaxed rtl:text-right">{children}</div>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="absolute right-4 top-4 text-current opacity-70 hover:opacity-100 transition-opacity rtl:right-auto rtl:left-4"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
