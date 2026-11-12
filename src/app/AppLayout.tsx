import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router';
import { Patient } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { usePatientCacheEditor } from '../hooks/usePatientData';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { MobileNav } from '../components/layout/MobileNav';
import { MobileMenu } from '../components/layout/MobileMenu';
import { MobileHeader } from '../components/layout/MobileHeader';
import { ToastContainer, ToastProps } from '../components/common/Toast';
import { CenterModal } from '../components/modals/CenterModal';
import { RightModal } from '../components/modals/RightModal';
import { FileUploadModalContent } from '../components/modals/FileUploadModal';
import { PublicFileUploadModal } from '../components/modals/PublicFileUploadModal';
import { CreateFolderModalContent } from '../components/modals/CreateFolderModal';
import { AddUserModalContent } from '../components/modals/AddUserModal';
import { CreateDepartmentModalContent } from '../components/modals/CreateDepartmentModal';
import { CreatePublicFolderModal } from '../components/modals/CreatePublicFolderModal';
import { AddPatientModal } from '../components/modals/AddPatientModal';
import { NotificationPanel } from '../components/modals/NotificationPanel';
import { NotificationSettingsModalContent } from '../components/modals/NotificationSettingsModal';
import { GrantEmergencyAccessModal } from '../components/modals/GrantEmergencyAccessModal';
import {
  EditPatientModal,
  CheckStatusModal,
  ArchivePatientModal,
  DeletePatientModal,
} from '../components/patients/PatientActionModals';
import { AppShell, AppShellContext, ToastType } from './AppShellContext';
import { pathForTab, tabForPath } from './paths';

