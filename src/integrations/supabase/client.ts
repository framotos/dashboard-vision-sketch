// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vkxpcazzhqyovtqrqpiw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZreHBjYXp6aHF5b3Z0cXJxcGl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxOTgzMTMsImV4cCI6MjA2MTc3NDMxM30.ddeTiFrTYh_z1HUErung1zCNucM-7l8VfEELHJNtRH8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);