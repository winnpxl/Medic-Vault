import React, { useState, useEffect } from 'react';
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
import { FoldersView } from './components/folders/FoldersView';
import { DefaultView } from './components/common/DefaultView';
import { CenterModal } from './components/modals/CenterModal';
import { RightModal } from './components/modals/RightModal';
import { FileUploadModalContent } from './components/modals/FileUploadModal';
import { CreateFolderModalContent } from './components/modals/CreateFolderModal';
import { AddUserModalContent } from './components/modals/AddUserModal';
import { CreateDepartmentModalContent } from './components/modals/CreateDepartmentModal';
import { NotificationPanel } from './components/modals/NotificationPanel';
import { NotificationSettingsModalContent } from './components/modals/NotificationSettingsModal';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deptTab, setDeptTab] = useState('Patients');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetchPatients().then(setPatients);
    fetchStats().then(setStats);
  }, []);

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
    setSelectedPatient(null);
  };

  const renderContent = () => {
    if (selectedPatient) {
      return <PatientProfile patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
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
        return <FoldersView />;
      default:
        return <DefaultView activeTab={activeTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-navy-950 text-white overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        selectedDept={selectedDept}
        isDarkMode={isDarkMode}
        onTabChange={handleTabChange}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
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
        {activeModal === 'notification-settings' && (
          <RightModal title="Notification Settings" onClose={() => setActiveModal(null)}>
            <NotificationSettingsModalContent />
          </RightModal>
        )}
      </AnimatePresence>
    </div>
  );
}
