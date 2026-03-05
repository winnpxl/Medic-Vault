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
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
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
          className="hidden lg:flex btn-primary items-center gap-2 justify-center lg:justify-start"
          onClick={() => onShowToast('info', 'Add New Patient feature coming soon')}
        >
          <UserPlus className="w-4 h-4" /> Add New Patient
        </button>
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => onShowToast('info', 'Add New Patient feature coming soon')}
        className="lg:hidden fixed bottom-20 right-4 z-[60] w-14 h-14 bg-orange-primary rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
      >
        <UserPlus className="w-6 h-6 text-white" />
      </button>

      <section className="space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Filter patients..."
              className="bg-navy-900 border border-white/5 rounded-lg px-3 text-sm focus:outline-none w-full h-[38px]"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            {/* Status Dropdown */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => {
                  setIsStatusOpen(!isStatusOpen);
                  setIsDepartmentOpen(false);
                }}
                className="flex items-center gap-2 px-3 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap h-[38px]"
              >
                <Plus className="w-4 h-4" /> Status
              </button>
              {isStatusOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsStatusOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-48 bg-navy-900 border border-white/5 rounded-lg shadow-xl z-50 p-2">
                    {['Discharged', 'ICU', 'Admitted', 'Outpatient'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(statusFilter === status ? null : status);
                          setCurrentPage(1);
                          setIsStatusOpen(false);
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
                </>
              )}
            </div>

            {/* Department Dropdown */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => {
                  setIsDepartmentOpen(!isDepartmentOpen);
                  setIsStatusOpen(false);
                }}
                className="flex items-center gap-2 px-3 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap h-[38px]"
              >
                <Plus className="w-4 h-4" /> Department
              </button>
              {isDepartmentOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDepartmentOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-48 bg-navy-900 border border-white/5 rounded-lg shadow-xl z-50 p-2">
                    {['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Emergency'].map((dept) => (
                      <button
                        key={dept}
                        onClick={() => {
                          setDepartmentFilter(departmentFilter === dept ? null : dept);
                          setCurrentPage(1);
                          setIsDepartmentOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          departmentFilter === dept
                            ? 'bg-orange-primary/10 text-orange-primary'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </>
              )}
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
