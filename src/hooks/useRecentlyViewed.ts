import { useState, useEffect } from 'react';
import { getRecentlyViewed } from '@/integrations/supabase/behavior';
import { mockProperties } from '@/data/properties';
import type { Property } from '@/data/properties';

interface UseRecentlyViewedReturn {
  recentlyViewed: Property[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to get recently viewed properties
 */
export function useRecentlyViewed(limit: number = 10): UseRecentlyViewedReturn {
  const [recentlyViewed, setRecentlyViewed] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecentlyViewed = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const recentData = await getRecentlyViewed(limit);
      
      // Match with mock properties
      const properties = recentData
        .map(recent => mockProperties.find(p => p.id === recent.property_id))
        .filter((p): p is Property => p !== undefined);
      
      setRecentlyViewed(properties);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching recently viewed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentlyViewed();
  }, [limit]);

  return {
    recentlyViewed,
    loading,
    error,
    refetch: fetchRecentlyViewed,
  };
}
