import React, { useState, useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error('Captured runtime error:', event.error || event.message);
      setHasError(true);
      setErrorMessage(event.message || 'An unexpected error occurred.');
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      console.error('Captured promise rejection:', event.reason);
      setHasError(true);
      setErrorMessage(event.reason?.message || 'A network or promise error occurred.');
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  const handleReset = () => {
    try {
      localStorage.clear();
    } catch {}
    window.location.reload();
  };

  if (hasError) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-6 text-center shadow-2xl space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-black text-white">PixelPass</h1>
          <p className="text-xs text-slate-300">
            An unexpected display issue occurred. Click reload to refresh.
          </p>
          {errorMessage && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-rose-400 text-left overflow-x-auto max-h-24">
              {errorMessage}
            </div>
          )}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleReload}
              className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload App</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-all"
            >
              Reset Storage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
