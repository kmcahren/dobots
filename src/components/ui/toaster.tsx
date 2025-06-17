"use client"

import * as React from "react"
import { reducer, type State, type Action } from "@/hooks/use-toast" // Import reducer and types
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

// Define the context type
type ToastContextType = {
  toasts: State["toasts"];
  addToast: (toast: Omit<State["toasts"][number], "id">) => string;
  dismissToast: (toastId?: string) => void;
  updateToast: (toast: Partial<State["toasts"][number]>) => void;
};

// Create the context
const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Create the provider component
export function ToastStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, { toasts: [] });

  const addToast = (toast: Omit<State["toasts"][number], "id">) => {
    const id = genId();
    const fullToast = {
      ...toast,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismissToast(id);
      },
    };
    dispatch({
      type: "ADD_TOAST",
      toast: fullToast,
    });
    return id;
  };

  const dismissToast = (toastId?: string) => {
    dispatch({ type: "DISMISS_TOAST", toastId });
  };

  const updateToast = (toast: Partial<State["toasts"][number]>) => {
    dispatch({
      type: "UPDATE_TOAST",
      toast: toast,
    });
  };

  const value = React.useMemo(() => ({
      toasts: state.toasts,
      addToast,
      dismissToast,
      updateToast,
    }), [state.toasts] // Depend on state.toasts
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

// Custom hook to consume the context
export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastStateProvider");
  }
  return context;
}
export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
