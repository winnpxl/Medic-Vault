import React from 'react';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  Users,
  FileText,
  BarChart3,
  Search,
  Plus,
  LayoutDashboard,
  FolderTree,
  MoreHorizontal,
} from 'lucide-react';
import { Patient } from '../../types';
import { DEPARTMENTS } from '../../constants';
import { StatCard } from '../common/StatCard';
import { PatientTable } from '../patients/PatientTable';

interface DepartmentDetailViewProps {
  departmentName: string;
  deptTab: string;
  patients: Patient[];
  totalPatients: number;
  searchQuery: string;
  onBack: () => void;
  onDeptTabChange: (tab: string) => void;
  onSearchChange: (query: string) => void;
  onPatientSelect: (patient: Patient) => void;
  onFolderSelect: (folderName: string) => void;
  onShowToast?: (type: 'success' | 'error' | 'info', message: string) => void;
  onUpdatePatient?: (patient: Patient) => void;
  onArchivePatient?: (patientId: string) => void;
  onDeletePatient?: (patientId: string) => void;
  onOpenModal?: (patient: Patient, modalType: string) => void;
}

export function DepartmentDetailView({
  departmentName,
  deptTab,
  patients,
  totalPatients,
  searchQuery,
  onBack,
  onDeptTabChange,
  onSearchChange,
  onPatientSelect,
  onFolderSelect,
  onShowToast,
  onUpdatePatient,
  onArchivePatient,
  onDeletePatient,
  onOpenModal,
}: DepartmentDetailViewProps) {
  const dept = DEPARTMENTS.find((d) => d.name === departmentName);

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
      <div className="space-y-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-500 hover:text-white text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Departments
        </button>
        <h2 className="text-3xl font-bold">{departmentName}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Patients"
          value={dept?.patients || 0}
          icon={Users}
          iconColor="text-blue-500"
        />
        <StatCard title="Total Files" value={73} icon={FileText} iconColor="text-orange-500" />
        <StatCard
          title="Department Activities"
          value={89}
          icon={BarChart3}
          iconColor="text-green-500"
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-6 border-b border-white/5">
          {['Patients', 'Medical Categories', 'Recent Activity', 'Files'].map((tab) => (
            <button
              key={tab}
              onClick={() => onDeptTabChange(tab)}
              className={`pb-4 text-sm font-medium transition-colors relative ${
                deptTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
              {deptTab === tab && (
                <motion.div
                  layoutId="activeDeptTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-primary"
                />
              )}
            </button>
          ))}
        </div>

        {deptTab === 'Patients' ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-sm relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Filter patients..."
                  className="w-full bg-navy-900 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>

            <PatientTable
              patients={patients}
              totalPatients={totalPatients}
              onPatientSelect={onPatientSelect}
              onShowToast={onShowToast || (() => {})}
              onUpdatePatient={onUpdatePatient || (() => {})}
              onArchivePatient={onArchivePatient || (() => {})}
              onDeletePatient={onDeletePatient || (() => {})}
              onOpenModal={onOpenModal || (() => {})}
            />
          </>
        ) : deptTab === 'Files' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Patient Records', count: 45, size: '1.2 GB' },
              { name: 'Lab Reports', count: 128, size: '850 MB' },
              { name: 'Imaging Data', count: 32, size: '4.5 GB' },
              { name: 'Consultation Notes', count: 210, size: '120 MB' },
            ].map((folder, i) => (
              <div
                key={i}
                onClick={() => onFolderSelect(folder.name)}
                className="glass-card p-6 hover:bg-white/5 transition-colors cursor-pointer group light-mode:hover:bg-gray-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-primary/10 rounded-xl flex items-center justify-center text-orange-primary">
                    <FolderTree className="w-6 h-6" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-1 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all light-mode:hover:text-gray-900"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="font-bold mb-1">{folder.name}</h4>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{folder.count} items</span>
                  <span className="w-1 h-1 bg-gray-700 rounded-full light-mode:bg-gray-400"></span>
                  <span>{folder.size}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-500">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-lg">No data available</h4>
              <p className="text-gray-500 text-sm">
                This section is currently being updated with real-time department data.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
