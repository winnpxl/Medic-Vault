import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

interface AuthScreenProps {
  onBack?: () => void;
}

export function AuthScreen({ onBack }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<UserRole>('staff');
  const [showPassword, setShowPassword] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { signIn, signUp, resetPassword } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (!displayName.trim()) {
          setError('Please enter your full name');
          setLoading(false);
          return;
        }
        await signUp(email, password, displayName, role);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setError('');
      alert('Password reset email sent! Check your inbox.');
      setShowForgotPassword(false);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-navy-900 to-navy-950 p-12 flex-col justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
        )}

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-primary rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Medic Vault</h1>
          </div>

          <div className="space-y-4 max-w-md">
            <p className="text-lg text-gray-300">
              Medic Vault is your complete people platform designed to simplify HR and enhance
              productivity.
            </p>
            <p className="text-gray-400">
              It supports growing teams from onboarding to payroll. With Medic Vault, you can lead
              more efficiently.
            </p>
          </div>
        </div>

        <div className="flex gap-6 text-sm text-gray-500">
          <button className="hover:text-white transition-colors">About</button>
          <button className="hover:text-white transition-colors">FAQ</button>
          <button className="hover:text-white transition-colors">Support</button>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">
              {showForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Register or login'}
            </h2>
            <p className="text-gray-400">
              {showForgotPassword
                ? 'Enter your email to receive a password reset link'
                : isLogin
                ? 'Sign in to access your dashboard'
                : 'To keep things easy, just log in with your work email or hit that button to continue!'}
            </p>
          </div>

          {!showForgotPassword && (
            <>
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-3 px-4 flex items-center justify-center gap-3 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </button>

                <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-3 px-4 flex items-center justify-center gap-3 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  Sign in with Apple
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-navy-950 text-gray-500">or</span>
                </div>
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !showForgotPassword && (
              <div className="space-y-1.5">
                <label className="text-sm text-gray-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    className="input-field pl-11"
                    placeholder="John Doe"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm text-gray-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  className="input-field pl-11"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {!showForgotPassword && (
              <div className="space-y-1.5">
                <label className="text-sm text-gray-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-field pl-11 pr-11"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {!isLogin && !showForgotPassword && (
              <div className="space-y-1.5">
                <label className="text-sm text-gray-400">Role</label>
                <select
                  className="input-field"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                >
                  <option value="staff">Staff</option>
                  <option value="nurse">Nurse</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            {isLogin && !showForgotPassword && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-orange-primary hover:text-orange-600 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {!isLogin && !showForgotPassword && (
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="updates"
                  checked={receiveUpdates}
                  onChange={(e) => setReceiveUpdates(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-navy-900 text-orange-primary focus:ring-orange-primary"
                />
                <label htmlFor="updates" className="text-sm text-gray-400">
                  Receive feature updates and hiring tips. Get occasional insights, new feature releases,
                  and expert hiring tips in your inbox.
                </label>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type={showForgotPassword ? 'button' : 'submit'}
              onClick={showForgotPassword ? handleForgotPassword : undefined}
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : showForgotPassword ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-400">
            {showForgotPassword ? (
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-orange-primary hover:text-orange-600 transition-colors"
              >
                Back to Sign In
              </button>
            ) : (
              <>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="text-orange-primary hover:text-orange-600 transition-colors font-medium"
                >
                  {isLogin ? 'Register Now' : 'Sign In'}
                </button>
              </>
            )}
          </div>

          <p className="text-center text-xs text-gray-600">
            Medic Vault - Designed by Oluwaseyi Akin-Soyinu - All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
