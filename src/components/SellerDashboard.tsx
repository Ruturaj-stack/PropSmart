import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Home,
  DollarSign,
  MapPin,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Seller Dashboard Component
 * Manage property listings as a seller
 */
const SellerDashboard = () => {
  const [properties, setProperties] = useState([
    {
      id: "1",
      title: "Luxury Villa in Whitefield",
      location: "Bangalore",
      price: 12500000,
      status: "active",
      views: 234,
      saves: 45,
      inquiries: 12,
    },
    {
      id: "2",
      title: "Modern Apartment Koramangala",
      location: "Bangalore",
      price: 8500000,
      status: "active",
      views: 198,
      saves: 38,
      inquiries: 8,
    },
  ]);

  const totalStats = {
    totalListings: properties.length,
    activeListings: properties.filter((p) => p.status === "active").length,
    totalViews: properties.reduce((sum, p) => sum + p.views, 0),
    totalInquiries: properties.reduce((sum, p) => sum + p.inquiries, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Seller Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your property listings
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
              <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {totalStats.totalListings}
              </p>
              <p className="text-xs text-muted-foreground">Total Listings</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {totalStats.totalViews}
              </p>
              <p className="text-xs text-muted-foreground">Total Views</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950">
              <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {totalStats.totalInquiries}
              </p>
              <p className="text-xs text-muted-foreground">Inquiries</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
              <Home className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {totalStats.activeListings}
              </p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Properties List */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h3 className="font-semibold text-lg text-card-foreground">
            Your Properties
          </h3>
        </div>

        <div className="divide-y divide-border">
          {properties.map((property) => (
            <div key={property.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-foreground">
                      {property.title}
                    </h4>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        property.status === "active"
                          ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {property.location}
                    </span>
                    <span className="font-semibold text-accent">
                      ₹{(property.price / 100000).toFixed(1)}L
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      {property.views} views
                    </span>
                    <span className="text-muted-foreground">
                      💾 {property.saves} saves
                    </span>
                    <span className="text-muted-foreground">
                      💬 {property.inquiries} inquiries
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
