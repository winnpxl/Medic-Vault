import { createBrowserRouter, Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { LandingPage } from '../components/landing/LandingPage';
import { AuthScreen } from '../components/auth/AuthScreen';
import { AppLayout } from './AppLayout';
import { paths } from './paths';
import {
  ActivityPage,
  DashboardPage,
  DepartmentDetailPage,
  DepartmentFolderPage,
  DepartmentsPage,
  PatientProfilePage,
  PatientsPage,
  PlaceholderPage,
  PublicFolderPage,
  PublicFoldersPage,
  SettingsPage,
} from './pages';

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
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) {
    return <Navigate to={paths.dashboard()} replace />;
  }
  return <LandingPage onEnter={() => navigate('/login')} />;
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
  return <AuthScreen onBack={() => navigate('/')} />;
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
          element: <AppLayout />,
          children: [
            { index: true, element: <DashboardPage /> },
            { path: 'patients', element: <PatientsPage /> },
            { path: 'patients/:patientId', element: <PatientProfilePage /> },
            { path: 'departments', element: <DepartmentsPage /> },
            { path: 'departments/:deptName', element: <DepartmentDetailPage /> },
            { path: 'departments/:deptName/folders/:folderName', element: <DepartmentFolderPage /> },
            { path: 'folders', element: <PublicFoldersPage /> },
            { path: 'folders/:folderId', element: <PublicFolderPage /> },
            { path: 'activity', element: <ActivityPage /> },
            { path: 'settings', element: <SettingsPage /> },
            { path: ':section', element: <PlaceholderPage /> },
            { path: '*', element: <Navigate to={paths.dashboard()} replace /> },
          ],
        },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
