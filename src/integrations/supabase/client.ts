import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://suajiackxlkcfnpmffzz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1YWppYWNreGxrY2ZucG1mZnp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0MjQyMjAsImV4cCI6MjA4MzAwMDIyMH0.z_O9B6JfnhNsz2efnZ4rCjgIPBcZ54RMbcNtmGexsXg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);