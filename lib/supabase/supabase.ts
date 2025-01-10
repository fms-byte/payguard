import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: "admin" | "user";
          created_at: string;
        };
        Insert: {
          email: string;
          role?: "admin" | "user";
        };
        Update: {
          email?: string;
          role?: "admin" | "user";
        };
      };
      payments: {
        Row: {
          id: string;
          title: string;
          amount: number;
          status: "pending" | "approved" | "rejected";
          user_id: string;
          created_at: string;
        };
        Insert: {
          title: string;
          amount: number;
          status?: "pending" | "approved" | "rejected";
          user_id: string;
        };
        Update: {
          status?: "pending" | "approved" | "rejected";
        };
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          file_url: string;
          status: "pending" | "approved" | "rejected";
          uploaded_at: string;
        };
        Insert: {
          user_id: string;
          file_url: string;
          status?: "pending" | "approved" | "rejected";
        };
        Update: {
          status?: "pending" | "approved" | "rejected";
        };
      };
    };
  };
};
