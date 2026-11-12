import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser,
} from 'firebase/auth';
import type { DocumentData } from 'firebase/firestore';
import { auth } from '../lib/firebase';
import { loadFirestore } from '../lib/firestore';
import { hasPersistedSession } from '../lib/session';
import { User, UserRole, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Returning user: start downloading Firestore now, in parallel with Firebase
    // re-validating the session, instead of after it.
    if (hasPersistedSession()) {
      loadFirestore().catch(console.error);
    }

    // `loading` stays true until Firebase reports the initial auth state AND a
    // profile (with role) is known. onAuthStateChanged always fires once on startup.
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { fs, db } = await loadFirestore();
      const ref = fs.doc(db, 'users', firebaseUser.uid);
      // Ignore results that arrive after the user signed out or switched accounts.
      const stillCurrent = () => auth.currentUser?.uid === firebaseUser.uid;
      const toUser = (data: DocumentData): User => ({
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: data.displayName || '',
        role: data.role || 'staff',
        createdAt: data.createdAt || new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      });

      // 1. Profile from Firestore's local cache: instant on a returning visit, so the
      //    app doesn't wait on a network round trip before rendering. The server
      //    re-checks the role on every API call, so a stale cached role can't grant access.
      let haveProfile = false;
      try {
        const cached = await fs.getDocFromCache(ref);
        if (cached.exists() && stillCurrent()) {
          setUser(toUser(cached.data()));
          setLoading(false);
          haveProfile = true;
        }
      } catch {
        // Not cached yet (first visit on this browser); fall through to the server.
      }

      // 2. Fresh profile from the server (also refreshes the cache).
      try {
        const fresh = await fs.getDocFromServer(ref);
        if (!stillCurrent()) return;
        if (fresh.exists()) {
          setUser(toUser(fresh.data()));
          // Update last login asynchronously (don't wait for it)
          fs.setDoc(ref, { lastLogin: new Date().toISOString() }, { merge: true }).catch(console.error);
        }
        // No profile document: leave state alone. During sign-up this listener fires
        // before signUp() has written the profile, and signUp() sets the user itself.
      } catch (error) {
        console.error('Error loading user profile:', error);
        // Offline or Firestore unavailable: keep the cached profile if we had one.
        if (!haveProfile && stillCurrent()) setUser(null);
      } finally {
        if (stillCurrent()) setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, displayName: string, role: UserRole) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser: User = {
      uid: userCredential.user.uid,
      email,
      displayName,
      role,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    const { fs, db } = await loadFirestore();
    await fs.setDoc(fs.doc(db, 'users', userCredential.user.uid), newUser);
    setUser(newUser);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // Check if user exists in Firestore
    const { fs, db } = await loadFirestore();
    const userDoc = await fs.getDoc(fs.doc(db, 'users', firebaseUser.uid));
    
    if (!userDoc.exists()) {
      // Create new user document for first-time Google sign-in
      const newUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        role: 'staff', // Default role for Google sign-in users
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      await fs.setDoc(fs.doc(db, 'users', firebaseUser.uid), newUser);
      setUser(newUser);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
