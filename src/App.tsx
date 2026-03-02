import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Patient, Stats } from './types';
import { fetchPatients, fetchStats } from './api/patients';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { PatientsView } from './components/patients/PatientsView';
import { PatientProfile } from './components/patients/PatientProfile';
import { DepartmentsView } from './components/departments/DepartmentsView';
import { DepartmentDetailView } from './components/departments/DepartmentDetailView';
import { FolderDetailView } from './components/departments/FolderDetailView';
import { FoldersView } from './components/folders/FoldersView';
import { PublicFolderDetailView } from './components/folders/PublicFolderDetailView';
import { DefaultView } from './components/common/DefaultView';
import { ToastContainer, ToastProps } from './components/common/Toast';
import { CenterModal } from './components/modals/CenterModal';
import { RightModal } from './components/modals/RightModal';
import { FileUploadModalContent } from './components/modals/FileUploadModal';
import { CreateFolderModalContent } from './components/modals/CreateFolderModal';
import { AddUserModalContent } from './components/modals/AddUserModal';
import { CreateDepartmentModalContent } from './components/modals/CreateDepartmentModal';
import { CreatePublicFolderModal } from './components/modals/CreatePublicFolderModal';
import { NotificationPanel } from './components/modals/NotificationPanel';
import { NotificationSettingsModalContent } from './components/modals/NotificationSettingsModal';
import { EditPatientModal, CheckStatusModal, ArchivePatientModal, DeletePatientModal } from './components/patients/PatientActionModals';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deptTab, setDeptTab] = useState('Patients');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedPublicFolder, setSelectedPublicFolder] = useState<{ name: string; files: number; expiry: string; views: number } | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [modalPatient, setModalPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients().then(setPatients);
    fetchStats().then(setStats);
  }, []);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message, onClose: removeToast }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
  };

  const handleArchivePatient = (patientId: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== patientId));
  };

  const handleDeletePatient = (patientId: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== patientId));
  };

  const openPatientModal = (patient: Patient, modalType: string) => {
    setModalPatient(patient);
    setActiveModal(modalType);
  };

  const closePatientModal = () => {
    setModalPatient(null);
    setActiveModal(null);
  };

  const handleEditPatient = (updatedPatient: Patient) => {
    handleUpdatePatient(updatedPatient);
    showToast('success', `Patient ${updatedPatient.name} updated successfully`);
    closePatientModal();
  };

  const handleArchivePatientConfirm = () => {
    if (modalPatient) {
      handleArchivePatient(modalPatient.id);
      showToast('success', `Patient ${modalPatient.name} archived successfully`);
      closePatientModal();
    }
  };

  const handleDeletePatientConfirm = () => {
    if (modalPatient) {
      handleDeletePatient(modalPatient.id);
      showToast('success', `Patient ${modalPatient.name} deleted permanently`);
      closePatientModal();
    }
  };

  const filteredPatients = patients.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query) ||
      p.age.toString().includes(query) ||
      p.status.toLowerCase().includes(query) ||
      p.department.toLowerCase().includes(query) ||
      p.lastUpdated.toLowerCase().includes(query);
    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    const matchesDept = selectedDept ? p.department === selectedDept : true;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedDept(null);
    setSelectedFolder(null);
    setSelectedPatient(null);
    setSelectedPublicFolder(null);
  };

  const renderContent = () => {
    if (selectedPatient) {
      return <PatientProfile patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
    }

    if (selectedPublicFolder) {
      return (
        <PublicFolderDetailView
          folder={selectedPublicFolder}
          onBack={() => setSelectedPublicFolder(null)}
          onUploadFile={() => setActiveModal('file')}
          onShowToast={showToast}
        />
      );
    }

    if (selectedFolder && selectedDept) {
      return (
        <FolderDetailView
          folderName={selectedFolder}
          departmentName={selectedDept}
          onBack={() => setSelectedFolder(null)}
        />
      );
    }

    if (selectedDept) {
      return (
        <DepartmentDetailView
          departmentName={selectedDept}
          deptTab={deptTab}
          patients={filteredPatients}
          totalPatients={patients.length}
          searchQuery={searchQuery}
          onBack={() => setSelectedDept(null)}
          onDeptTabChange={setDeptTab}
          onSearchChange={setSearchQuery}
          onPatientSelect={setSelectedPatient}
          onFolderSelect={setSelectedFolder}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            stats={stats}
            patients={filteredPatients}
            totalPatients={patients.length}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            onSearchChange={setSearchQuery}
            onStatusFilterChange={setStatusFilter}
            onPatientSelect={setSelectedPatient}
            onShowToast={showToast}
            onUpdatePatient={handleUpdatePatient}
            onArchivePatient={handleArchivePatient}
            onDeletePatient={handleDeletePatient}
            onOpenModal={openPatientModal}
          />
        );
      case 'patients':
        return (
          <PatientsView
            patients={filteredPatients}
            totalPatients={patients.length}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onPatientSelect={setSelectedPatient}
            onShowToast={showToast}
            onUpdatePatient={handleUpdatePatient}
            onArchivePatient={handleArchivePatient}
            onDeletePatient={handleDeletePatient}
            onOpenModal={openPatientModal}
          />
        );
      case 'departments':
        return (
          <DepartmentsView
            onDepartmentSelect={setSelectedDept}
            onModalOpen={setActiveModal}
          />
        );
      case 'folders':
        return (
          <FoldersView
            onFolderSelect={setSelectedPublicFolder}
            onShowToast={showToast}
          />
        );
      default:
        return <DefaultView activeTab={activeTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-navy-950 text-white overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        selectedDept={selectedDept}
        onTabChange={handleTabChange}
        onModalOpen={setActiveModal}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNotificationsOpen={() => setIsNotificationsOpen(true)}
        />

        {renderContent()}
      </main>

      <ToastContainer toasts={toasts} onClose={removeToast} />

      <AnimatePresence>
        {isNotificationsOpen && (
          <NotificationPanel
            onClose={() => setIsNotificationsOpen(false)}
            onOpenSettings={() => setActiveModal('notification-settings')}
          />
        )}
        {activeModal === 'file' && (
          <CenterModal title="Upload New Medical File" onClose={() => setActiveModal(null)}>
            <FileUploadModalContent />
          </CenterModal>
        )}
        {activeModal === 'folder' && (
          <CenterModal title="Create New Folder" onClose={() => setActiveModal(null)}>
            <CreateFolderModalContent />
          </CenterModal>
        )}
        {activeModal === 'user' && (
          <CenterModal title="Add New User" onClose={() => setActiveModal(null)}>
            <AddUserModalContent />
          </CenterModal>
        )}
        {activeModal === 'department' && (
          <CenterModal title="Create New Department" onClose={() => setActiveModal(null)}>
            <CreateDepartmentModalContent />
          </CenterModal>
        )}
        {activeModal === 'public-folder' && (
          <CenterModal title="Create Shareable Folder" onClose={() => setActiveModal(null)}>
            <CreatePublicFolderModal
              onClose={() => setActiveModal(null)}
              onCreate={(folder) => {
                showToast('success', `Folder "${folder.name}" created successfully`);
                setActiveModal(null);
              }}
            />
          </CenterModal>
        )}
        {activeModal === 'notification-settings' && (
          <RightModal title="Notification Settings" onClose={() => setActiveModal(null)}>
            <NotificationSettingsModalContent />
          </RightModal>
        )}
        {modalPatient && activeModal === 'edit-patient' && (
          <CenterModal title="Edit Patient Record" onClose={closePatientModal}>
            <EditPatientModal
              patient={modalPatient}
              onClose={closePatientModal}
              onSave={handleEditPatient}
            />
          </CenterModal>
        )}
        {modalPatient && activeModal === 'status-patient' && (
          <CenterModal title="Check Patient Status" onClose={closePatientModal}>
            <CheckStatusModal patient={modalPatient} onClose={closePatientModal} />
          </CenterModal>
        )}
        {modalPatient && activeModal === 'archive-patient' && (
          <CenterModal title="Archive Patient Record" onClose={closePatientModal}>
            <ArchivePatientModal
              patient={modalPatient}
              onClose={closePatientModal}
              onConfirm={handleArchivePatientConfirm}
            />
          </CenterModal>
        )}
        {modalPatient && activeModal === 'delete-patient' && (
          <CenterModal title="Delete Patient Record" onClose={closePatientModal}>
            <DeletePatientModal
              patient={modalPatient}
              onClose={closePatientModal}
              onConfirm={handleDeletePatientConfirm}
            />
          </CenterModal>
        )}
      </AnimatePresence>
    </div>
  );
}
