import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createReview } from "@/integrations/supabase/reviews";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  propertyId: string;
  onSubmitted: () => void;
}

/**
 * Property Review Form Component
 */
const ReviewForm = ({ propertyId, onSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim() || !comment.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in both title and review",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      await createReview(propertyId, rating, title.trim(), comment.trim());

      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback",
      });

      // Reset form
      setRating(0);
      setTitle("");
      setComment("");
      onSubmitted();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-6 space-y-4"
    >
      <h3 className="font-semibold text-lg text-card-foreground">
        Write a Review
      </h3>

      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Your Rating *
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Review Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sum up your experience"
          maxLength={100}
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-accent/30"
        />
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Your Review *
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this property..."
          rows={4}
          maxLength={1000}
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-accent/30 resize-none"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {comment.length}/1000 characters
        </p>
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
