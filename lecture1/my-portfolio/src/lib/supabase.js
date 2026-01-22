import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozgluradnedkbbpzoblr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96Z2x1cmFkbmVka2JicHpvYmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MjE2MTAsImV4cCI6MjA4Mzk5NzYxMH0.OmiRDsx8opzkxSBcAAyTqhZ9uvY7undEJH1WfVA2eOg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
