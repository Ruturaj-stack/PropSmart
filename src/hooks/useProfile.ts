import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCurrentProfile, updateCurrentProfile } from '@/integrations/supabase/profiles';
import type { Profile, ProfileUpdate } from '@/integrations/supabase/profiles';

interface UseProfileReturn {
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateProfile: (updates: Omit<ProfileUpdate, 'id'>) => Promise<void>;
}

/**
 * Hook to manage the current user's profile
 */
export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentProfile();
      setProfile(data);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (updates: Omit<ProfileUpdate, 'id'>) => {
    try {
      setError(null);
      const updatedProfile = await updateCurrentProfile(updates);
      setProfile(updatedProfile);
    } catch (err) {
      setError(err as Error);
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        fetchProfile();
      } else {
        setLoading(false);
      }
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        fetchProfile();
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile: handleUpdateProfile,
  };
}
