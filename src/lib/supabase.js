import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://fegusstmwbmvehhbfdgd.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZ3Vzc3Rtd2JtdmVoaGJmZGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MjM1NTksImV4cCI6MjA5MzQ5OTU1OX0.eqFhsJfWqUBTxmd1-dHyW9ebuuXZENaQrIy-jFJTA3o'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})
