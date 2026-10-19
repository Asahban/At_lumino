
import { createClient } from '@supabase/supabase-js';
import { DbTables } from './database.types';

// Define a custom Database type that includes our tables
export type Database = {
  public: {
    Tables: DbTables;
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};

const SUPABASE_URL = "https://iejgrouyajctktkjzmoc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllamdyb3V5YWpjdGt0a2p6bW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MDY1MjcsImV4cCI6MjA1OTk4MjUyN30.JgrIX9zokbDCNvqBWQMXsR5ZJStlJL7SrfDW1oNG5nw";

// Create a typed Supabase client
export const typedSupabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
