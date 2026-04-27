# Supabase Authentication Setup

This project has been migrated from Firebase to Supabase for authentication and database management.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose your organization and project name
3. Set a strong database password
4. Choose your region

### 2. Get Your Credentials

1. In your Supabase dashboard, go to **Settings → API**
2. Copy your **Project URL** and **Anon Key**
3. Add these to your environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### 3. Set Up Database Tables

1. Go to the **SQL Editor** in your Supabase dashboard
2. Create a new query and paste the contents of `/scripts/setup-supabase.sql`
3. Run the query to create the necessary tables and Row Level Security policies

### 4. Enable Email Authentication

1. In the Supabase dashboard, go to **Authentication → Providers**
2. Enable **Email** authentication (should be enabled by default)
3. Configure your email settings if needed

## Key Changes from Firebase

- **Auth Method**: Changed from Google Sign-In to Email/Password authentication
- **Database**: Users and certificate requests are now stored in Supabase PostgreSQL
- **Auth Context**: Updated `AppStateContext.tsx` to use Supabase instead of Firebase
- **UI**: Added `AuthModal.tsx` component for email/password login and signup

## File Structure

- `src/lib/supabase.ts` - Supabase client initialization
- `src/components/AuthModal.tsx` - Login/signup modal component
- `src/AppStateContext.tsx` - Updated context with Supabase auth
- `scripts/setup-supabase.sql` - Database schema setup script

## Features

- ✅ Email/Password authentication
- ✅ User account creation
- ✅ Persistent user data (solved problems, certificates)
- ✅ Row Level Security for data protection
- ✅ Admin user detection

## Testing the Setup

1. Start the development server: `npm run dev`
2. Click "Sign In" button in the navbar
3. Create a new account or sign in with existing credentials
4. Your data will be synced to Supabase

## Database Schema

### users table
- `id` (UUID) - User ID from auth
- `email` (TEXT) - User email
- `display_name` (TEXT) - User's display name
- `vjudge_id` (TEXT) - VJudge account ID
- `solved_ids` (TEXT[]) - Array of solved problem IDs
- `solved_at` (JSONB) - Timestamps of when problems were solved
- `certificates` (JSONB) - Certificate data
- `is_admin` (BOOLEAN) - Admin status
- `created_at` (TIMESTAMP) - Account creation date

### certificate_requests table
- `id` (UUID) - Request ID
- `user_id` (UUID) - User who requested
- `user_email` (TEXT) - User's email
- `user_name` (TEXT) - User's name
- `topic_slug` (TEXT) - Course slug
- `vjudge_id` (TEXT) - VJudge ID for verification
- `status` (TEXT) - Request status (pending/approved/rejected)
- `requested_at` (TIMESTAMP) - Request creation time

## Environment Variables Required

```bash
NEXT_PUBLIC_SUPABASE_URL=       # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Your Supabase anonymous key
```

## Troubleshooting

### "Supabase connection failed"
- Verify your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check that your Supabase project is active and accessible

### "User data not syncing"
- Verify Row Level Security policies are enabled
- Check that the database tables were created properly from the SQL script

### "Auth modal not opening"
- Ensure the `AuthModal` component is imported and rendered in the Navbar
- Check browser console for any error messages

## Next Steps

- Set up email verification for better security
- Configure password reset functionality
- Add social login providers (Google, GitHub, etc.)
- Set up admin dashboard for certificate verification
