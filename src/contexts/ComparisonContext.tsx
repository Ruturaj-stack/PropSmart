import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Property } from "@/data/properties";

interface ComparisonContextType {
  selectedProperties: Property[];
  addToComparison: (property: Property) => void;
  removeFromComparison: (propertyId: string) => void;
  clearComparison: () => void;
  isInComparison: (propertyId: string) => boolean;
  canAddMore: boolean;
  maxProperties: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined,
);

const MAX_COMPARISON_PROPERTIES = 4;
const STORAGE_KEY = "propsmart_comparison";

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSelectedProperties(parsed);
      } catch (e) {
        console.error("Error loading comparison from storage:", e);
      }
    }
  }, []);

  // Save to localStorage whenever selection changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedProperties));
  }, [selectedProperties]);

  const addToComparison = (property: Property) => {
    if (selectedProperties.length >= MAX_COMPARISON_PROPERTIES) {
      return; // Already at max
    }

    if (!selectedProperties.find((p) => p.id === property.id)) {
      setSelectedProperties((prev) => [...prev, property]);
    }
  };

  const removeFromComparison = (propertyId: string) => {
    setSelectedProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };

  const clearComparison = () => {
    setSelectedProperties([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isInComparison = (propertyId: string) => {
    return selectedProperties.some((p) => p.id === propertyId);
  };

  const canAddMore = selectedProperties.length < MAX_COMPARISON_PROPERTIES;

  return (
    <ComparisonContext.Provider
      value={{
        selectedProperties,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        canAddMore,
        maxProperties: MAX_COMPARISON_PROPERTIES,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within ComparisonProvider");
  }
  return context;
}
