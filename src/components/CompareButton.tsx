import { useComparison } from "@/contexts/ComparisonContext";
import { Scale } from "lucide-react";

interface CompareButtonProps {
  propertyId: string;
  className?: string;
}

/**
 * Button to add/remove property from comparison
 */
const CompareButton = ({ propertyId, className = "" }: CompareButtonProps) => {
  const { isInComparison, canAddMore } = useComparison();
  const inComparison = isInComparison(propertyId);

  if (inComparison) {
    return (
      <button
        className={`flex items-center gap-1 text-xs font-medium text-accent ${className}`}
      >
        <Scale className="h-3.5 w-3.5" />
        <span>In Comparison</span>
      </button>
    );
  }

  if (!canAddMore) {
    return (
      <button
        disabled
        className={`flex items-center gap-1 text-xs font-medium text-muted-foreground opacity-50 ${className}`}
        title="Maximum 4 properties can be compared"
      >
        <Scale className="h-3.5 w-3.5" />
        <span>Compare</span>
      </button>
    );
  }

  return (
    <button
      className={`flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-accent transition-colors ${className}`}
    >
      <Scale className="h-3.5 w-3.5" />
      <span>Compare</span>
    </button>
  );
};

export default CompareButton;
