# Firebase Authentication Setup Guide

## Overview
This guide will help you set up Firebase Authentication for Medic Vault, enabling user login, registration, and role-based access control.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Enter project name: `medic-vault` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Click, toggle "Enable", and save
   - **Google** (optional): Click, toggle "Enable", add support email, and save
   - **Apple** (optional): Follow Apple's setup instructions

## Step 3: Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select "Start in production mode" (we'll add rules next)
4. Choose a location closest to your users
5. Click "Enable"

## Step 4: Set Up Firestore Security Rules

1. In Firestore Database, go to the "Rules" tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    // Patients collection - authenticated users can CRUD
    match /patients/{patientId} {
      allow read, write: if request.auth != null;
    }
    
    // Departments collection
    match /departments/{deptId} {
      allow read, write: if request.auth != null;
    }
    
    // Folders collection
    match /folders/{folderId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

## Step 5: Get Firebase Configuration

1. Go to Project Settings (gear icon near "Project Overview")
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Register app with nickname: `medic-vault-web`
5. Copy the `firebaseConfig` object values

## Step 6: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   VITE_FIREBASE_AUTH_DOMAIN=medic-vault-xxxxx.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=medic-vault-xxxxx
   VITE_FIREBASE_STORAGE_BUCKET=medic-vault-xxxxx.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxx
   ```

## Step 7: Create Super Admin User

### Option A: Using Firebase Console
1. Go to Authentication > Users
2. Click "Add user"
3. Enter email: `admin@medicvault.com` (or your preferred email)
4. Enter password (minimum 6 characters)
5. Click "Add user"
6. Copy the User UID

### Option B: Using the App
1. Start the development server: `npm run dev`
2. Open http://localhost:3000
3. Click "Register Now"
4. Fill in the form with your admin details
5. Select role: "Admin" (you'll upgrade to super_admin next)

### Upgrade to Super Admin
1. Go to Firestore Database
2. Find the `users` collection
3. Click on your user document
4. Edit the `role` field
5. Change value from `admin` to `super_admin`
6. Click "Update"

## Step 8: Test Authentication

1. Restart your dev server if it's running
2. Open http://localhost:3000
3. You should see the login screen
4. Sign in with your super admin credentials
5. You should see the dashboard with mock data

## User Roles Explained

- **super_admin**: Full access + sees mock data for testing
- **admin**: Can manage users and all patient data
- **doctor**: Can view and edit patient records
- **nurse**: Can view and update patient information
- **staff**: Basic access to view patient information

## Creating New Users

### For Super Admin:
- Super admin sees mock data automatically
- Can create new users through the app

### For New Users:
1. Click "Register Now" on login screen
2. Fill in details and select appropriate role
3. New users start with empty data
4. They can create their own patients and records

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Check that `.env.local` exists and has correct values
- Restart the dev server after adding environment variables

### "Firebase: Error (auth/invalid-api-key)"
- Verify your API key in Firebase Console
- Ensure no extra spaces in `.env.local`

### "Missing or insufficient permissions"
- Check Firestore security rules are published
- Ensure user is authenticated

### Users can't sign up
- Verify Email/Password is enabled in Authentication > Sign-in method
- Check browser console for specific error messages

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` by default
2. **Use strong passwords** for admin accounts
3. **Regularly review** Firestore security rules
4. **Enable 2FA** in Firebase Console for your account
5. **Monitor** Authentication logs for suspicious activity

## Next Steps

- Set up email verification (optional)
- Configure password reset emails
- Add custom claims for advanced role management
- Set up Cloud Functions for automated tasks
- Configure backup strategies for Firestore

## Support

For issues or questions:
- Check Firebase documentation: https://firebase.google.com/docs
- Review Firestore security rules: https://firebase.google.com/docs/firestore/security/get-started
- Contact your development team
