import { useState } from 'react';
import { Plus, UserPlus } from 'lucide-react';
import { Patient } from '../../types';
import { PatientTable } from './PatientTable';

interface PatientsViewProps {
  patients: Patient[];
  totalPatients: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPatientSelect: (patient: Patient) => void;
  onShowToast: (type: 'success' | 'error' | 'info', message: string) => void;
  onUpdatePatient: (patient: Patient) => void;
  onArchivePatient: (patientId: string) => void;
  onDeletePatient: (patientId: string) => void;
  onOpenModal: (patient: Patient, modalType: string) => void;
}

export function PatientsView({
  patients,
  totalPatients,
  searchQuery,
  onSearchChange,
  onPatientSelect,
  onShowToast,
  onUpdatePatient,
  onArchivePatient,
  onDeletePatient,
  onOpenModal,
}: PatientsViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const itemsPerPage = 15;

  // Apply filters
  const filteredPatients = patients.filter((p) => {
    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    const matchesDept = departmentFilter ? p.department === departmentFilter : true;
    return matchesStatus && matchesDept;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <h2 className="text-xl lg:text-2xl font-bold">Patients Registry</h2>
        <button 
          className="btn-primary flex items-center gap-2 justify-center lg:justify-start"
          onClick={() => onShowToast('info', 'Add New Patient feature coming soon')}
        >
          <UserPlus className="w-4 h-4" /> Add New Patient
        </button>
      </div>

      <section className="space-y-4">
        <div className="flex flex-row lg:flex-row items-stretch lg:items-center gap-2">
          <div className="relative flex-1"> 
            <input
              type="text"
              placeholder="Filter patients..."
              className="bg-navy-900 border border-white/5 rounded-lg py-1.5 pl-3 pr-8 text-sm focus:outline-none w-full"
              style={{ paddingRight: '24px', paddingBottom: '11px', paddingTop: '11px' }}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0" style={{overflow: 'hidden'}}>
            <div className="relative group flex-shrink-0">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                <Plus className="w-4 h-4" /> Status
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-navy-900 border border-white/5 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
                {['Discharged', 'ICU', 'Admitted', 'Outpatient'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(statusFilter === status ? null : status);
                      setCurrentPage(1);
                    }}
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
          </div>
        </div>

        <PatientTable
          patients={paginatedPatients}
          totalPatients={filteredPatients.length}
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
