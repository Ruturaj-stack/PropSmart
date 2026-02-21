import { useState, useEffect } from "react";
import {
  getUserAlerts,
  createAlert,
  toggleAlert,
  deleteAlert,
  type UserAlert,
  type AlertCriteria,
  type AlertType,
} from "@/integrations/supabase/alerts";
import {
  Bell,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  TrendingDown,
  TrendingUp,
  Home,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Alert Management Component
 * Create and manage property alerts
 */
const AlertManagement = () => {
  const [alerts, setAlerts] = useState<UserAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await getUserAlerts();
      setAlerts(data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAlert = async (alertId: string, currentStatus: boolean) => {
    try {
      await toggleAlert(alertId, !currentStatus);
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === alertId ? { ...a, is_active: !currentStatus } : a,
        ),
      );
    } catch (error) {
      console.error("Error toggling alert:", error);
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    if (!confirm("Are you sure you want to delete this alert?")) return;

    try {
      await deleteAlert(alertId);
      setAlerts((prev) => prev.filter((a) => a.id !== alertId));
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
  };

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case "price_drop":
        return (
          <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
        );
      case "price_increase":
        return (
          <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400" />
        );
      case "new_listing":
        return <Home className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "saved_search":
        return <Search className="h-4 w-4 text-accent" />;
    }
  };

  const getAlertLabel = (type: AlertType): string => {
    switch (type) {
      case "price_drop":
        return "Price Drop";
      case "price_increase":
        return "Price Increase";
      case "new_listing":
        return "New Listings";
      case "saved_search":
        return "Saved Search";
    }
  };

  const formatCriteria = (criteria: Record<string, unknown>): string => {
    const parts: string[] = [];

    if (criteria.location) parts.push(`📍 ${criteria.location}`);
    if (criteria.propertyType) parts.push(`🏠 ${criteria.propertyType}`);
    if (criteria.listingType) parts.push(`${criteria.listingType}`);
    if (criteria.bedrooms) parts.push(`${criteria.bedrooms} BHK`);

    const minPrice = criteria.minPrice as number | undefined;
    const maxPrice = criteria.maxPrice as number | undefined;
    if (minPrice || maxPrice) {
      const priceRange =
        minPrice && maxPrice
          ? `₹${(minPrice / 100000).toFixed(1)}L - ₹${(maxPrice / 100000).toFixed(1)}L`
          : minPrice
            ? `₹${(minPrice / 100000).toFixed(1)}L+`
            : `Up to ₹${(maxPrice! / 100000).toFixed(1)}L`;
      parts.push(priceRange);
    }

    return parts.length > 0 ? parts.join(" • ") : "All properties";
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-accent" />
          <h2 className="font-display text-2xl font-bold text-foreground">
            Smart Alerts
          </h2>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Alert
        </Button>
      </div>

      {/* Create Alert Form */}
      {showCreateForm && (
        <CreateAlertForm
          onClose={() => setShowCreateForm(false)}
          onCreated={() => {
            setShowCreateForm(false);
            fetchAlerts();
          }}
        />
      )}

      {/* Alerts List */}
      {alerts.length === 0 && !loading ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Bell className="mx-auto h-16 w-16 text-muted-foreground opacity-50" />
          <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
            No Alerts Yet
          </h3>
          <p className="mt-2 text-muted-foreground">
            Create your first alert to get notified about price changes and new
            listings
          </p>
          <Button onClick={() => setShowCreateForm(true)} className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Create Alert
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-lg border border-border bg-card p-4 transition-opacity ${
                !alert.is_active ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {getAlertIcon(alert.alert_type)}
                    <h4 className="font-semibold text-card-foreground">
                      {getAlertLabel(alert.alert_type)}
                    </h4>
                    {alert.is_active ? (
                      <span className="rounded-full bg-green-100 dark:bg-green-950 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                        Paused
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {formatCriteria(alert.criteria as Record<string, unknown>)}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Created {new Date(alert.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleAlert(alert.id, alert.is_active)}
                    className="text-muted-foreground hover:text-foreground"
                    title={alert.is_active ? "Pause alert" : "Activate alert"}
                  >
                    {alert.is_active ? (
                      <ToggleRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="text-muted-foreground hover:text-destructive"
                    title="Delete alert"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Create Alert Form Component
interface CreateAlertFormProps {
  onClose: () => void;
  onCreated: () => void;
}

function CreateAlertForm({ onClose, onCreated }: CreateAlertFormProps) {
  const [alertType, setAlertType] = useState<AlertType>("price_drop");
  const [criteria, setCriteria] = useState<AlertCriteria>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await createAlert(alertType, criteria);
      onCreated();
    } catch (error) {
      console.error("Error creating alert:", error);
      alert("Failed to create alert. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-6 space-y-4"
    >
      <h3 className="font-semibold text-lg text-card-foreground">
        Create New Alert
      </h3>

      {/* Alert Type */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Alert Type
        </label>
        <select
          value={alertType}
          onChange={(e) => setAlertType(e.target.value as AlertType)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-accent/30 dark:bg-slate-900 dark:text-slate-100 transition-colors"
        >
          <option value="price_drop">Price Drop</option>
          <option value="new_listing">New Listings</option>
          <option value="saved_search">Saved Search Match</option>
          <option value="price_increase">Price Increase</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Location (Optional)
        </label>
        <input
          type="text"
          value={criteria.location || ""}
          onChange={(e) =>
            setCriteria({ ...criteria, location: e.target.value })
          }
          placeholder="e.g., Bangalore, Mumbai"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-accent/30 dark:bg-slate-900 dark:text-slate-100 transition-colors"
        />
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Property Type (Optional)
        </label>
        <select
          value={criteria.propertyType || ""}
          onChange={(e) =>
            setCriteria({ ...criteria, propertyType: e.target.value })
          }
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-accent/30 dark:bg-slate-900 dark:text-slate-100 transition-colors"
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="House">House</option>
          <option value="PG">PG</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Min Price (₹)
          </label>
          <input
            type="number"
            value={criteria.minPrice || ""}
            onChange={(e) =>
              setCriteria({ ...criteria, minPrice: Number(e.target.value) })
            }
            placeholder="0"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Max Price (₹)
          </label>
          <input
            type="number"
            value={criteria.maxPrice || ""}
            onChange={(e) =>
              setCriteria({ ...criteria, maxPrice: Number(e.target.value) })
            }
            placeholder="∞"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Alert"}
        </Button>
      </div>
    </form>
  );
}

export default AlertManagement;
