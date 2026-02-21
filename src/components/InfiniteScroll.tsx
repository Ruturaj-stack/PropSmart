import { useEffect, useRef, ReactNode } from "react";

interface InfiniteScrollProps {
  children: ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  loading?: boolean;
  threshold?: number;
}

/**
 * Infinite Scroll Component
 * Automatically loads more content when scrolling to bottom
 */
const InfiniteScroll = ({
  children,
  onLoadMore,
  hasMore,
  loading = false,
  threshold = 200,
}: InfiniteScrollProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: `${threshold}px` },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, loading, onLoadMore, threshold]);

  return (
    <div>
      {children}

      <div ref={loaderRef} className="py-8 text-center">
        {/* Loading dots removed for instant feel */}

        {!hasMore && !loading && (
          <p className="text-sm text-muted-foreground">
            No more properties to load
          </p>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
