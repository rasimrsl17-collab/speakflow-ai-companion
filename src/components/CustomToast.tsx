import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  variant: ToastVariant;
  message: string;
}

interface ToastContextType {
  showToast: (variant: ToastVariant, message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useCustomToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useCustomToast must be used within ToastProvider");
  return ctx;
};

const variantStyles: Record<ToastVariant, { border: string; icon: React.ReactNode }> = {
  success: {
    border: "border-l-4 border-l-green-500",
    icon: <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />,
  },
  error: {
    border: "border-l-4 border-l-red-500",
    icon: <XCircle className="w-5 h-5 text-red-500 shrink-0" />,
  },
  info: {
    border: "border-l-4 border-l-blue-500",
    icon: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
  },
  warning: {
    border: "border-l-4 border-l-yellow-500",
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />,
  },
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((variant: ToastVariant, message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => {
      const next = [{ id, variant, message }, ...prev];
      return next.slice(0, 3);
    });
    timersRef.current[id] = setTimeout(() => dismiss(id), 5000);
  }, [dismiss]);

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-sm:left-4 max-sm:right-4 max-sm:items-center sm:w-80">
        <AnimatePresence>
          {toasts.map((toast) => {
            const style = variantStyles[toast.variant];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`w-full glass rounded-xl p-4 flex items-start gap-3 shadow-lg ${style.border}`}
              >
                {style.icon}
                <p className="text-sm flex-1">{toast.message}</p>
                <button onClick={() => dismiss(toast.id)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
