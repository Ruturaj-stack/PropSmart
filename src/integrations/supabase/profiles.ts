import { supabase } from './client';
import type { Tables, TablesInsert, TablesUpdate } from './types';

export type Profile = Tables<'profiles'>;
export type ProfileInsert = TablesInsert<'profiles'>;
export type ProfileUpdate = TablesUpdate<'profiles'>;

/**
 * Get profile by user ID
 */
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Get current user's profile
 */
export async function getCurrentProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user');
  }

  return getProfile(user.id);
}

/**
 * Create a new profile
 */
export async function createProfile(profileData: ProfileInsert) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Update an existing profile
 */
export async function updateProfile(userId: string, updates: ProfileUpdate) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Update current user's profile
 */
export async function updateCurrentProfile(updates: Omit<ProfileUpdate, 'id'>) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user');
  }

  return updateProfile(user.id, updates);
}
