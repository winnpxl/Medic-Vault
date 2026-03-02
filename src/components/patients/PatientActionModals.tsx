import { useState, FormEvent } from 'react';
import { Patient } from '../../types';
import { AlertTriangle, Trash2, Archive } from 'lucide-react';

interface EditPatientModalProps {
  patient: Patient;
  onClose: () => void;
  onSave: (patient: Patient) => void;
}

export function EditPatientModal({ patient, onClose, onSave }: EditPatientModalProps) {
  const [firstName, setFirstName] = useState(patient.name.split(' ')[0] || '');
  const [lastName, setLastName] = useState(patient.name.split(' ')[1] || '');
  const [age, setAge] = useState(patient.age.toString());
  const [bloodType, setBloodType] = useState('A+');
  const [status, setStatus] = useState(patient.status);
  const [department, setDepartment] = useState(patient.department);
  const [clinicalNotes, setClinicalNotes] = useState('Patient under observation for suspected pulmonary embolism.');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedPatient = {
      ...patient,
      name: `${firstName} ${lastName}`,
      age: parseInt(age),
      status,
      department,
    };
    onSave(updatedPatient);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">First Name</label>
            <input
              type="text"
              className="input-field"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Last Name</label>
            <input
              type="text"
              className="input-field"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Age</label>
            <input
              type="number"
              className="input-field"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Blood Type</label>
            <select
              className="input-field"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
            >
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Status</label>
            <select
              className="input-field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Admitted</option>
              <option>Discharged</option>
              <option>ICU</option>
              <option>Outpatient</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Department</label>
            <select
              className="input-field"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>Radiology</option>
              <option>Cardiology</option>
              <option>Oncology</option>
              <option>Pediatrics</option>
              <option>Surgery</option>
              <option>Laboratory</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-gray-400 font-medium">Clinical Notes</label>
          <textarea
            className="input-field h-24 resize-none"
            value={clinicalNotes}
            onChange={(e) => setClinicalNotes(e.target.value)}
            placeholder="Patient under observation for suspected pulmonary embolism."
          />
        </div>

        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-blue-400">
            All changes are subject to the audit trail and your credentials will be timestamped.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1 justify-center">
          Save Changes
        </button>
      </div>
    </form>
  );
}

interface CheckStatusModalProps {
  patient: Patient;
  onClose: () => void;
}

export function CheckStatusModal({ patient, onClose }: CheckStatusModalProps) {
  const completionPercentage = 70;
  const signOffCount = 2;
  const pendingCount = 2;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* File Completeness Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">File Completeness</span>
            <span className="text-sm font-semibold text-white">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-navy-800 rounded-full h-2">
            <div
              className="bg-orange-primary h-2 rounded-full transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Completed Records</span>
            <span className="text-sm font-semibold text-green-400">{signOffCount} files awaiting sign-off</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Completed Forms</span>
            <span className="text-sm font-semibold text-white">All signed ✓</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Insurance Verified</span>
            <span className="text-sm font-semibold text-green-400">BCPR Gold - Verified ✓</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Allergies Flagged</span>
            <span className="text-sm font-semibold text-red-400">Penicillin ⚠</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Last Vital Check</span>
            <span className="text-sm font-semibold text-gray-400">6 hours ago</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">External Shares</span>
            <span className="text-sm font-semibold text-green-400">None - Coming Soon ✓</span>
          </div>
        </div>
      </div>

      <button onClick={onClose} className="btn-primary w-full justify-center">
        Export Status Report
      </button>
    </div>
  );
}

interface ArchivePatientModalProps {
  patient: Patient;
  onClose: () => void;
  onConfirm: () => void;
}

export function ArchivePatientModal({ patient, onClose, onConfirm }: ArchivePatientModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const reasons = [
    'Select a reason...',
    'Patient discharged',
    'Treatment completed',
    'Transferred to another facility',
    'Administrative closure',
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <p className="text-sm text-red-400">
          <strong>⚠ Warning:</strong> Archiving moves this record out of active patient access. This
          will not delete data. You can restore from the archive section.
        </p>
      </div>

      <div className="space-y-4">
        {/* Status Checklist */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
              <span className="text-green-400 text-xs">✓</span>
            </div>
            <span className="text-sm text-gray-300">Record created & admitted</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
              <span className="text-green-400 text-xs">✓</span>
            </div>
            <span className="text-sm text-gray-300">12 files added across 4 divisions</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
              <span className="text-yellow-400 text-xs">!</span>
            </div>
            <span className="text-sm text-gray-300">2 files pending final review</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-navy-700 border border-white/10 flex items-center justify-center">
              <span className="text-gray-500 text-xs">○</span>
            </div>
            <span className="text-sm text-gray-500">Archive scheduled</span>
          </div>
        </div>

        {/* Reason for Archiving */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs text-gray-400 font-medium">Reason for Archiving</label>
          <select
            className="input-field"
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
          >
            {reasons.map((reason, i) => (
              <option key={i} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        {/* Additional Notes */}
        <div className="space-y-1.5">
          <label className="text-xs text-gray-400 font-medium">Additional Notes (Optional)</label>
          <textarea
            className="input-field h-20 resize-none"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Any notes for the archiving log..."
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onClose} className="btn-secondary flex-1 justify-center">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-orange-700 transition-colors flex-1 justify-center"
        >
          <Archive className="w-4 h-4" />
          Confirm Archive
        </button>
      </div>
    </div>
  );
}

interface DeletePatientModalProps {
  patient: Patient;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeletePatientModal({ patient, onClose, onConfirm }: DeletePatientModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const isConfirmed = confirmText === 'DELETE';

  return (
    <div className="space-y-6">
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-400 font-semibold mb-1">
              This action is permanent and cannot be undone.
            </p>
            <p className="text-xs text-red-400/80">
              All associated files, notes, audit logs, and external shares data for this patient will be
              permanently removed from Medic Vault.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {/* Impact Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-navy-800/50 border border-white/5 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">PATIENT AFFECTED</p>
            <p className="text-lg font-bold text-white">12 files</p>
          </div>
          <div className="p-3 bg-navy-800/50 border border-white/5 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">EXTERNAL LINKS</p>
            <p className="text-lg font-bold text-white">3 external links</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-navy-800/50 border border-white/5 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">CURRENT FOLDERS</p>
            <p className="text-lg font-bold text-white">47 entries</p>
          </div>
          <div className="p-3 bg-navy-800/50 border border-white/5 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">AUDIT LOGS</p>
            <p className="text-lg font-bold text-white">2 open</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-gray-400 font-medium">
          Type <span className="text-red-400 font-bold">DELETE</span> to confirm
        </label>
        <input
          type="text"
          className="input-field"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type DELETE to confirm"
        />
      </div>

      <div className="p-3 bg-navy-800/50 border border-white/10 rounded-lg">
        <p className="text-xs text-gray-400">
          <strong>Reason for Deletion:</strong>
        </p>
        <select className="input-field mt-2">
          <option>Select a reason...</option>
          <option>Duplicate record</option>
          <option>Data entry error</option>
          <option>Patient request</option>
          <option>Legal requirement</option>
          <option>Other</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button onClick={onClose} className="btn-secondary flex-1 justify-center">
          Cancel — Keep Record
        </button>
        <button
          onClick={onConfirm}
          disabled={!isConfirmed}
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 justify-center"
        >
          <Trash2 className="w-4 h-4" />
          Permanently Delete
        </button>
      </div>
    </div>
  );
}
