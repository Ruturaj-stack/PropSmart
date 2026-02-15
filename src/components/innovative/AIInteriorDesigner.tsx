import { useState } from "react";
import { Palette, Sofa, Lightbulb, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIInteriorDesignerProps {
  propertyId: string;
}

type DesignStyle =
  | "modern"
  | "bohemian"
  | "industrial"
  | "coastal"
  | "farmhouse";
type RoomType = "living" | "bedroom" | "kitchen" | "bathroom";

/**
 * AI Interior Designer Assistant
 * Provides design suggestions, furniture recommendations, and cost estimates
 */
const AIInteriorDesigner = ({ propertyId }: AIInteriorDesignerProps) => {
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle>("modern");
  const [selectedRoom, setSelectedRoom] = useState<RoomType>("living");

  const designStyles = [
    {
      id: "modern" as DesignStyle,
      name: "Modern",
      emoji: "🏙️",
      colors: ["#2C3E50", "#ECF0F1", "#3498DB"],
    },
    {
      id: "bohemian" as DesignStyle,
      name: "Bohemian",
      emoji: "🌺",
      colors: ["#E74C3C", "#F39C12", "#9B59B6"],
    },
    {
      id: "industrial" as DesignStyle,
      name: "Industrial",
      emoji: "🏭",
      colors: ["#34495E", "#95A5A6", "#E67E22"],
    },
    {
      id: "coastal" as DesignStyle,
      name: "Coastal",
      emoji: "🌊",
      colors: ["#3498DB", "#F8F9FA", "#16A085"],
    },
    {
      id: "farmhouse" as DesignStyle,
      name: "Farmhouse",
      emoji: "🌾",
      colors: ["#8D6E63", "#FFFFFF", "#4CAF50"],
    },
  ];

  const furnitureRecommendations = {
    living: [
      {
        name: "3-Seater Sofa",
        price: 45000,
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200",
        priority: "Essential",
      },
      {
        name: "Coffee Table",
        price: 12000,
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200",
        priority: "Essential",
      },
      {
        name: "Floor Lamp",
        price: 6000,
        image:
          "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=200",
        priority: "Recommended",
      },
      {
        name: "Accent Chair",
        price: 15000,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200",
        priority: "Optional",
      },
    ],
    bedroom: [
      {
        name: "Queen Bed Frame",
        price: 35000,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200",
        priority: "Essential",
      },
      {
        name: "Wardrobe",
        price: 42000,
        image:
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200",
        priority: "Essential",
      },
      {
        name: "Nightstand Set",
        price: 8000,
        image:
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200",
        priority: "Recommended",
      },
    ],
    kitchen: [
      {
        name: "Dining Table",
        price: 28000,
        image:
          "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200",
        priority: "Essential",
      },
      {
        name: "Bar Stools",
        price: 12000,
        image:
          "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=200",
        priority: "Recommended",
      },
      {
        name: "Kitchen Cart",
        price: 9000,
        image:
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200",
        priority: "Optional",
      },
    ],
    bathroom: [
      {
        name: "Vanity Cabinet",
        price: 22000,
        image:
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=200",
        priority: "Essential",
      },
      {
        name: "Mirror",
        price: 5000,
        image:
          "https://images.unsplash.com/photo-1618220179428-22790b461013?w=200",
        priority: "Recommended",
      },
    ],
  };

  const currentFurniture = furnitureRecommendations[selectedRoom];
  const totalCost = currentFurniture.reduce((sum, item) => sum + item.price, 0);

  const style = designStyles.find((s) => s.id === selectedStyle)!;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-accent" />
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              AI Interior Designer
            </h3>
            <p className="text-sm text-muted-foreground">
              Personalized design suggestions and cost estimates
            </p>
          </div>
        </div>
      </div>

      {/* Style Selector */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Select Design Style
        </label>
        <div className="grid grid-cols-5 gap-2">
          {designStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                selectedStyle === style.id
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <div className="text-2xl mb-1">{style.emoji}</div>
              <div className="text-xs font-medium">{style.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div className="mb-6 p-4 rounded-lg bg-secondary">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Recommended Color Palette
          </span>
        </div>
        <div className="flex gap-3">
          {style.colors.map((color, index) => (
            <div key={index} className="flex-1">
              <div
                className="h-12 rounded-lg border-2 border-white dark:border-gray-800 shadow-sm"
                style={{ backgroundColor: color }}
              />
              <div className="text-center text-xs text-muted-foreground mt-1">
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Selector */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Select Room
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: "living" as RoomType, name: "Living Room", icon: "🛋️" },
            { id: "bedroom" as RoomType, name: "Bedroom", icon: "🛏️" },
            { id: "kitchen" as RoomType, name: "Kitchen", icon: "🍽️" },
            { id: "bathroom" as RoomType, name: "Bathroom", icon: "🚿" },
          ].map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedRoom === room.id
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <div className="text-xl mb-1">{room.icon}</div>
              <div className="text-xs font-medium">{room.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Furniture Recommendations */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Sofa className="h-4 w-4" />
          Furniture Recommendations
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {currentFurniture.map((item, index) => (
            <div key={index} className="p-3 rounded-lg bg-secondary">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-24 object-cover rounded-lg mb-2"
              />
              <div className="text-sm font-medium text-foreground">
                {item.name}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-bold text-accent">
                  ₹{(item.price / 1000).toFixed(0)}k
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    item.priority === "Essential"
                      ? "bg-red-500/20 text-red-700 dark:text-red-300"
                      : item.priority === "Recommended"
                        ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                        : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                  }`}
                >
                  {item.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Cost */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">
              Total Estimated Cost
            </div>
            <div className="text-2xl font-bold text-accent mt-1">
              ₹{(totalCost / 100000).toFixed(2)}L
            </div>
          </div>
          <Lightbulb className="h-8 w-8 text-accent" />
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Prices from local retailers • Includes delivery
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1 gap-2">
          <Download className="h-4 w-4" />
          Download Design Board
        </Button>
        <Button variant="outline" className="flex-1">
          View 3D Preview
        </Button>
      </div>
    </div>
  );
};

export default AIInteriorDesigner;
