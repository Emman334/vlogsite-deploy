import { createClient } from '@supabase/supabase-js';

// IMPORTANT:
// Create a `react-app/.env` (or root .env) with:
// VITE_SUPABASE_URL=...
// VITE_SUPABASE_ANON_KEY=...
const supabaseUrl = import.meta?.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta?.env?.VITE_SUPABASE_ANON_KEY;


// Note: during some tooling/tests, Vite env vars may be unavailable in Node.
// In the browser/Vite dev server, import.meta.env will be defined.
if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Missing Supabase env vars (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). '
    + 'Make sure react-app/.env exists and is loaded by Vite.'
  );
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;




