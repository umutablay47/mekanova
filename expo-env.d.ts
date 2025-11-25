/// <reference types="expo/types" />

// NOTE: This file should be included in your .gitignore.
declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_SUPABASE_URL: string;
    EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
  }
}
