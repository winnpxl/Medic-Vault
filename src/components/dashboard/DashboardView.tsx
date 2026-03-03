import { useState } from 'react';
import {
  Users,
  Clock,
  ExternalLink,
  AlertTriangle,
  Plus,
  LayoutDashboard,
} from 'lucide-react';
import { Patient, Stats } from '../../types';
import { StatCard } from '../common/StatCard';
import { PatientTable } from '../patients/PatientTable';

interface DashboardViewProps {
  stats: Stats | null;
  patients: Patient[];
  totalPatients: number;
  searchQuery: string;
  statusFilter: string | null;
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status: string | null) => void;
  onPatientSelect: (patient: Patient) => void;
  onShowToast: (type: 'success' | 'error' | 'info', message: string) => void;
  onUpdatePatient: (patient: Patient) => void;
  onArchivePatient: (patientId: string) => void;
  onDeletePatient: (patientId: string) => void;
  onOpenModal: (patient: Patient, modalType: string) => void;
}

export function DashboardView({
  stats,
  patients,
  totalPatients,
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onPatientSelect,
  onShowToast,
  onUpdatePatient,
  onArchivePatient,
  onDeletePatient,
  onOpenModal,
}: DashboardViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate pagination
  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPatients = patients.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-bold">Dashboard</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <StatCard
          title="Recently Accessed Patients"
          value={stats?.recentlyAccessed || 0}
          subValue="+12 in the last hour"
          icon={Users}
          iconColor="text-blue-500"
        />
        <StatCard
          title="Pending File Reviews"
          value={stats?.pendingReviews || 0}
          subValue="3 require urgent attention"
          icon={Clock}
          iconColor="text-orange-500"
        />
        <StatCard
          title="External Shares Active"
          value={stats?.externalShares || 0}
          subValue="All compliant"
          icon={ExternalLink}
          iconColor="text-green-500"
        />
        <StatCard
          title="Access Alerts"
          value={stats?.accessAlerts || 0}
          subValue="1 unauthorized attempt blocked"
          icon={AlertTriangle}
          iconColor="text-red-500"
        />
      </div>

      <section className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <h3 className="text-base lg:text-lg font-semibold">Patient Access</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <div className="relative flex-shrink-0">
              <input
                type="text"
                placeholder="Filter patients..."
                className="bg-navy-900 border border-white/5 rounded-lg py-1.5 pl-3 pr-8 text-sm focus:outline-none w-full lg:w-auto"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <div className="relative group flex-shrink-0">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                <Plus className="w-4 h-4" /> Status
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-navy-900 border border-white/5 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
                {['Discharged', 'ICU', 'Admitted', 'Outpatient'].map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      onStatusFilterChange(statusFilter === status ? null : status)
                    }
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      statusFilter === status
                        ? 'bg-orange-primary/10 text-orange-primary'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap">
              <Plus className="w-4 h-4" /> Department
            </button>
            <div className="hidden lg:block h-6 w-px bg-white/5 mx-2"></div>
            <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap">
              <LayoutDashboard className="w-4 h-4" /> View
            </button>
          </div>
        </div>

        <PatientTable
          patients={paginatedPatients}
          totalPatients={totalPatients}
          onPatientSelect={onPatientSelect}
          onShowToast={onShowToast}
          onUpdatePatient={onUpdatePatient}
          onArchivePatient={onArchivePatient}
          onDeletePatient={onDeletePatient}
          onOpenModal={onOpenModal}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </section>
    </div>
  );
}
