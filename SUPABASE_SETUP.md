# Supabase Authentication Setup

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key

## 2. Environment Variables

Create a `.env` file in your project root with:

```bash
REACT_APP_SUPABASE_URL=your-supabase-project-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 3. Enable Email Authentication

In your Supabase dashboard:
1. Go to Authentication > Settings
2. Enable "Enable email confirmations"
3. Configure your email templates if needed

## 4. Update Supabase Configuration

Update `src/lib/supabase.ts` with your actual credentials:

```typescript
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'your-actual-supabase-url';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-actual-supabase-anon-key';
```

## 5. Test Authentication

1. Start your app: `npm start`
2. Visit `/login` to test sign up/sign in
3. Try accessing `/create` - should redirect to login if not authenticated
4. After login, you should be able to access protected routes

## Features

- ✅ User registration with email verification
- ✅ User login with email/password
- ✅ Password reset functionality
- ✅ Protected routes (Create page requires authentication)
- ✅ Access tokens automatically included in API calls
- ✅ User session management
- ✅ Responsive authentication UI 