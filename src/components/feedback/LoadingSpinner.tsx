export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  label = 'Loading...',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const chosenSizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      id="loading-spinner-container"
      className={`flex flex-col items-center justify-center p-4 ${className}`}
      role="status"
      aria-label={label}
    >
      <div
        id="loading-spinner-circle"
        className={`${chosenSizeClass} border-slate-200 border-t-indigo-600 rounded-full animate-spin`}
      />
      {label && size !== 'sm' && (
        <span
          id="loading-spinner-label"
          className="mt-2 text-xs font-medium text-slate-500 animate-pulse"
        >
          {label}
        </span>
      )}
    </div>
  );
}
export type { LoadingSpinnerProps as LoadingSpinnerPropsType };
