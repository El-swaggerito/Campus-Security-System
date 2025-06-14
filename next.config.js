/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Only include environment variables that should be available on the client
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Suppress environment variable warnings for npm-related variables
  experimental: {
    serverComponentsExternalPackages: ["@supabase/supabase-js"],
  },
}

module.exports = nextConfig
