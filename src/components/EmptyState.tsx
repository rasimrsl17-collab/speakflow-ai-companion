import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}

const EmptyState = ({ icon, title, description, actionLabel, actionTo }: EmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      <p className="text-muted-foreground text-sm mb-6 max-w-xs">{description}</p>
      {actionLabel && actionTo && (
        <button
          onClick={() => navigate(actionTo)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 inline-flex items-center gap-2"
        >
          {actionLabel} <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default EmptyState;
