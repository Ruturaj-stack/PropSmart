import { useState, useEffect } from "react";
import { Star, ThumbsUp } from "lucide-react";
import {
  getPropertyReviews,
  getPropertyRating,
  markReviewHelpful,
  type PropertyReview,
} from "@/integrations/supabase/reviews";
import { formatDistanceToNow } from "date-fns";

interface ReviewListProps {
  propertyId: string;
}

/**
 * Property Reviews List Component
 */
const ReviewList = ({ propertyId }: ReviewListProps) => {
  const [reviews, setReviews] = useState<PropertyReview[]>([]);
  const [rating, setRating] = useState({ avg: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
    fetchRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getPropertyReviews(propertyId);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRating = async () => {
    try {
      const data = await getPropertyRating(propertyId);
      setRating(data);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  const handleHelpful = async (reviewId: string) => {
    try {
      await markReviewHelpful(reviewId, true);
      // Refresh reviews to update count
      fetchReviews();
    } catch (error) {
      console.error("Error marking helpful:", error);
    }
  };

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    const sizeClass = size === "sm" ? "h-4 w-4" : "h-6 w-6";
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="font-display text-5xl font-bold text-foreground">
              {rating.avg.toFixed(1)}
            </div>
            {renderStars(Math.round(rating.avg), "lg")}
            <p className="mt-2 text-sm text-muted-foreground">
              {rating.count} {rating.count === 1 ? "review" : "reviews"}
            </p>
          </div>

          <div className="flex-1">
            {/* Rating Distribution (mock data for now) */}
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const percentage =
                rating.count > 0 ? (count / rating.count) * 100 : 0;

              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-4 text-sm text-muted-foreground">
                    {star}
                  </span>
                  <Star className="h-3 w-3 text-yellow-400" />
                  <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-sm text-muted-foreground text-right">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews */}
      {reviews.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Star className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
            No Reviews Yet
          </h3>
          <p className="mt-2 text-muted-foreground">
            Be the first to review this property!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {renderStars(review.rating)}
                    {review.verified_booking && (
                      <span className="rounded-full bg-green-100 dark:bg-green-950 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                        Verified
                      </span>
                    )}
                  </div>

                  <h4 className="mt-2 font-semibold text-card-foreground">
                    {review.title}
                  </h4>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {review.comment}
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>Helpful ({review.helpful_count})</span>
                    </button>

                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(review.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
