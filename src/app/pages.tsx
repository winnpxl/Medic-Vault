// Route components: each reads URL params + shared shell state and renders an existing view.
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router';
import { useAppShell, filterPatients } from './AppShellContext';
import { paths } from './paths';
import { usePatientCacheEditor, usePatients, useStats } from '../hooks/usePatientData';
import { DashboardView } from '../components/dashboard/DashboardView';
import { PatientsView } from '../components/patients/PatientsView';
import { PatientProfile } from '../components/patients/PatientProfile';
import { DepartmentsView } from '../components/departments/DepartmentsView';
import { DepartmentDetailView } from '../components/departments/DepartmentDetailView';
import { FolderDetailView } from '../components/departments/FolderDetailView';
import { FoldersView, type PublicFolder } from '../components/folders/FoldersView';
import { PublicFolderDetailView } from '../components/folders/PublicFolderDetailView';
import { SettingsView } from '../components/settings/SettingsView';
import { ActivityAuditView } from '../components/activity/ActivityAuditView';
import { FileQuestion, FolderX, Loader2, UserX } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

/** Props every patient list view shares. */
function usePatientListProps(department?: string | null) {
  const shell = useAppShell();
  const navigate = useNavigate();
  const { patients } = usePatients();
  const cache = usePatientCacheEditor();
  return {
    patients: filterPatients(patients, { search: shell.searchQuery, status: shell.statusFilter, department }),
    totalPatients: patients.length,
    searchQuery: shell.searchQuery,
    onSearchChange: shell.setSearchQuery,
    onPatientSelect: (patient: { id: string }) => navigate(paths.patient(patient.id)),
    onShowToast: shell.showToast,
    onUpdatePatient: cache.replace,
    onArchivePatient: cache.remove,
    onDeletePatient: cache.remove,
    onOpenModal: shell.openPatientModal,
    onAddPatient: () => shell.openModal('add-patient'),
  };
}

export function DashboardPage() {
  const shell = useAppShell();
  const { stats } = useStats();
  return (
    <DashboardView
      {...usePatientListProps()}
      stats={stats}
      statusFilter={shell.statusFilter}
      onStatusFilterChange={shell.setStatusFilter}
    />
  );
}

export function PatientsPage() {
  return <PatientsView {...usePatientListProps()} />;
}

export function PatientProfilePage() {
  const { patientId = '' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { patients, isPending, isFetching } = usePatients();
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    if (isPending && isFetching) {
      return (
        <div className="flex-1 empty-state-page text-gray-400 text-sm gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading patient…
        </div>
      );
    }
    return (
      <EmptyState
        size="page"
        icon={UserX}
        title="Patient not found"
        description={`There's no patient with ID ${patientId}. They may have been archived or deleted.`}
        primaryAction={{ label: 'Back to patients', onClick: () => navigate(paths.patients()) }}
      />
    );
  }

  // Opened from a link or a refresh there's no in-app history to go back to.
  const goBack = () => (location.key === 'default' ? navigate(paths.patients()) : navigate(-1));
  return <PatientProfile patient={patient} onBack={goBack} />;
}

export function DepartmentsPage() {
  const shell = useAppShell();
  const navigate = useNavigate();
  return (
    <DepartmentsView
      onDepartmentSelect={(deptName) => navigate(paths.department(deptName))}
      onModalOpen={shell.openModal}
    />
  );
}

export function DepartmentDetailPage() {
  const { deptName = '' } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const listProps = usePatientListProps(deptName);
  return (
    <DepartmentDetailView
      {...listProps}
      departmentName={deptName}
      deptTab={searchParams.get('tab') ?? 'Patients'}
      onDeptTabChange={(tab) => setSearchParams(tab === 'Patients' ? {} : { tab }, { replace: true })}
      onBack={() => navigate(paths.departments())}
      onFolderSelect={(folderName) => navigate(paths.departmentFolder(deptName, folderName))}
    />
  );
}

export function DepartmentFolderPage() {
  const { deptName = '', folderName = '' } = useParams();
  const navigate = useNavigate();
  return (
    <FolderDetailView
      folderName={folderName}
      departmentName={deptName}
      onBack={() => navigate(`${paths.department(deptName)}?tab=Folders`)}
    />
  );
}

export function PublicFoldersPage() {
  const shell = useAppShell();
  const navigate = useNavigate();
  return (
    <FoldersView
      onFolderSelect={(folder) => navigate(paths.publicFolder(folder.id), { state: { folder } })}
      onShowToast={shell.showToast}
      onCreateFolder={() => shell.openModal('public-folder')}
    />
  );
}

/** Public folders still live in localStorage (Phase 6 moves them to the API). */
function findStoredPublicFolder(folderId: string): PublicFolder | undefined {
  try {
    const stored = JSON.parse(localStorage.getItem('publicFolders') ?? '[]') as PublicFolder[];
    return stored.find((f) => f.id === folderId);
  } catch {
    return undefined;
  }
}

export function PublicFolderPage() {
  const { folderId = '' } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const shell = useAppShell();
  const folder = (location.state as { folder?: PublicFolder } | null)?.folder ?? findStoredPublicFolder(folderId);

  if (!folder) {
    return (
      <EmptyState
        size="page"
        icon={FolderX}
        title="Folder not found"
        description="This public folder may have been deleted, or the link is out of date."
        primaryAction={{ label: 'Back to public folders', onClick: () => navigate(paths.publicFolders()) }}
      />
    );
  }
  return (
    <PublicFolderDetailView
      folder={folder}
      onBack={() => navigate(paths.publicFolders())}
      onUploadFile={() => shell.openModal('public-file')}
      onShowToast={shell.showToast}
    />
  );
}

export function ActivityPage() {
  return <ActivityAuditView />;
}

export function SettingsPage() {
  const shell = useAppShell();
  return <SettingsView onShowToast={shell.showToast} />;
}

export function PlaceholderPage() {
  const { section = '' } = useParams();
  const navigate = useNavigate();
  return (
    <EmptyState
      size="page"
      icon={FileQuestion}
      title="Page not found"
      description={<>There's nothing at <span className="font-mono text-gray-300">/app/{section}</span>. Check the link, or head back to the dashboard.</>}
      primaryAction={{ label: 'Go to dashboard', onClick: () => navigate(paths.dashboard()) }}
    />
  );
}
