# Supabase Profiles Integration Guide

## Overview

This guide explains how to set up and use the profiles table in your PropSmart application.

## 📁 Files Created

### Database Migration

- [`001_profiles.sql`](file:///c:/Users/Ruturaj/OneDrive/Desktop/FYP/PropSmart/supabase/migrations/001_profiles.sql) - SQL migration for profiles table

### Type Definitions

- [`types.ts`](file:///c:/Users/Ruturaj/OneDrive/Desktop/FYP/PropSmart/src/integrations/supabase/types.ts) - Updated with profiles table types

### API Services

- [`profiles.ts`](file:///c:/Users/Ruturaj/OneDrive/Desktop/FYP/PropSmart/src/integrations/supabase/profiles.ts) - Profile CRUD operations

### React Hooks

- [`useProfile.ts`](file:///c:/Users/Ruturaj/OneDrive/Desktop/FYP/PropSmart/src/hooks/useProfile.ts) - Custom hook for profile management

### Examples

- [`ProfileExample.tsx`](file:///c:/Users/Ruturaj/OneDrive/Desktop/FYP/PropSmart/src/components/ProfileExample.tsx) - Example component

---

## 🚀 Setup Instructions

### Step 1: Run the SQL Migration in Supabase

1. **Open your Supabase Dashboard**: https://app.supabase.com/project/grvwianyerqvtzexllbc
2. **Navigate to**: SQL Editor
3. **Copy the SQL** from [`001_profiles.sql`](file:///c:/Users/Ruturaj/OneDrive/Desktop/FYP/PropSmart/supabase/migrations/001_profiles.sql)
4. **Paste and run** the SQL in the editor

This will create:

- ✅ `profiles` table with columns: `id`, `full_name`, `created_at`
- ✅ Row Level Security (RLS) policies
- ✅ Auto-trigger to create profile on user signup

### Step 2: Verify the Setup

After running the migration, verify in Supabase:

1. **Table Editor** → Check `profiles` table exists
2. **Authentication** → **Policies** → Verify 3 policies exist:
   - Users can insert their own profile
   - Users can view their own profile
   - Users can update their own profile

---

## 📖 Usage Examples

### Example 1: Display User Profile

```tsx
import { useProfile } from "@/hooks/useProfile";

function UserProfileCard() {
  const { profile, loading, error } = useProfile();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!profile) return <div>Please sign in</div>;

  return (
    <div>
      <h2>{profile.full_name}</h2>
      <p>Member since {new Date(profile.created_at).toLocaleDateString()}</p>
    </div>
  );
}
```

### Example 2: Update Profile

```tsx
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";

function EditProfile() {
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState(profile?.full_name || "");

  const handleSave = async () => {
    try {
      await updateProfile({ full_name: name });
      alert("Profile updated!");
    } catch (err) {
      alert("Failed to update");
    }
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
```

### Example 3: Using API Functions Directly

```tsx
import {
  getCurrentProfile,
  updateCurrentProfile,
} from "@/integrations/supabase/profiles";

async function exampleUsage() {
  // Get current user's profile
  const profile = await getCurrentProfile();
  console.log(profile.full_name);

  // Update profile
  await updateCurrentProfile({ full_name: "New Name" });
}
```

---

## 🔒 Security Features

### Row Level Security (RLS)

All policies ensure users can only access their own profiles:

1. **INSERT**: Users can only create profiles for themselves
2. **SELECT**: Users can only view their own profile
3. **UPDATE**: Users can only update their own profile

### Auto-Profile Creation

When a new user signs up via Supabase Auth:

- A profile is automatically created
- The `full_name` is pulled from signup metadata (if provided)
- Defaults to "User" if no name is provided

---

## 🛠️ API Reference

### `useProfile()` Hook

Returns an object with:

- `profile` - Profile data or null
- `loading` - Loading state (boolean)
- `error` - Error object or null
- `refetch()` - Function to manually refresh profile
- `updateProfile(updates)` - Function to update profile

### Profile Functions

**`getProfile(userId: string)`**

- Fetch profile by user ID

**`getCurrentProfile()`**

- Fetch current authenticated user's profile

**`createProfile(data: ProfileInsert)`**

- Create new profile (usually auto-created via trigger)

**`updateProfile(userId: string, updates: ProfileUpdate)`**

- Update profile by user ID

**`updateCurrentProfile(updates: ProfileUpdate)`**

- Update current user's profile

---

## 📊 Database Schema

```sql
Table: profiles
├── id (uuid, primary key) → references auth.users(id)
├── full_name (text, not null)
└── created_at (timestamptz, default: now())
```

---

## 🧪 Testing

To test the integration:

1. **Sign up a new user** through your auth flow
2. **Check Supabase** → Table Editor → profiles (new row should appear)
3. **Use the ProfileExample component** to view/edit the profile
4. **Verify RLS** by trying to access another user's profile (should fail)

---

## ✨ Next Steps

### Extend the Profile

To add more fields (avatar, bio, etc.):

1. **Update the SQL**:

```sql
ALTER TABLE profiles ADD COLUMN avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN bio TEXT;
```

2. **Update TypeScript types** in `types.ts`:

```typescript
Row: {
  id: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}
```

3. **Use the updated fields** in your components

### Integration with Your App

- Add profile display to the **Navbar**
- Create a **Settings/Profile page**
- Show profile info on **Property listings** (if public profiles needed)
- Add profile completion prompts for new users

---

## 🐛 Troubleshooting

**Profile not found after signup?**

- Check if the trigger `on_auth_user_created` is active
- Verify RLS policies allow the user to view their own profile

**Can't update profile?**

- Ensure user is authenticated
- Check RLS policy for UPDATE exists

**TypeScript errors?**

- Restart your TypeScript server
- Ensure `types.ts` is updated correctly

---

## 📚 Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [React Query with Supabase](https://supabase.com/docs/guides/database/react-query)
