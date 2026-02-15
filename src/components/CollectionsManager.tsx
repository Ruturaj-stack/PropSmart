import { useState } from "react";
import { Heart, FolderPlus, Share2, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Collection {
  id: string;
  name: string;
  propertyIds: string[];
  createdAt: Date;
}

/**
 * Collections / Wishlist Manager
 * Organize properties into multiple collections
 */
const CollectionsManager = () => {
  const [collections, setCollections] = useState<Collection[]>(() => {
    const saved = localStorage.getItem("property_collections");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "1",
            name: "Favorites",
            propertyIds: [],
            createdAt: new Date(),
          },
        ];
  });

  const [newCollectionName, setNewCollectionName] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const createCollection = () => {
    if (!newCollectionName.trim()) return;

    const newCollection: Collection = {
      id: Date.now().toString(),
      name: newCollectionName,
      propertyIds: [],
      createdAt: new Date(),
    };

    const updated = [...collections, newCollection];
    setCollections(updated);
    localStorage.setItem("property_collections", JSON.stringify(updated));
    setNewCollectionName("");
  };

  const deleteCollection = (id: string) => {
    const updated = collections.filter((c) => c.id !== id);
    setCollections(updated);
    localStorage.setItem("property_collections", JSON.stringify(updated));
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">📚 My Collections</h3>
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${viewMode === "grid" ? "bg-card shadow-sm" : ""}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded ${viewMode === "list" ? "bg-card shadow-sm" : ""}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Create Collection Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <FolderPlus className="h-4 w-4" />
                New Collection
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Collection</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  placeholder="Collection name (e.g., 'Dream Homes', 'Investment Properties')"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && createCollection()}
                />
                <Button onClick={createCollection} className="w-full">
                  Create Collection
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Collections List */}
      <div
        className={viewMode === "grid" ? "grid grid-cols-2 gap-4" : "space-y-3"}
      >
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="group relative rounded-lg border border-border bg-secondary p-4 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-accent" />
                  <h4 className="font-medium text-foreground">
                    {collection.name}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {collection.propertyIds.length} properties
                </p>
              </div>

              {collection.id !== "1" && ( // Don't allow deleting default "Favorites"
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCollection(collection.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-600 transition-opacity"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Share Collection */}
            <button className="mt-3 flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors">
              <Share2 className="h-3 w-3" />
              Share collection
            </button>
          </div>
        ))}
      </div>

      {collections.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FolderPlus className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No collections yet</p>
          <p className="text-sm mt-1">
            Create your first collection to organize properties
          </p>
        </div>
      )}
    </div>
  );
};

export default CollectionsManager;
