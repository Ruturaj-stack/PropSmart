import { useState, useEffect } from 'react';
import { 
  getSavedProperties, 
  saveProperty, 
  unsaveProperty,
  isPropertySaved 
} from '@/integrations/supabase/behavior';
import type { SavedProperty } from '@/integrations/supabase/behavior';

interface UseSavedPropertiesReturn {
  savedProperties: SavedProperty[];
  loading: boolean;
  error: Error | null;
  toggleSave: (propertyId: string) => Promise<void>;
  isSaved: (propertyId: string) => boolean;
  refetch: () => Promise<void>;
}

/**
 * Hook to manage saved/favorited properties
 */
export function useSavedProperties(): UseSavedPropertiesReturn {
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSavedProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSavedProperties();
      setSavedProperties(data);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching saved properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = async (propertyId: string) => {
    try {
      const saved = await isPropertySaved(propertyId);
      
      if (saved) {
        await unsaveProperty(propertyId);
        setSavedProperties(prev => prev.filter(p => p.property_id !== propertyId));
      } else {
        await saveProperty(propertyId);
        await fetchSavedProperties(); // Refetch to get the latest data
      }
    } catch (err) {
      setError(err as Error);
      console.error('Error toggling save:', err);
      throw err;
    }
  };

  const isSaved = (propertyId: string): boolean => {
    return savedProperties.some(p => p.property_id === propertyId);
  };

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  return {
    savedProperties,
    loading,
    error,
    toggleSave,
    isSaved,
    refetch: fetchSavedProperties,
  };
}
