import { useState } from 'react';
import {
  ArrowUpDown,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Patient } from '../../types';
import { STATUS_COLORS } from '../../constants';
import { PatientActionsDropdown } from './PatientActionsDropdown';

interface PatientTableProps {
  patients: Patient[];
  totalPatients: number;
  onPatientSelect: (patient: Patient) => void;
  onShowToast: (type: 'success' | 'error' | 'info', message: string) => void;
  onUpdatePatient: (patient: Patient) => void;
  onArchivePatient: (patientId: string) => void;
  onDeletePatient: (patientId: string) => void;
  onOpenModal: (patient: Patient, modalType: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

type SortField = 'age' | 'lastUpdated' | null;
type SortDirection = 'asc' | 'desc';

export function PatientTable({ 
  patients, 
  totalPatients, 
  onPatientSelect,
  onOpenModal,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: PatientTableProps) {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPatients = [...patients].sort((a, b) => {
    if (!sortField) return 0;

    let comparison = 0;
    if (sortField === 'age') {
      comparison = a.age - b.age;
    } else if (sortField === 'lastUpdated') {
      comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-3 h-3" />
    ) : (
      <ArrowDown className="w-3 h-3" />
    );
  };

  return (
    <div className="glass-card overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/5 text-gray-500">
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Patient ID</th>
            <th className="px-6 py-4 font-medium">
              <div 
                className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('age')}
              >
                Age <SortIcon field="age" />
              </div>
            </th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Files</th>
            <th className="px-6 py-4 font-medium">Department</th>
            <th className="px-6 py-4 font-medium">
              <div 
                className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('lastUpdated')}
              >
                Last Updated <SortIcon field="lastUpdated" />
              </div>
            </th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {sortedPatients.map((patient) => (
            <tr
              key={patient.id}
              className="hover:bg-white/5 transition-colors group cursor-pointer"
              onClick={() => onPatientSelect(patient)}
            >
              <td className="px-6 py-4 font-medium">{patient.name}</td>
              <td className="px-6 py-4 text-gray-400 font-mono">{patient.id}</td>
              <td className="px-6 py-4">{patient.age}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    STATUS_COLORS[patient.status] ||
                    'bg-gray-500/10 text-gray-500 border-gray-500/20'
                  }`}
                >
                  {patient.status}
                </span>
              </td>
              <td className="px-6 py-4">{patient.files} files</td>
              <td className="px-6 py-4">{patient.department}</td>
              <td className="px-6 py-4 text-gray-400">{patient.lastUpdated}</td>
              <td className="px-6 py-4 text-right">
                <PatientActionsDropdown 
                  patient={patient} 
                  onSelect={onPatientSelect}
                  onEdit={() => onOpenModal(patient, 'edit-patient')}
                  onCheckStatus={() => onOpenModal(patient, 'status-patient')}
                  onArchive={() => onOpenModal(patient, 'archive-patient')}
                  onDelete={() => onOpenModal(patient, 'delete-patient')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-6 py-4 flex items-center justify-between border-t border-white/5 text-gray-500 text-xs">
        <div>
          {sortedPatients.length} of {totalPatients} row(s) displayed.
        </div>
        <div className="flex items-center gap-8">
          {onPageChange && totalPages > 1 && (
            <>
              <span>Page {currentPage} of {totalPages}</span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => onPageChange(1)}
                  disabled={currentPage === 1}
                  className="p-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onPageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
          {(!onPageChange || totalPages <= 1) && (
            <>
              <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <div className="flex items-center gap-1 bg-navy-900 border border-white/5 rounded px-2 py-1 cursor-pointer">
                  10 <ChevronDown className="w-3 h-3" />
                </div>
              </div>
              <span>Page 1 of 1</span>
              <div className="flex items-center gap-1">
                <button className="p-1 hover:text-white disabled:opacity-30">
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                <button className="p-1 hover:text-white disabled:opacity-30">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 hover:text-white disabled:opacity-30">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="p-1 hover:text-white disabled:opacity-30">
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
