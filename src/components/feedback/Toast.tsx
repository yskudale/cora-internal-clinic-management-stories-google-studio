import { useEffect } from 'react';
import { create } from 'zustand';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastStore {
  toasts: ToastMessage[];
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, type, message }],
    }));
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

export const toast = {
  success: (message: string) => useToastStore.getState().addToast(message, 'success'),
  error: (message: string) => useToastStore.getState().addToast(message, 'error'),
  info: (message: string) => useToastStore.getState().addToast(message, 'info'),
};

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  
  return (
    <div
      id="toast-portal-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full sm:w-auto"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  toast: ToastMessage;
}

function ToastItem({ toast: item }: ToastItemProps) {
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(item.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [item.id, removeToast]);

  const isSuccess = item.type === 'success';
  const isError = item.type === 'error';

  return (
    <motion.div
      id={`toast-item-${item.id}`}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg text-sm bg-white ${
        isSuccess
          ? 'border-green-200 text-green-900 bg-green-50/20'
          : isError
          ? 'border-red-200 text-red-900 bg-red-50/20'
          : 'border-slate-200 text-slate-900'
      }`}
    >
      {isSuccess && (
        <CheckCircle2 id="toast-success-icon" className="w-5 h-5 text-green-600 shrink-0" />
      )}
      {isError && (
        <AlertCircle id="toast-error-icon" className="w-5 h-5 text-red-600 shrink-0" />
      )}
      {!isSuccess && !isError && (
        <AlertCircle id="toast-info-icon" className="w-5 h-5 text-indigo-600 shrink-0" />
      )}
      
      <span id={`toast-text-${item.id}`} className="flex-1 font-medium leading-normal">
        {item.message}
      </span>
      
      <button
        id={`toast-close-${item.id}`}
        onClick={() => removeToast(item.id)}
        className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
        aria-label="Close toast"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
