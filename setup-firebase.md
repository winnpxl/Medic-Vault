# Quick Firebase Setup

## Prerequisites
- Node.js installed
- Firebase account created
- Firebase project created

## Quick Setup Steps

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env.local
   ```

3. **Add your Firebase config to `.env.local`**:
   - Get config from Firebase Console > Project Settings > Your apps
   - Replace all `your_*_here` values

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Create your first user**:
   - Open http://localhost:3000
   - Click "Register Now"
   - Fill in your details
   - Select a role

6. **Upgrade to Super Admin** (optional):
   - Go to Firebase Console > Firestore Database
   - Find your user in the `users` collection
   - Change `role` from your selected role to `super_admin`
   - Refresh the app

## What's Different for Each User Type?

### Super Admin
- Sees mock patient data automatically
- Full access to all features
- Can manage all users

### Other Users (Admin, Doctor, Nurse, Staff)
- Start with empty dashboard
- Can create their own patient records
- Data is stored in Firebase
- No mock data shown

## Testing the Setup

1. **Login as super admin** - You should see mock patients
2. **Create a new user** - Register with a different email
3. **Login as new user** - Dashboard should be empty
4. **Create a patient** - Use "Add New Patient" button (coming soon)

## Need Help?

See `FIREBASE_SETUP.md` for detailed instructions.
