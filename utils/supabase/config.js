import { createClient } from "@supabase/supabase-js";
import { LargeSecureStore } from "../SecureLocalStorage";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://rdoshowgrmvpotygauvz.supabase.co";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new LargeSecureStore(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export { supabase };
