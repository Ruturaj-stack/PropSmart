import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Example component demonstrating how to use the useProfile hook
 * This is a reference implementation - customize it for your needs
 */
const ProfileExample = () => {
  const { profile, loading, error, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleEdit = () => {
    setFullName(profile?.full_name || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!fullName.trim()) return;

    try {
      setUpdating(true);
      await updateProfile({ full_name: fullName });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFullName("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
        <p className="text-sm text-destructive">Error: {error.message}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          No profile found. Please sign in.
        </p>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">
            User Profile
          </h2>
          <p className="text-sm text-muted-foreground">
            Created {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-accent/30"
              placeholder="Enter your name"
            />
          ) : (
            <p className="text-lg font-semibold text-card-foreground">
              {profile.full_name}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                disabled={updating || !fullName.trim()}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {updating ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                disabled={updating}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit} variant="outline">
              Edit Profile
            </Button>
          )}
        </div>

        <div className="mt-4 rounded-lg bg-secondary p-3">
          <p className="text-xs text-muted-foreground">User ID: {profile.id}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileExample;
