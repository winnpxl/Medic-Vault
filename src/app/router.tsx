import { lazy, Suspense, type ComponentType, type ReactNode } from 'react';
import { createBrowserRouter, Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { hasPersistedSession } from '../lib/session';
import { paths } from './paths';

// Code splitting: the landing page, the login screen and the signed-in app each load
// as separate chunks, so visitors only download what they're about to see.
const LandingPage = lazy(() => import('../components/landing/LandingPage').then((m) => ({ default: m.LandingPage })));
const AuthScreen = lazy(() => import('../components/auth/AuthScreen').then((m) => ({ default: m.AuthScreen })));
const AppLayout = lazy(() => import('./AppLayout').then((m) => ({ default: m.AppLayout })));
const page = (name: keyof typeof import('./pages')) =>
  lazy(() => import('./pages').then((m) => ({ default: m[name] as ComponentType })));
const DashboardPage = page('DashboardPage');
const PatientsPage = page('PatientsPage');
const PatientProfilePage = page('PatientProfilePage');
const DepartmentsPage = page('DepartmentsPage');
const DepartmentDetailPage = page('DepartmentDetailPage');
const DepartmentFolderPage = page('DepartmentFolderPage');
const PublicFoldersPage = page('PublicFoldersPage');
const PublicFolderPage = page('PublicFolderPage');
const ActivityPage = page('ActivityPage');
const SettingsPage = page('SettingsPage');
const PlaceholderPage = page('PlaceholderPage');

function FullScreenLoader() {
  return (
    <div className="flex h-screen bg-navy-950 text-white items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-orange-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-orange-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

function Loadable({ children }: { children: ReactNode }) {
  return <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>;
}

/** Inside the app shell: keep the sidebar visible and show a small spinner for the page. */
function PageLoadable({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-orange-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

type FromState = { from?: string } | null;

/** /app/* requires a signed-in user; otherwise go to /login and come back afterwards. */
function RequireAuth() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <FullScreenLoader />;
  }
  if (!user) {
    const from = location.pathname + location.search;
    return <Navigate to="/login" replace state={{ from } satisfies FromState} />;
  }
  return <Outlet />;
}

function LandingRoute() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  // A returning user (saved Firebase login) goes straight to the app's loading
  // screen instead of seeing the landing page while the session is re-validated.
  if (user || (loading && hasPersistedSession())) {
    return <Navigate to={paths.dashboard()} replace />;
  }
  return (
    <Loadable>
      <LandingPage onEnter={() => navigate('/login')} />
    </Loadable>
  );
}

function LoginRoute() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (user) {
    const from = (location.state as FromState)?.from;
    return <Navigate to={from?.startsWith('/app') ? from : paths.dashboard()} replace />;
  }
  if (loading) {
    return <FullScreenLoader />;
  }
  return (
    <Loadable>
      <AuthScreen onBack={() => navigate('/')} />
    </Loadable>
  );
}

export function createAppRouter() {
  return createBrowserRouter([
    { path: '/', element: <LandingRoute /> },
    { path: '/login', element: <LoginRoute /> },
    {
      path: '/app',
      element: <RequireAuth />,
      children: [
        {
          element: (
            <Loadable>
              <AppLayout />
            </Loadable>
          ),
          children: [
            { index: true, element: <PageLoadable><DashboardPage /></PageLoadable> },
            { path: 'patients', element: <PageLoadable><PatientsPage /></PageLoadable> },
            { path: 'patients/:patientId', element: <PageLoadable><PatientProfilePage /></PageLoadable> },
            { path: 'departments', element: <PageLoadable><DepartmentsPage /></PageLoadable> },
            { path: 'departments/:deptName', element: <PageLoadable><DepartmentDetailPage /></PageLoadable> },
            { path: 'departments/:deptName/folders/:folderName', element: <PageLoadable><DepartmentFolderPage /></PageLoadable> },
            { path: 'folders', element: <PageLoadable><PublicFoldersPage /></PageLoadable> },
            { path: 'folders/:folderId', element: <PageLoadable><PublicFolderPage /></PageLoadable> },
            { path: 'activity', element: <PageLoadable><ActivityPage /></PageLoadable> },
            { path: 'settings', element: <PageLoadable><SettingsPage /></PageLoadable> },
            { path: ':section', element: <PageLoadable><PlaceholderPage /></PageLoadable> },
            { path: '*', element: <Navigate to={paths.dashboard()} replace /> },
          ],
        },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
