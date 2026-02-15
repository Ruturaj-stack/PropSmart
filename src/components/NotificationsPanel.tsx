import { useState, useEffect } from "react";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  type Notification,
} from "@/integrations/supabase/alerts";
import {
  Bell,
  Check,
  CheckCheck,
  X,
  Home,
  TrendingDown,
  TrendingUp,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

/**
 * Notifications Panel Component
 * Shows user notifications with real-time updates
 */
const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications(20);
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, is_read: true } : n,
        ),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const getNotificationIcon = (title: string) => {
    if (title.includes("Price Drop") || title.includes("price drop")) {
      return (
        <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
      );
    }
    if (title.includes("Price Increase")) {
      return <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400" />;
    }
    if (title.includes("New") || title.includes("listing")) {
      return <Home className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    }
    return <Search className="h-4 w-4 text-accent" />;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
      >
        <Bell className="h-5 w-5 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed right-4 top-20 z-50 w-96 rounded-xl border border-border bg-card shadow-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-card-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs text-accent hover:underline"
              title="Mark all as read"
            >
              <CheckCheck className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[500px] overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <p className="mt-2 text-sm text-muted-foreground">
              No notifications yet
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 transition-colors hover:bg-secondary/50 ${
                  !notification.is_read ? "bg-accent/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.title)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`text-sm font-medium ${
                          !notification.is_read
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {notification.title}
                      </h4>
                      {!notification.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="flex-shrink-0 text-accent hover:text-accent/80"
                          title="Mark as read"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {notification.message}
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(
                          new Date(notification.created_at),
                          { addSuffix: true },
                        )}
                      </span>

                      {notification.property_id && (
                        <Link
                          to={`/property/${notification.property_id}`}
                          className="text-xs font-medium text-accent hover:underline"
                          onClick={() => setIsOpen(false)}
                        >
                          View Property →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
