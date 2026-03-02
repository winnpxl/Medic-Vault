import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  ArrowUpDown,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Patient } from '../../types';
import { STATUS_COLORS } from '../../constants';
import { PatientActionsDropdown } from './PatientActionsDropdown';
import { CenterModal } from '../modals/CenterModal';
import {
  EditPatientModal,
  CheckStatusModal,
  ArchivePatientModal,
  DeletePatientModal,
} from './PatientActionModals';

interface PatientTableProps {
  patients: Patient[];
  totalPatients: number;
  onPatientSelect: (patient: Patient) => void;
  onShowToast: (type: 'success' | 'error' | 'info', message: string) => void;
  onUpdatePatient: (patient: Patient) => void;
  onArchivePatient: (patientId: string) => void;
  onDeletePatient: (patientId: string) => void;
}

export function PatientTable({ 
  patients, 
  totalPatients, 
  onPatientSelect, 
  onShowToast,
  onUpdatePatient,
  onArchivePatient,
  onDeletePatient
}: PatientTableProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleEdit = (updatedPatient: Patient) => {
    onUpdatePatient(updatedPatient);
    onShowToast('success', `Patient ${updatedPatient.name} updated successfully`);
    setActiveModal(null);
    setSelectedPatient(null);
  };

  const handleArchive = () => {
    if (selectedPatient) {
      onArchivePatient(selectedPatient.id);
      onShowToast('success', `Patient ${selectedPatient.name} archived successfully`);
      setActiveModal(null);
      setSelectedPatient(null);
    }
  };

  const handleDelete = () => {
    if (selectedPatient) {
      onDeletePatient(selectedPatient.id);
      onShowToast('success', `Patient ${selectedPatient.name} deleted permanently`);
      setActiveModal(null);
      setSelectedPatient(null);
    }
  };

  const openModal = (patient: Patient, modalType: string) => {
    setSelectedPatient(patient);
    setActiveModal(modalType);
  };
  return (
    <div className="glass-card overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/5 text-gray-500">
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Patient ID</th>
            <th className="px-6 py-4 font-medium">
              <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                Age <ArrowUpDown className="w-3 h-3" />
              </div>
            </th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Files</th>
            <th className="px-6 py-4 font-medium">Department</th>
            <th className="px-6 py-4 font-medium">
              <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                Last Updated <ArrowUpDown className="w-3 h-3" />
              </div>
            </th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {patients.map((patient) => (
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
                  onEdit={() => openModal(patient, 'edit')}
                  onCheckStatus={() => openModal(patient, 'status')}
                  onArchive={() => openModal(patient, 'archive')}
                  onDelete={() => openModal(patient, 'delete')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-6 py-4 flex items-center justify-between border-t border-white/5 text-gray-500 text-xs">
        <div>
          {patients.length} of {totalPatients} row(s) selected.
        </div>
        <div className="flex items-center gap-8">
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
        </div>
      </div>

      <AnimatePresence>
        {selectedPatient && activeModal === 'edit' && (
          <CenterModal title="Edit Patient Record" onClose={() => { setActiveModal(null); setSelectedPatient(null); }}>
            <EditPatientModal
              patient={selectedPatient}
              onClose={() => { setActiveModal(null); setSelectedPatient(null); }}
              onSave={handleEdit}
            />
          </CenterModal>
        )}
        {selectedPatient && activeModal === 'status' && (
          <CenterModal title="Check Patient Status" onClose={() => { setActiveModal(null); setSelectedPatient(null); }}>
            <CheckStatusModal 
              patient={selectedPatient} 
              onClose={() => { setActiveModal(null); setSelectedPatient(null); }} 
            />
          </CenterModal>
        )}
        {selectedPatient && activeModal === 'archive' && (
          <CenterModal title="Archive Patient Record" onClose={() => { setActiveModal(null); setSelectedPatient(null); }}>
            <ArchivePatientModal
              patient={selectedPatient}
              onClose={() => { setActiveModal(null); setSelectedPatient(null); }}
              onConfirm={handleArchive}
            />
          </CenterModal>
        )}
        {selectedPatient && activeModal === 'delete' && (
          <CenterModal title="Delete Patient Record" onClose={() => { setActiveModal(null); setSelectedPatient(null); }}>
            <DeletePatientModal
              patient={selectedPatient}
              onClose={() => { setActiveModal(null); setSelectedPatient(null); }}
              onConfirm={handleDelete}
            />
          </CenterModal>
        )}
      </AnimatePresence>
    </div>
  );
}
