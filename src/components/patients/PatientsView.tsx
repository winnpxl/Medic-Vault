import { Search, Filter } from 'lucide-react';
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
}: PatientsViewProps) {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Patients Registry</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search all patients..."
              className="bg-navy-900 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-primary w-64"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <button className="btn-secondary">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <PatientTable
        patients={patients}
        totalPatients={totalPatients}
        onPatientSelect={onPatientSelect}
        onShowToast={onShowToast}
        onUpdatePatient={onUpdatePatient}
        onArchivePatient={onArchivePatient}
        onDeletePatient={onDeletePatient}
      />
    </div>
  );
}
