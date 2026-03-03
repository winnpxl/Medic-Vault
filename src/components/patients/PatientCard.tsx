import { MoreVertical, FileText, Calendar } from 'lucide-react';
import { Patient } from '../../types';
import { STATUS_COLORS } from '../../constants';
import { PatientActionsDropdown } from './PatientActionsDropdown';

interface PatientCardProps {
  patient: Patient;
  onSelect: (patient: Patient) => void;
  onOpenModal: (patient: Patient, modalType: string) => void;
}

export function PatientCard({ patient, onSelect, onOpenModal }: PatientCardProps) {
  return (
    <div
      onClick={() => onSelect(patient)}
      className="bg-navy-900 border border-white/5 rounded-xl p-4 hover:bg-white/5 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate">{patient.name}</h3>
          <p className="text-xs text-gray-500 font-mono">{patient.id}</p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <PatientActionsDropdown
            patient={patient}
            onSelect={onSelect}
            onEdit={() => onOpenModal(patient, 'edit-patient')}
            onCheckStatus={() => onOpenModal(patient, 'status-patient')}
            onArchive={() => onOpenModal(patient, 'archive-patient')}
            onDelete={() => onOpenModal(patient, 'delete-patient')}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
            STATUS_COLORS[patient.status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'
          }`}
        >
          {patient.status}
        </span>
        <span className="text-xs text-gray-400">Age {patient.age}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-[10px] text-gray-500">Files</p>
            <p className="text-sm font-medium">{patient.files}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-[10px] text-gray-500">Updated</p>
            <p className="text-sm font-medium truncate">{patient.lastUpdated}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/5">
        <p className="text-xs text-gray-500">Department</p>
        <p className="text-sm font-medium">{patient.department}</p>
      </div>
    </div>
  );
}
