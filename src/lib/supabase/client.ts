import { createClient } from "@supabase/supabase-js";

export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase is not configured.");
  if (key.startsWith("sb_secret_") || key.includes("service_role")) throw new Error("Use the Supabase publishable or anon key here, never the secret key.");
  return createClient(url, key);
}

export function isSupabaseConfigured() {
  const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && key && !key.startsWith("sb_secret_") && !key.includes("service_role"));
}
