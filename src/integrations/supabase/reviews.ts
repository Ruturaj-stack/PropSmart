import { supabase } from './client';
import type { Tables, TablesInsert } from './types';

export type PropertyReview = Tables<'property_reviews'>;
export type ChatConversation = Tables<'chat_conversations'>;
export type ChatMessage = Tables<'chat_messages'>;

/**
 * Create a new review
 */
export async function createReview(
  propertyId: string,
  rating: number,
  title: string,
  comment: string
): Promise<PropertyReview> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('property_reviews')
    .insert({
      property_id: propertyId,
      user_id: user.id,
      rating,
      title,
      comment,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get reviews for a property
 */
export async function getPropertyReviews(propertyId: string): Promise<PropertyReview[]> {
  const { data, error } = await supabase
    .from('property_reviews')
    .select('*')
    .eq('property_id', propertyId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }

  return data || [];
}

/**
 * Get average rating for property
 */
export async function getPropertyRating(propertyId: string): Promise<{ avg: number; count: number }> {
  const { data, error } = await supabase
    .from('property_reviews')
    .select('rating')
    .eq('property_id', propertyId);

  if (error || !data || data.length === 0) {
    return { avg: 0, count: 0 };
  }

  const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
  return { avg: parseFloat(avg.toFixed(1)), count: data.length };
}

/**
 * Mark review as helpful
 */
export async function markReviewHelpful(reviewId: string, isHelpful: boolean): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('review_helpfulness')
    .upsert({
      review_id: reviewId,
      user_id: user.id,
      is_helpful: isHelpful,
    });

  if (error) throw error;
}

/**
 * Create or get chat conversation
 */
export async function getOrCreateConversation(): Promise<ChatConversation> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');

  // Try to get existing conversation
  const { data: existing } = await supabase
    .from('chat_conversations')
    .select('*')
    .eq('user_id', user.id)
    .order('last_message_at', { ascending: false })
    .limit(1)
    .single();

  if (existing) return existing;

  // Create new conversation
  const { data: newConv, error } = await supabase
    .from('chat_conversations')
    .insert({
      user_id: user.id,
      title: 'Property Assistant Chat',
    })
    .select()
    .single();

  if (error) throw error;
  return newConv;
}

/**
 * Get messages for conversation
 */
export async function getConversationMessages(conversationId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data || [];
}

/**
 * Send message in conversation
 */
export async function sendMessage(
  conversationId: string,
  content: string,
  role: 'user' | 'assistant' = 'user'
): Promise<ChatMessage> {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      conversation_id: conversationId,
      role,
      content,
    })
    .select()
    .single();

  if (error) throw error;

  // Update conversation last message time
  await supabase
    .from('chat_conversations')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', conversationId);

  return data;
}
