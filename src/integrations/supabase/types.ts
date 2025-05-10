export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "blood requests": {
        Row: {
          "blood type": string
          created_at: string
          id: number
          location: string | null
          name: string | null
          urgency: string | null
        }
        Insert: {
          "blood type": string
          created_at?: string
          id?: number
          location?: string | null
          name?: string | null
          urgency?: string | null
        }
        Update: {
          "blood type"?: string
          created_at?: string
          id?: number
          location?: string | null
          name?: string | null
          urgency?: string | null
        }
        Relationships: []
      }
      blood_donations: {
        Row: {
          amount_ml: number
          created_at: string
          donation_date: string
          id: string
          location: string | null
          notes: string | null
          user_id: string
        }
        Insert: {
          amount_ml: number
          created_at?: string
          donation_date?: string
          id?: string
          location?: string | null
          notes?: string | null
          user_id: string
        }
        Update: {
          amount_ml?: number
          created_at?: string
          donation_date?: string
          id?: string
          location?: string | null
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blood_donations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_requests: {
        Row: {
          blood_type: string
          created_at: string
          hospital_name: string | null
          id: string
          notes: string | null
          request_date: string
          status: string
          units_requested: number
          updated_at: string
          urgency: string
          user_id: string
        }
        Insert: {
          blood_type: string
          created_at?: string
          hospital_name?: string | null
          id?: string
          notes?: string | null
          request_date?: string
          status?: string
          units_requested: number
          updated_at?: string
          urgency: string
          user_id: string
        }
        Update: {
          blood_type?: string
          created_at?: string
          hospital_name?: string | null
          id?: string
          notes?: string | null
          request_date?: string
          status?: string
          units_requested?: number
          updated_at?: string
          urgency?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blood_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          blood_type: string | null
          created_at: string
          full_name: string | null
          id: string
          is_donor: boolean | null
          last_latitude: number | null
          last_location_update: string | null
          last_longitude: number | null
          phone_number: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          blood_type?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_donor?: boolean | null
          last_latitude?: number | null
          last_location_update?: string | null
          last_longitude?: number | null
          phone_number?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          blood_type?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_donor?: boolean | null
          last_latitude?: number | null
          last_location_update?: string | null
          last_longitude?: number | null
          phone_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          blood_type: string | null
          created_at: string | null
          email: string
          id: number
          latitude: number | null
          longitude: number | null
          name: string
          password: string
          phone: string | null
          role: string | null
        }
        Insert: {
          blood_type?: string | null
          created_at?: string | null
          email: string
          id?: number
          latitude?: number | null
          longitude?: number | null
          name: string
          password: string
          phone?: string | null
          role?: string | null
        }
        Update: {
          blood_type?: string | null
          created_at?: string | null
          email?: string
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string
          password?: string
          phone?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      admin_blood_requests: {
        Row: {
          blood_type: string | null
          hospital_name: string | null
          id: string | null
          notes: string | null
          recipient_contact: string | null
          recipient_location: string | null
          recipient_name: string | null
          request_date: string | null
          status: string | null
          units_requested: number | null
          urgency: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
