import { AlertTriangle, RefreshCw } from 'lucide-react';

export interface ErrorFallbackProps {
  error?: Error | { message?: string } | null;
  onReset?: () => void;
  title?: string;
}

export function ErrorFallback({
  error,
  onReset,
  title = 'An unexpected error occurred',
}: ErrorFallbackProps) {
  const message = error instanceof Error ? error.message : error?.message || 'Something went wrong';

  return (
    <div
      id="error-fallback-container"
      className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center bg-white border border-slate-200 rounded-xl shadow-sm max-w-md mx-auto my-6"
    >
      <div
        id="error-fallback-icon-wrapper"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-600 mb-4"
      >
        <AlertTriangle className="w-6 h-6" />
      </div>
      
      <h3 id="error-fallback-title" className="text-base font-semibold text-slate-900 mb-2">
        {title}
      </h3>
      
      <p id="error-fallback-message" className="text-sm text-slate-500 mb-6 max-w-xs break-words">
        {message}
      </p>

      {onReset && (
        <button
          id="error-fallback-retry-button"
          onClick={onReset}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}
export type { ErrorFallbackProps as ErrorFallbackPropsType };
