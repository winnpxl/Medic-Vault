# Authentication Features

## Overview
Medic Vault now includes a complete authentication system with Firebase backend integration, role-based access control, and user management.

## Features Implemented

### 1. Authentication Screen
- Modern, responsive login/register interface
- Matches the design from the provided reference image
- Split-screen layout with branding on the left
- Form on the right with social login options

### 2. User Registration
- Email/password registration
- Full name capture
- Role selection (Staff, Nurse, Doctor, Admin)
- Optional newsletter subscription
- Email validation
- Password strength requirements

### 3. User Login
- Email/password authentication
- "Remember me" functionality
- Password visibility toggle
- Error handling with user-friendly messages

### 4. Password Reset
- Forgot password flow
- Email-based password reset
- Link sent to user's email
- Secure token-based reset

### 5. Role-Based Access Control
- **Super Admin**: Full access + mock data for testing
- **Admin**: Full management capabilities
- **Doctor**: Patient record management
- **Nurse**: Patient care and updates
- **Staff**: Basic viewing permissions

### 6. Firebase Integration
- Real-time authentication state
- Firestore database for user profiles
- Secure user data storage
- Automatic session management

### 7. User Profile Display
- User name and email in sidebar
- Role badge display
- Profile picture support
- Last login tracking

### 8. Logout Functionality
- Secure sign-out
- Session cleanup
- Redirect to login screen

## Technical Implementation

### File Structure
```
src/
├── lib/
│   └── firebase.ts              # Firebase configuration
├── contexts/
│   └── AuthContext.tsx          # Authentication context provider
├── components/
│   └── auth/
│       └── AuthScreen.tsx       # Login/Register UI
└── types/
    └── index.ts                 # User and auth types
```

### Key Components

#### AuthContext
- Manages authentication state
- Provides auth methods (signIn, signUp, signOut)
- Handles Firebase user synchronization
- Stores user profile data

#### AuthScreen
- Unified login/register interface
- Form validation
- Error handling
- Social login UI (Google, Apple)
- Responsive design

#### Protected Routes
- App.tsx checks authentication state
- Shows loading spinner during auth check
- Redirects to login if not authenticated
- Loads appropriate data based on user role

## Data Separation

### Super Admin
- Automatically sees mock patient data
- Used for testing and demonstrations
- Full access to all features

### Regular Users
- Start with empty dashboard
- Create their own patient records
- Data stored in Firebase Firestore
- Isolated from other users' data

## Security Features

1. **Environment Variables**: Sensitive Firebase config in `.env.local`
2. **Firestore Rules**: Database access control
3. **Password Requirements**: Minimum 6 characters (Firebase default)
4. **Secure Sessions**: Firebase handles token management
5. **HTTPS Only**: Production deployment requires HTTPS

## User Workflow

### First Time Setup
1. User visits the app
2. Sees authentication screen
3. Clicks "Register Now"
4. Fills in registration form
5. Selects appropriate role
6. Submits form
7. Account created in Firebase
8. Automatically logged in
9. Redirected to empty dashboard

### Returning User
1. User visits the app
2. Sees authentication screen
3. Enters email and password
4. Clicks "Sign In"
5. Authenticated by Firebase
6. Redirected to dashboard
7. Sees their own data

### Super Admin
1. Created manually in Firebase Console
2. Role set to `super_admin` in Firestore
3. Logs in normally
4. Sees mock data automatically
5. Can test all features

## Environment Setup

### Required Environment Variables
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Firebase Console Setup
1. Create Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Set up security rules
5. Get web app configuration
6. Add to `.env.local`

## Future Enhancements

### Planned Features
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] Social login implementation (Google, Apple)
- [ ] Password strength indicator
- [ ] Account recovery options
- [ ] User profile editing
- [ ] Avatar upload
- [ ] Activity logs
- [ ] Session timeout
- [ ] Remember device option

### Advanced Features
- [ ] Custom claims for fine-grained permissions
- [ ] Admin panel for user management
- [ ] Audit trail for user actions
- [ ] IP-based access control
- [ ] Device management
- [ ] Login notifications
- [ ] Suspicious activity detection

## Testing

### Test Accounts
Create test accounts for each role:
- `admin@test.com` - Admin role
- `doctor@test.com` - Doctor role
- `nurse@test.com` - Nurse role
- `staff@test.com` - Staff role

### Test Scenarios
1. **Registration**: Create new account
2. **Login**: Sign in with existing account
3. **Logout**: Sign out and verify redirect
4. **Password Reset**: Request password reset email
5. **Role Access**: Verify role-based data access
6. **Session Persistence**: Refresh page, stay logged in
7. **Invalid Credentials**: Test error handling

## Troubleshooting

### Common Issues

**"Firebase configuration not found"**
- Solution: Create `.env.local` with Firebase config

**"Email already in use"**
- Solution: Use different email or reset password

**"Invalid email"**
- Solution: Check email format

**"Weak password"**
- Solution: Use at least 6 characters

**"Network error"**
- Solution: Check internet connection and Firebase status

## Support

For setup help, see:
- `FIREBASE_SETUP.md` - Detailed setup guide
- `setup-firebase.md` - Quick start guide
- `.env.example` - Environment variable template

## Credits

Authentication system designed and implemented for Medic Vault.
UI design reference provided by user.
