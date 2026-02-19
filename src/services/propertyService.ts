import { Property } from "@/data/properties";

// URL for our simulated API
const API_URL = "/properties.json";

export const fetchProperties = async (): Promise<Property[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch properties: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
            console.error("Received HTML instead of JSON. Path might be incorrect.");
            throw new Error("Received HTML instead of JSON");
        }

        const text = await response.text();
        try {
            const data: Property[] = JSON.parse(text);
            // Simulate network delay for realism (optional, but good for UX testing)
            await new Promise(resolve => setTimeout(resolve, 800));
            return data;
        } catch (e) {
            console.error("JSON Parse Error. Response start:", text.substring(0, 100));
            throw e;
        }
    } catch (error) {
        console.error("Error fetching properties:", error);
        return [];
    }
};

export const fetchPropertyById = async (id: string): Promise<Property | null> => {
    try {
        const properties = await fetchProperties();
        return properties.find(p => p.id === id) || null;
    } catch (error) {
        console.error("Error fetching property details:", error);
        return null;
    }
};
