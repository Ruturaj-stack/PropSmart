export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    },
    public: {
        Tables: {
            interactions: {
                Row: {
                    created_at: string
                    duration_seconds: number | null
                    id: string
                    interaction_type: string
                    metadata: Json | null
                    property_id: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    duration_seconds?: number | null
                    id?: string
                    interaction_type: string
                    metadata?: Json | null
                    property_id: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    duration_seconds?: number | null
                    id?: string
                    interaction_type?: string
                    metadata?: Json | null
                    property_id?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "interactions_property_id_fkey"
                        columns: ["property_id"]
                        isOneToOne: false
                        referencedRelation: "properties"
                        referencedColumns: ["id"]
                    },
                ]
            }
            preferences: {
                Row: {
                    created_at: string
                    id: string
                    max_bedrooms: number | null
                    max_price: number | null
                    min_bedrooms: number | null
                    min_price: number | null
                    preferred_amenities: string[] | null
                    preferred_locations: string[] | null
                    preferred_types: string[] | null
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    max_bedrooms?: number | null
                    max_price?: number | null
                    min_bedrooms?: number | null
                    min_price?: number | null
                    preferred_amenities?: string[] | null
                    preferred_locations?: string[] | null
                    preferred_types?: string[] | null
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    max_bedrooms?: number | null
                    max_price?: number | null
                    min_bedrooms?: number | null
                    min_price?: number | null
                    preferred_amenities?: string[] | null
                    preferred_locations?: string[] | null
                    preferred_types?: string[] | null
                    updated_at?: string
                    user_id?: string
                }
                Relationships: []
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string
                    full_name: string | null
                    id: string
                    phone: string | null
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string
                    full_name?: string | null
                    id?: string
                    phone?: string | null
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string
                    full_name?: string | null
                    id?: string
                    phone?: string | null
                    updated_at?: string
                    user_id?: string
                }
                Relationships: []
            }
            properties: {
                Row: {
                    amenities: string[] | null
                    area_sqft: number | null
                    bathrooms: number | null
                    bedrooms: number | null
                    city: string | null
                    created_at: string
                    created_by: string | null
                    description: string | null
                    furnishing: string | null
                    id: string
                    images: string[] | null
                    is_active: boolean
                    latitude: number | null
                    location: string | null
                    longitude: number | null
                    price: number
                    price_per_sqft: number | null
                    property_type: string | null
                    title: string
                    updated_at: string
                }
                Insert: {
                    amenities?: string[] | null
                    area_sqft?: number | null
                    bathrooms?: number | null
                    bedrooms?: number | null
                    city?: string | null
                    created_at?: string
                    created_by?: string | null
                    description?: string | null
                    furnishing?: string | null
                    id?: string
                    images?: string[] | null
                    is_active?: boolean
                    latitude?: number | null
                    location?: string | null
                    longitude?: number | null
                    price: number
                    price_per_sqft?: number | null
                    property_type?: string | null
                    title: string
                    updated_at?: string
                }
                Update: {
                    amenities?: string[] | null
                    area_sqft?: number | null
                    bathrooms?: number | null
                    bedrooms?: number | null
                    city?: string | null
                    created_at?: string
                    created_by?: string | null
                    description?: string | null
                    furnishing?: string | null
                    id?: string
                    images?: string[] | null
                    is_active?: boolean
                    latitude?: number | null
                    location?: string | null
                    longitude?: number | null
                    price?: number
                    price_per_sqft?: number | null
                    property_type?: string | null
                    title?: string
                    updated_at?: string
                }
                Relationships: []
            }
            saved_properties: {
                Row: {
                    id: string
                    property_id: string
                    saved_at: string
                    user_id: string
                }
                Insert: {
                    id?: string
                    property_id: string
                    saved_at?: string
                    user_id: string
                }
                Update: {
                    id?: string
                    property_id?: string
                    saved_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "saved_properties_property_id_fkey"
                        columns: ["property_id"]
                        isOneToOne: false
                        referencedRelation: "properties"
                        referencedColumns: ["id"]
                    },
                ]
            }
            user_roles: {
                Row: {
                    id: string
                    role: Database["public"]["Enums"]["app_role"]
                    user_id: string
                }
                Insert: {
                    id?: string
                    role?: Database["public"]["Enums"]["app_role"]
                    user_id: string
                }
                Update: {
                    id?: string
                    role?: Database["public"]["Enums"]["app_role"]
                    user_id?: string
                }
                Relationships: []
            }
            user_behavior: {
                Row: {
                    id: string;
                    user_id: string;
                    property_id: string;
                    action_type: 'view' | 'click' | 'save' | 'unsave' | 'share';
                    duration_seconds: number;
                    metadata: Record<string, unknown>;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    property_id: string;
                    action_type: 'view' | 'click' | 'save' | 'unsave' | 'share';
                    duration_seconds?: number;
                    metadata?: Record<string, unknown>;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    property_id?: string;
                    action_type?: 'view' | 'click' | 'save' | 'unsave' | 'share';
                    duration_seconds?: number;
                    metadata?: Record<string, unknown>;
                    created_at?: string;
                };
                Relationships: [];
            };
            user_search_patterns: {
                Row: {
                    id: string;
                    user_id: string;
                    search_query: Record<string, unknown>;
                    result_count: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    search_query: Record<string, unknown>;
                    result_count?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    search_query?: Record<string, unknown>;
                    result_count?: number;
                    created_at?: string;
                };
                Relationships: [];
            };
            recently_viewed: {
                Row: {
                    user_id: string;
                    property_id: string;
                    viewed_at: string;
                };
                Insert: {
                    user_id: string;
                    property_id: string;
                    viewed_at?: string;
                };
                Update: {
                    user_id?: string;
                    property_id?: string;
                    viewed_at?: string;
                };
                Relationships: [];
            };

            user_alerts: {
                Row: {
                    id: string;
                    user_id: string;
                    alert_type: 'price_drop' | 'new_listing' | 'saved_search' | 'price_increase';
                    criteria: Record<string, unknown>;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    alert_type: 'price_drop' | 'new_listing' | 'saved_search' | 'price_increase';
                    criteria: Record<string, unknown>;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    alert_type?: 'price_drop' | 'new_listing' | 'saved_search' | 'price_increase';
                    criteria?: Record<string, unknown>;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            notifications: {
                Row: {
                    id: string;
                    user_id: string;
                    alert_id: string;
                    title: string;
                    message: string;
                    property_id: string | null;
                    property_data: Record<string, unknown> | null;
                    is_read: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    alert_id: string;
                    title: string;
                    message: string;
                    property_id?: string | null;
                    property_data?: Record<string, unknown> | null;
                    is_read?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    alert_id?: string;
                    title?: string;
                    message?: string;
                    property_id?: string | null;
                    property_data?: Record<string, unknown> | null;
                    is_read?: boolean;
                    created_at?: string;
                };
                Relationships: [];
            };
            property_reviews: {
                Row: {
                    id: string;
                    property_id: string;
                    user_id: string;
                    rating: number;
                    title: string;
                    comment: string;
                    helpful_count: number;
                    verified_booking: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    property_id: string;
                    user_id: string;
                    rating: number;
                    title: string;
                    comment: string;
                    helpful_count?: number;
                    verified_booking?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    property_id?: string;
                    user_id?: string;
                    rating?: number;
                    title?: string;
                    comment?: string;
                    helpful_count?: number;
                    verified_booking?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            seller_profiles: {
                Row: {
                    id: string;
                    business_name: string | null;
                    phone: string | null;
                    email: string | null;
                    verified: boolean;
                    total_properties: number;
                    avg_rating: number;
                    response_rate: number;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    business_name?: string | null;
                    phone?: string | null;
                    email?: string | null;
                    verified?: boolean;
                    total_properties?: number;
                    avg_rating?: number;
                    response_rate?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    business_name?: string | null;
                    phone?: string | null;
                    email?: string | null;
                    verified?: boolean;
                    total_properties?: number;
                    avg_rating?: number;
                    response_rate?: number;
                    created_at?: string;
                };
                Relationships: [];
            };
            chat_conversations: {
                Row: {
                    id: string;
                    user_id: string;
                    title: string;
                    last_message_at: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    title?: string;
                    last_message_at?: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    title?: string;
                    last_message_at?: string;
                    created_at?: string;
                };
                Relationships: [];
            };
            chat_messages: {
                Row: {
                    id: string;
                    conversation_id: string;
                    role: 'user' | 'assistant';
                    content: string;
                    metadata: Record<string, unknown>;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    conversation_id: string;
                    role: 'user' | 'assistant';
                    content: string;
                    metadata?: Record<string, unknown>;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    conversation_id?: string;
                    role?: 'user' | 'assistant';
                    content?: string;
                    metadata?: Record<string, unknown>;
                    created_at?: string;
                };
                Relationships: [];
            };
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            has_role: {
                Args: {
                    _role: Database["public"]["Enums"]["app_role"]
                    _user_id: string
                }
                Returns: boolean
            }
        }
        Enums: {
            app_role: "admin" | "user"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {
            app_role: ["admin", "user"],
        },
    },
} as const