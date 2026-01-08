"use client";

import React, { createContext, useContext, useReducer, ReactNode, useRef, useState } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  open: boolean;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (args: {
    message: string;
    type?: ToastType;
    duration?: number;
  }) => void;
  dismiss: (toastId: string) => void;
}

type ToastAction =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "DISMISS_TOAST"; toastId: string }
  | { type: "REMOVE_TOAST"; toastId: string };

const toastReducer = (state: Toast[], action: ToastAction): Toast[] => {
  switch (action.type) {
    case "ADD_TOAST":
      return [action.toast, ...state];
    case "DISMISS_TOAST":
      return state.map((t) =>
        t.id === action.toastId ? { ...t, open: false } : t
      );
    case "REMOVE_TOAST":
      return state.filter((t) => t.id !== action.toastId);
    default:
      return state;
  }
};

const ToastContext = createContext<ToastContextType | null>(null);

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const showToast = ({
    message,
    type = "success",
    duration = 3000,
  }: {
    message: string;
    type?: ToastType;
    duration?: number;
  }) => {
    const id = genId();

    dispatch({
      type: "ADD_TOAST",
      toast: { id, message, type, open: true, duration },
    });
  };

  const dismiss = (toastId: string) => {
    dispatch({ type: "DISMISS_TOAST", toastId });
    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", toastId });
    }, 300);
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismiss }}>
      {children}

      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 max-w-md pointer-events-none">
        {toasts.map((toast, index) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            index={index}
            onClose={() => dismiss(toast.id)}
            onDismiss={() => dispatch({ type: "DISMISS_TOAST", toastId: toast.id })}
            onRemove={() => dispatch({ type: "REMOVE_TOAST", toastId: toast.id })}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({
  toast,
  index,
  onClose,
  onDismiss,
  onRemove,
}: {
  toast: Toast;
  index: number;
  onClose: () => void;
  onDismiss: () => void;
  onRemove: () => void;
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);
  const removeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTimeRef = useRef(toast.duration || 3000);
  const startTimeRef = useRef(Date.now());

  // Start timers
  const startTimers = () => {
    const remaining = remainingTimeRef.current;
    startTimeRef.current = Date.now();

    dismissTimerRef.current = setTimeout(() => {
      onDismiss();
    }, remaining);

    removeTimerRef.current = setTimeout(() => {
      onRemove();
    }, remaining + 300);
  };

  // Clear timers
  const clearTimers = () => {
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
    if (removeTimerRef.current) {
      clearTimeout(removeTimerRef.current);
      removeTimerRef.current = null;
    }
  };

  // Initialize timers on mount
  React.useEffect(() => {
    startTimers();
    return () => clearTimers();
  }, []);

  // Handle mouse enter (pause)
  const handleMouseEnter = () => {
    setIsPaused(true);
    clearTimers();
    // Calculate remaining time
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
  };

  // Handle mouse leave (resume)
  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimers();
  };

  const getToastStyles = (type: ToastType) => {
    const styles = {
      success: {
        bg: "bg-gradient-to-r from-emerald-500 to-green-600",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      error: {
        bg: "bg-gradient-to-r from-red-500 to-rose-600",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      info: {
        bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      warning: {
        bg: "bg-gradient-to-r from-amber-500 to-orange-600",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    };
    return styles[type];
  };

  const style = getToastStyles(toast.type);

  return (
    <div
      className={`
        ${style.bg}
        min-w-[320px] rounded-lg shadow-2xl text-white
        backdrop-blur-sm border border-white/20
        transform transition-all duration-300 ease-out
        pointer-events-auto
        ${
          toast.open
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-[400px] opacity-0 scale-95"
        }
      `}
      style={{
        transform: toast.open
          ? `translateY(-${index * 4}px) scale(${1 - index * 0.02})`
          : "translateX(400px)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">{style.icon}</div>

        {/* Message */}
        <p className="flex-1 text-sm font-medium leading-relaxed pr-2">
          {toast.message}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:bg-white/20 rounded-md p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close notification"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-white/20 rounded-b-lg overflow-hidden">
        <div
          className={`h-full bg-white/40 ${isPaused ? '' : 'animate-shrink'}`}
          style={{
            animation: isPaused ? 'none' : `shrink ${(toast.duration || 3000) / 1000}s linear forwards`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        />
      </div>
    </div>
  );
};


export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
};
