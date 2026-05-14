import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wkmimysywkzdsrlvywdg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrbWlteXN5d2t6ZHNybHZ5d2RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyODUwNzgsImV4cCI6MjA5Mzg2MTA3OH0.-mWyANFqnKrEacwcViM3aXhRZqey9LR9aCHLkOwS5H4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)