import { WifiOff, ServerCrash, AlertTriangle } from "lucide-react";

type ErrorVariant = "network" | "server" | "generic";

interface ErrorStateProps {
  variant?: ErrorVariant;
  title?: string;
  description?: string;
  onRetry?: () => void;
}

const variantConfig: Record<ErrorVariant, { icon: React.ReactNode; title: string; description: string }> = {
  network: {
    icon: <WifiOff className="w-8 h-8 text-accent" />,
    title: "No Internet Connection",
    description: "Check your connection and try again.",
  },
  server: {
    icon: <ServerCrash className="w-8 h-8 text-accent" />,
    title: "Something went wrong",
    description: "Our servers are having trouble. Please try again.",
  },
  generic: {
    icon: <AlertTriangle className="w-8 h-8 text-accent" />,
    title: "An error occurred",
    description: "Something unexpected happened. Please try again.",
  },
};

const ErrorState = ({ variant = "generic", title, description, onRetry }: ErrorStateProps) => {
  const config = variantConfig[variant];

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
        {config.icon}
      </div>
      <h2 className="font-bold text-lg mb-2">{title || config.title}</h2>
      <p className="text-muted-foreground text-sm mb-6 max-w-xs">{description || config.description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
