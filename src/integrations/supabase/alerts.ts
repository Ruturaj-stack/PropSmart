import { supabase } from './client';
import type { Tables, TablesInsert } from './types';

export type UserAlert = Tables<'user_alerts'>;
export type Notification = Tables<'notifications'>;
export type AlertType = 'price_drop' | 'new_listing' | 'saved_search' | 'price_increase';

export interface AlertCriteria {
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  listingType?: 'Rent' | 'Buy';
}

/**
 * Create a new alert
 */
export async function createAlert(
  alertType: AlertType,
  criteria: AlertCriteria
): Promise<UserAlert | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('user_alerts')
    .insert({
      user_id: user.id,
      alert_type: alertType,
      criteria,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating alert:', error);
    throw error;
  }

  return data;
}

/**
 * Get all alerts for current user
 */
export async function getUserAlerts(): Promise<UserAlert[]> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  const { data, error } = await supabase
    .from('user_alerts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }

  return data || [];
}

/**
 * Update alert active status
 */
export async function toggleAlert(alertId: string, isActive: boolean): Promise<void> {
  const { error } = await supabase
    .from('user_alerts')
    .update({ is_active: isActive })
    .eq('id', alertId);

  if (error) {
    console.error('Error toggling alert:', error);
    throw error;
  }
}

/**
 * Delete an alert
 */
export async function deleteAlert(alertId: string): Promise<void> {
  const { error } = await supabase
    .from('user_alerts')
    .delete()
    .eq('id', alertId);

  if (error) {
    console.error('Error deleting alert:', error);
    throw error;
  }
}

/**
 * Get all notifications for current user
 */
export async function getNotifications(limit: number = 50): Promise<Notification[]> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }

  return data || [];
}

/**
 * Get unread notifications count
 */
export async function getUnreadCount(): Promise<number> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return 0;

  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_read', false);

  if (error) {
    console.error('Error fetching unread count:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Mark notification as read
 */
export async function markAsRead(notificationId: string): Promise<void> {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

/**
 * Mark all notifications as read
 */
export async function markAllAsRead(): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', user.id)
    .eq('is_read', false);

  if (error) {
    console.error('Error marking all as read:', error);
    throw error;
  }
}

/**
 * Subscribe to real-time notifications
 */
export function subscribeToNotifications(
  callback: (notification: Notification) => void
) {
  const { data: { user } } = supabase.auth.getUser();

  user.then((result) => {
    if (!result.user) return;

    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${result.user.id}`,
        },
        (payload) => {
          callback(payload.new as Notification);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  });
}
