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
      applications: {
        Row: {
          applicant_id: string | null
          cover_letter: string | null
          created_at: string
          id: string
          internship_id: string | null
          status: string | null
        }
        Insert: {
          applicant_id?: string | null
          cover_letter?: string | null
          created_at?: string
          id?: string
          internship_id?: string | null
          status?: string | null
        }
        Update: {
          applicant_id?: string | null
          cover_letter?: string | null
          created_at?: string
          id?: string
          internship_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          website?: string | null
        }
        Relationships: []
      }
      contract_signatures: {
        Row: {
          contract_id: string
          id: string
          ip_address: string | null
          signature_data: string
          signed_at: string
          signer_id: string
          user_agent: string | null
        }
        Insert: {
          contract_id: string
          id?: string
          ip_address?: string | null
          signature_data: string
          signed_at?: string
          signer_id: string
          user_agent?: string | null
        }
        Update: {
          contract_id?: string
          id?: string
          ip_address?: string | null
          signature_data?: string
          signed_at?: string
          signer_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_signatures_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_signatures_signer_id_fkey"
            columns: ["signer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_templates: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          type: Database["public"]["Enums"]["contract_type"]
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          type: Database["public"]["Enums"]["contract_type"]
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          type?: Database["public"]["Enums"]["contract_type"]
        }
        Relationships: [
          {
            foreignKeyName: "contract_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_versions: {
        Row: {
          changes: Json
          contract_id: string
          created_at: string
          created_by: string | null
          id: string
          version_number: number
        }
        Insert: {
          changes: Json
          contract_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          version_number: number
        }
        Update: {
          changes?: Json
          contract_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "contract_versions_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          all_signed: boolean | null
          company_id: string | null
          created_at: string
          currency: string | null
          duration: string | null
          end_date: string | null
          fixed_amount: number | null
          gig_id: string | null
          hourly_rate: number | null
          id: string
          intern_id: string | null
          last_payment_date: string | null
          payment_schedule: string | null
          payment_type: Database["public"]["Enums"]["payment_type"] | null
          requires_signature: boolean | null
          shared_with: string[] | null
          start_date: string | null
          status: string | null
          template_id: string | null
          terms: string
          title: string | null
          total_hours_logged: number | null
          type: Database["public"]["Enums"]["contract_type"] | null
          version: number | null
        }
        Insert: {
          all_signed?: boolean | null
          company_id?: string | null
          created_at?: string
          currency?: string | null
          duration?: string | null
          end_date?: string | null
          fixed_amount?: number | null
          gig_id?: string | null
          hourly_rate?: number | null
          id?: string
          intern_id?: string | null
          last_payment_date?: string | null
          payment_schedule?: string | null
          payment_type?: Database["public"]["Enums"]["payment_type"] | null
          requires_signature?: boolean | null
          shared_with?: string[] | null
          start_date?: string | null
          status?: string | null
          template_id?: string | null
          terms: string
          title?: string | null
          total_hours_logged?: number | null
          type?: Database["public"]["Enums"]["contract_type"] | null
          version?: number | null
        }
        Update: {
          all_signed?: boolean | null
          company_id?: string | null
          created_at?: string
          currency?: string | null
          duration?: string | null
          end_date?: string | null
          fixed_amount?: number | null
          gig_id?: string | null
          hourly_rate?: number | null
          id?: string
          intern_id?: string | null
          last_payment_date?: string | null
          payment_schedule?: string | null
          payment_type?: Database["public"]["Enums"]["payment_type"] | null
          requires_signature?: boolean | null
          shared_with?: string[] | null
          start_date?: string | null
          status?: string | null
          template_id?: string | null
          terms?: string
          title?: string | null
          total_hours_logged?: number | null
          type?: Database["public"]["Enums"]["contract_type"] | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_intern_id_fkey"
            columns: ["intern_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "contract_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      currencies: {
        Row: {
          code: string
          exchange_rate: number
          is_active: boolean
          last_updated: string | null
          name: string
          symbol: string
        }
        Insert: {
          code: string
          exchange_rate?: number
          is_active?: boolean
          last_updated?: string | null
          name: string
          symbol: string
        }
        Update: {
          code?: string
          exchange_rate?: number
          is_active?: boolean
          last_updated?: string | null
          name?: string
          symbol?: string
        }
        Relationships: []
      }
      gigs: {
        Row: {
          application_deadline: string | null
          budget_range: string | null
          category: string | null
          company_id: string
          created_at: string
          description: string
          duration: string | null
          id: string
          is_featured: boolean | null
          skills: string[] | null
          status: string | null
          title: string
        }
        Insert: {
          application_deadline?: string | null
          budget_range?: string | null
          category?: string | null
          company_id: string
          created_at?: string
          description: string
          duration?: string | null
          id?: string
          is_featured?: boolean | null
          skills?: string[] | null
          status?: string | null
          title: string
        }
        Update: {
          application_deadline?: string | null
          budget_range?: string | null
          category?: string | null
          company_id?: string
          created_at?: string
          description?: string
          duration?: string | null
          id?: string
          is_featured?: boolean | null
          skills?: string[] | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "gigs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      internships: {
        Row: {
          application_deadline: string | null
          category: string | null
          company_id: string
          created_at: string
          description: string
          duration: string | null
          id: string
          is_featured: boolean | null
          location: string | null
          requirements: string | null
          salary_range: string | null
          status: string | null
          title: string
        }
        Insert: {
          application_deadline?: string | null
          category?: string | null
          company_id: string
          created_at?: string
          description: string
          duration?: string | null
          id?: string
          is_featured?: boolean | null
          location?: string | null
          requirements?: string | null
          salary_range?: string | null
          status?: string | null
          title: string
        }
        Update: {
          application_deadline?: string | null
          category?: string | null
          company_id?: string
          created_at?: string
          description?: string
          duration?: string | null
          id?: string
          is_featured?: boolean | null
          location?: string | null
          requirements?: string | null
          salary_range?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "internships_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          contract_id: string | null
          created_at: string
          id: string
          sender_id: string | null
        }
        Insert: {
          content: string
          contract_id?: string | null
          created_at?: string
          id?: string
          sender_id?: string | null
        }
        Update: {
          content?: string
          contract_id?: string | null
          created_at?: string
          id?: string
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          amount: number
          contract_id: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          status: string | null
          title: string
        }
        Insert: {
          amount: number
          contract_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: string | null
          title: string
        }
        Update: {
          amount?: number
          contract_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          notification_type:
            | Database["public"]["Enums"]["notification_type"]
            | null
          priority: string | null
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          notification_type?:
            | Database["public"]["Enums"]["notification_type"]
            | null
          priority?: string | null
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          notification_type?:
            | Database["public"]["Enums"]["notification_type"]
            | null
          priority?: string | null
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          contract_id: string | null
          created_at: string
          id: string
          milestone_id: string | null
          payment_date: string | null
          payment_gateway: string | null
          payment_gateway_fee: number | null
          payment_method: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          status: string | null
          time_log_id: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          contract_id?: string | null
          created_at?: string
          id?: string
          milestone_id?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          payment_gateway_fee?: number | null
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          status?: string | null
          time_log_id?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          contract_id?: string | null
          created_at?: string
          id?: string
          milestone_id?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          payment_gateway_fee?: number | null
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          status?: string | null
          time_log_id?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_time_log_id_fkey"
            columns: ["time_log_id"]
            isOneToOne: false
            referencedRelation: "time_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      posting_drafts: {
        Row: {
          budget_range: string | null
          company_id: string | null
          created_at: string
          creator_id: string | null
          current_step: string
          description: string | null
          duration: string | null
          id: string
          location: string | null
          requirements: string | null
          salary_range: string | null
          skills: string[] | null
          status: string | null
          title: string | null
          type: string
        }
        Insert: {
          budget_range?: string | null
          company_id?: string | null
          created_at?: string
          creator_id?: string | null
          current_step?: string
          description?: string | null
          duration?: string | null
          id?: string
          location?: string | null
          requirements?: string | null
          salary_range?: string | null
          skills?: string[] | null
          status?: string | null
          title?: string | null
          type: string
        }
        Update: {
          budget_range?: string | null
          company_id?: string | null
          created_at?: string
          creator_id?: string | null
          current_step?: string
          description?: string | null
          duration?: string | null
          id?: string
          location?: string | null
          requirements?: string | null
          salary_range?: string | null
          skills?: string[] | null
          status?: string | null
          title?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "posting_drafts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posting_drafts_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_type: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          is_company_account: boolean | null
          is_verified: boolean | null
          resume_url: string | null
          skills: string[] | null
        }
        Insert: {
          account_type?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_company_account?: boolean | null
          is_verified?: boolean | null
          resume_url?: string | null
          skills?: string[] | null
        }
        Update: {
          account_type?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_company_account?: boolean | null
          is_verified?: boolean | null
          resume_url?: string | null
          skills?: string[] | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          contract_id: string | null
          created_at: string
          id: string
          rating: number | null
          reviewed_id: string | null
          reviewer_id: string | null
        }
        Insert: {
          comment?: string | null
          contract_id?: string | null
          created_at?: string
          id?: string
          rating?: number | null
          reviewed_id?: string | null
          reviewer_id?: string | null
        }
        Update: {
          comment?: string | null
          contract_id?: string | null
          created_at?: string
          id?: string
          rating?: number | null
          reviewed_id?: string | null
          reviewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewed_id_fkey"
            columns: ["reviewed_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          contract_id: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
        }
        Insert: {
          assigned_to?: string | null
          contract_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
        }
        Update: {
          assigned_to?: string | null
          contract_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      time_logs: {
        Row: {
          contract_id: string | null
          created_at: string
          description: string | null
          end_time: string | null
          hours_logged: number | null
          id: string
          start_time: string
          status: string | null
        }
        Insert: {
          contract_id?: string | null
          created_at?: string
          description?: string | null
          end_time?: string | null
          hours_logged?: number | null
          id?: string
          start_time: string
          status?: string | null
        }
        Update: {
          contract_id?: string | null
          created_at?: string
          description?: string | null
          end_time?: string | null
          hours_logged?: number | null
          id?: string
          start_time?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "time_logs_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contract_status:
        | "draft"
        | "pending"
        | "active"
        | "completed"
        | "cancelled"
      contract_type:
        | "standard"
        | "nda"
        | "fixed_price"
        | "hourly_rate"
        | "milestone_based"
      notification_type:
        | "message"
        | "payment"
        | "milestone"
        | "task"
        | "contract"
      payment_status: "pending" | "processing" | "completed" | "failed"
      payment_type: "fixed" | "hourly"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