/** Signed-in chrome: sidebar, headers, mobile nav, toasts and modals around the routed page. */
export function AppLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const deptMatch = useMatch('/app/departments/:deptName/*');
  const selectedDept = deptMatch?.params.deptName ? decodeURIComponent(deptMatch.params.deptName) : null;
  const patientCache = usePatientCacheEditor();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalPatient, setModalPatient] = useState<Patient | null>(null);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, type, message, onClose: removeToast }]);
    },
    [removeToast],
  );

  const openPatientModal = useCallback((patient: Patient, modal: string) => {
    setModalPatient(patient);
    setActiveModal(modal);
  }, []);

  const closeModal = () => {
    setModalPatient(null);
    setActiveModal(null);
  };

  const shell = useMemo<AppShell>(
    () => ({
      searchQuery,
      setSearchQuery,
      statusFilter,
      setStatusFilter,
      showToast,
      openModal: setActiveModal,
      openPatientModal,
    }),
    [searchQuery, statusFilter, showToast, openPatientModal],
  );

  const goToTab = (tab: string) => navigate(pathForTab(tab));

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppShellContext.Provider value={shell}>
      <div className="flex h-screen bg-navy-950 text-white overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            activeTab={tabForPath(location.pathname)}
            selectedDept={selectedDept}
            onTabChange={goToTab}
            onModalOpen={setActiveModal}
            onLogout={handleLogout}
          />
        </div>

        <main className="flex-1 flex flex-col overflow-hidden">
          <MobileHeader
            onNotificationsOpen={() => setIsNotificationsOpen(true)}
            onSearchOpen={() => setSearchQuery('')}
          />

          <div className="hidden lg:block">
            <Header
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onNotificationsOpen={() => setIsNotificationsOpen(true)}
              onEmergencyAccess={() => setActiveModal('emergency-access')}
            />
          </div>

          <div className="flex-1 overflow-y-auto pb-16 lg:pb-0 overscroll-contain">
            <Outlet />
          </div>
        </main>

        <MobileNav
          activeTab={tabForPath(location.pathname)}
          onTabChange={goToTab}
          onMenuOpen={() => setIsMobileMenuOpen(true)}
        />

        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
              onModalOpen={(modal) => {
                setActiveModal(modal);
                setIsMobileMenuOpen(false);
              }}
              onNavigate={goToTab}
            />
          )}
        </AnimatePresence>

        <ToastContainer toasts={toasts} onClose={removeToast} />

        <AnimatePresence>
          {isNotificationsOpen && (
            <NotificationPanel
              onClose={() => setIsNotificationsOpen(false)}
              onOpenSettings={() => setActiveModal('notification-settings')}
            />
          )}
          {activeModal === 'public-file' && (
            <CenterModal title="Upload File to Public Folder" onClose={closeModal}>
              <PublicFileUploadModal
                onClose={closeModal}
                onUpload={(fileData) => {
                  showToast('success', `File "${fileData.title || fileData.file.name}" uploaded successfully`);
                }}
              />
            </CenterModal>
          )}
          {activeModal === 'file' && (
            <CenterModal title="Upload New Medical File" onClose={closeModal}>
              <FileUploadModalContent
                onClose={closeModal}
                onUpload={(fileData) => {
                  showToast('success', `File "${fileData.title || fileData.file.name}" uploaded successfully`);
                }}
              />
            </CenterModal>
          )}
          {activeModal === 'folder' && (
            <CenterModal title="Create New Folder" onClose={closeModal}>
              <CreateFolderModalContent
                onClose={closeModal}
                onCreate={(folderData) => {
                  showToast('success', `Folder "${folderData.name}" created in ${folderData.department}`);
                  closeModal();
                }}
              />
            </CenterModal>
          )}
          {activeModal === 'user' && (
            <CenterModal title="Add New User" onClose={closeModal}>
              <AddUserModalContent />
            </CenterModal>
          )}
          {activeModal === 'department' && (
            <CenterModal title="Create New Department" onClose={closeModal}>
              <CreateDepartmentModalContent />
            </CenterModal>
          )}
          {activeModal === 'public-folder' && (
            <CenterModal title="Create Shareable Folder" onClose={closeModal}>
              <CreatePublicFolderModal
                onClose={closeModal}
                onCreate={(folder) => {
                  showToast('success', `Folder "${folder.name}" created successfully`);
                  closeModal();
                }}
              />
            </CenterModal>
          )}
          {activeModal === 'notification-settings' && (
            <RightModal title="Notification Settings" onClose={closeModal}>
              <NotificationSettingsModalContent />
            </RightModal>
          )}
          {modalPatient && activeModal === 'edit-patient' && (
            <CenterModal title="Edit Patient Record" onClose={closeModal}>
              <EditPatientModal
                patient={modalPatient}
                onClose={closeModal}
                onSave={(updated) => {
                  patientCache.replace(updated);
                  showToast('success', `Patient ${updated.name} updated successfully`);
                  closeModal();
                }}
              />
            </CenterModal>
          )}
          {modalPatient && activeModal === 'status-patient' && (
            <CenterModal title="Check Patient Status" onClose={closeModal}>
              <CheckStatusModal patient={modalPatient} onClose={closeModal} />
            </CenterModal>
          )}
          {modalPatient && activeModal === 'archive-patient' && (
            <CenterModal title="Archive Patient Record" onClose={closeModal}>
              <ArchivePatientModal
                patient={modalPatient}
                onClose={closeModal}
                onConfirm={() => {
                  patientCache.remove(modalPatient.id);
                  showToast('success', `Patient ${modalPatient.name} archived successfully`);
                  closeModal();
                }}
              />
            </CenterModal>
          )}
          {modalPatient && activeModal === 'delete-patient' && (
            <CenterModal title="Delete Patient Record" onClose={closeModal}>
              <DeletePatientModal
                patient={modalPatient}
                onClose={closeModal}
                onConfirm={() => {
                  patientCache.remove(modalPatient.id);
                  showToast('success', `Patient ${modalPatient.name} deleted permanently`);
                  closeModal();
                }}
              />
            </CenterModal>
          )}
          {activeModal === 'emergency-access' && (
            <CenterModal title="Grant Emergency Access" onClose={closeModal}>
              <GrantEmergencyAccessModal
                onClose={closeModal}
                onGrant={(data) => {
                  showToast('success', `Emergency access granted to ${data.recipient} for ${data.duration} hour(s)`);
                  closeModal();
                }}
              />
            </CenterModal>
          )}
          {activeModal === 'add-patient' && (
            <CenterModal title="Add New Patient" onClose={closeModal}>
              <AddPatientModal
                onClose={closeModal}
                onAdd={(patient) => {
                  patientCache.add(patient);
                  showToast('success', `Patient ${patient.name} added successfully`);
                  closeModal();
                }}
              />
            </CenterModal>
          )}
        </AnimatePresence>
      </div>
    </AppShellContext.Provider>
  );
}
