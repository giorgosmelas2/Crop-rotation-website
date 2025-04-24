import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oiodnsaeltgrxfwqngcg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pb2Ruc2FlbHRncnhmd3FuZ2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MDk3MzYsImV4cCI6MjA2MDk4NTczNn0.DTMBse4Qhk327i7TUwdoqO4iniiSl6vFBmBRl8Au4lc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);