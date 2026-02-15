import { supabase } from './client';
import type { Tables, TablesInsert } from './types';

export type UserBehavior = Tables<'user_behavior'>;
export type SearchPattern = Tables<'user_search_patterns'>;
export type RecentlyViewed = Tables<'recently_viewed'>;
export type SavedProperty = Tables<'saved_properties'>;

/**
 * Track property view
 */
export async function trackPropertyView(propertyId: string, durationSeconds: number = 0) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  // Insert into user_behavior
  const { error: behaviorError } = await supabase
    .from('user_behavior')
    .insert({
      user_id: user.id,
      property_id: propertyId,
      action_type: 'view',
      duration_seconds: durationSeconds,
    });

  if (behaviorError) console.error('Error tracking view:', behaviorError);

  // Upsert into recently_viewed
  const { error: recentError } = await supabase
    .from('recently_viewed')
    .upsert({
      user_id: user.id,
      property_id: propertyId,
      viewed_at: new Date().toISOString(),
    });

  if (recentError) console.error('Error updating recently viewed:', recentError);

  return true;
}

/**
 * Track property click
 */
export async function trackPropertyClick(propertyId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { error } = await supabase
    .from('user_behavior')
    .insert({
      user_id: user.id,
      property_id: propertyId,
      action_type: 'click',
    });

  if (error) console.error('Error tracking click:', error);
  
  return true;
}

/**
 * Save/favorite a property
 */
export async function saveProperty(propertyId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');

  // Insert into saved_properties
  const { error: saveError } = await supabase
    .from('saved_properties')
    .insert({
      user_id: user.id,
      property_id: propertyId,
    });

  if (saveError) throw saveError;

  // Track in behavior
  await supabase
    .from('user_behavior')
    .insert({
      user_id: user.id,
      property_id: propertyId,
      action_type: 'save',
    });

  return true;
}

/**
 * Unsave/unfavorite a property
 */
export async function unsaveProperty(propertyId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');

  // Delete from saved_properties
  const { error: deleteError } = await supabase
    .from('saved_properties')
    .delete()
    .eq('user_id', user.id)
    .eq('property_id', propertyId);

  if (deleteError) throw deleteError;

  // Track in behavior
  await supabase
    .from('user_behavior')
    .insert({
      user_id: user.id,
      property_id: propertyId,
      action_type: 'unsave',
    });

  return true;
}

/**
 * Get saved properties for current user
 */
export async function getSavedProperties() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  const { data, error } = await supabase
    .from('saved_properties')
    .select('*')
    .eq('user_id', user.id)
    .order('saved_at', { ascending: false });

  if (error) {
    console.error('Error fetching saved properties:', error);
    return [];
  }

  return data || [];
}

/**
 * Check if property is saved
 */
export async function isPropertySaved(propertyId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;

  const { data, error } = await supabase
    .from('saved_properties')
    .select('property_id')
    .eq('user_id', user.id)
    .eq('property_id', propertyId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking saved status:', error);
  }

  return !!data;
}

/**
 * Get recently viewed properties
 */
export async function getRecentlyViewed(limit: number = 10) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  const { data, error } = await supabase
    .from('recently_viewed')
    .select('*')
    .eq('user_id', user.id)
    .order('viewed_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recently viewed:', error);
    return [];
  }

  return data || [];
}

/**
 * Track search pattern
 */
export async function trackSearch(searchQuery: Record<string, unknown>, resultCount: number) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { error } = await supabase
    .from('user_search_patterns')
    .insert({
      user_id: user.id,
      search_query: searchQuery,
      result_count: resultCount,
    });

  if (error) console.error('Error tracking search:', error);

  return true;
}

/**
 * Get user's behavior profile (aggregated data)
 */
export async function getUserBehaviorProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  // Get most viewed property types
  const { data: viewedTypes } = await supabase
    .from('user_behavior')
    .select('metadata')
    .eq('user_id', user.id)
    .eq('action_type', 'view')
    .limit(100);

  // Get search patterns
  const { data: searches } = await supabase
    .from('user_search_patterns')
    .select('search_query')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20);

  return {
    viewedTypes: viewedTypes || [],
    searches: searches || [],
  };
}

/**
 * Track property share
 */
export async function trackPropertyShare(propertyId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { error } = await supabase
    .from('user_behavior')
    .insert({
      user_id: user.id,
      property_id: propertyId,
      action_type: 'share',
    });

  if (error) console.error('Error tracking share:', error);
  
  return true;
}
