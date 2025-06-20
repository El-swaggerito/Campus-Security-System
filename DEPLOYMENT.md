# Deployment Guide

## Environment Variables Setup

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://cddsbvmrndnmtwvxbdiz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZHNidm1ybmRubXR3dnhiZGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NjkzODYsImV4cCI6MjA2NTQ0NTM4Nn0.uTV9R0N1IEWyOo7JeGTPc3iCA3XjCbIkIkmxpfli--c
\`\`\`

4. Make sure to set these for **Production**, **Preview**, and **Development** environments
5. Redeploy your application

### Alternative: Using Vercel CLI

\`\`\`bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
\`\`\`

## Database Setup

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the `create-tables.sql` script
4. Run the `seed-data.sql` script
5. Verify tables are created in **Table Editor**

## Deployment Steps

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

## Troubleshooting

- If you get environment variable errors, double-check they're set in Vercel
- Make sure the Supabase URL and key are correct
- Verify your Supabase project is active and accessible
