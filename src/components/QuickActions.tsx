import { Heart, Share2, Eye } from "lucide-react";
import { useState } from "react";
import { useConfetti } from "./ConfettiEffect";

interface QuickActionsProps {
  propertyId: string;
  onSave?: () => void;
  onShare?: () => void;
  onView?: () => void;
}

/**
 * Quick Action Buttons
 * Floating action buttons that appear on hover
 */
const QuickActions = ({
  propertyId,
  onSave,
  onShare,
  onView,
}: QuickActionsProps) => {
  const [saved, setSaved] = useState(false);
  const { triggerConfetti } = useConfetti();

  const handleSave = () => {
    setSaved(!saved);
    if (!saved) {
      triggerConfetti();
    }
    onSave?.();
  };

  return (
    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {/* Save/Like Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSave();
        }}
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform ${
          saved ? "text-red-500" : "text-gray-700 dark:text-gray-300"
        }`}
        title={saved ? "Saved" : "Save property"}
      >
        <Heart className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
      </button>

      {/* Share Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onShare?.();
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform text-gray-700 dark:text-gray-300"
        title="Share property"
      >
        <Share2 className="h-5 w-5" />
      </button>

      {/* Quick View Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onView?.();
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform text-gray-700 dark:text-gray-300"
        title="Quick view"
      >
        <Eye className="h-5 w-5" />
      </button>
    </div>
  );
};

export default QuickActions;
