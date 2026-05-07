import { useState } from 'react';
import { AlertTriangle, LockOpen, Search } from 'lucide-react';

interface GrantEmergencyAccessModalProps {
  onClose: () => void;
  onGrant: (data: EmergencyAccessData) => void;
}

interface EmergencyAccessData {
  patientSearch: string;
  recipient: string;
  role: string;
  accessScope: string[];
  duration: string;
  justification: string;
  supervisorAcknowledged: boolean;
}

export function GrantEmergencyAccessModal({ onClose, onGrant }: GrantEmergencyAccessModalProps) {
  const [patientSearch, setPatientSearch] = useState('');
  const [recipient, setRecipient] = useState('');
  const [role, setRole] = useState('');
  const [accessScope, setAccessScope] = useState<string[]>(['view-files', 'view-notes']);
  const [duration, setDuration] = useState('1');
  const [justification, setJustification] = useState('');
  const [supervisorAcknowledged, setSupervisorAcknowledged] = useState(false);

  const toggleAccessScope = (scope: string) => {
    setAccessScope((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const handleSubmit = () => {
    if (!patientSearch || !recipient || !role || justification.length < 20 || !supervisorAcknowledged) {
      return;
    }

    onGrant({
      patientSearch,
      recipient,
      role,
      accessScope,
      duration,
      justification,
      supervisorAcknowledged,
    });
  };

  const isValid = patientSearch && recipient && role && justification.length >= 20 && supervisorAcknowledged;

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-400">
        This action bypasses standard access controls and is fully logged.
      </div>

      {/* Warning Banner */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-orange-200">
          <strong className="text-orange-500">Emergency access</strong> is reserved for critical, time-sensitive situations only. 
          Every action taken under emergency access is recorded, timestamped, and flagged for mandatory review by your compliance officer.
        </div>
      </div>

      {/* Patient Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Patient Selection <span className="text-red-500">*</span>
        </label>
        <div className="text-xs text-gray-500 mb-2">Search or select patient</div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, ID, or department..."
            className="input-field pl-10"
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Access Recipient */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Access Recipient <span className="text-red-500">*</span>
        </label>
        <div className="text-xs text-gray-500 mb-2">Who is being granted access?</div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search staff by name or role..."
            className="input-field pl-10"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
      </div>

      {/* Role / Reason */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Role / Reason <span className="text-red-500">*</span>
        </label>
        <select
          className="input-field"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select role...</option>
          <option value="attending-physician">Attending Physician — Critical Care</option>
          <option value="surgeon-on-call">Surgeon On-Call</option>
          <option value="emergency-responder">Emergency Responder</option>
          <option value="senior-nurse-icu">Senior Nurse — ICU</option>
          <option value="radiologist-on-call">Radiologist On-Call</option>
          <option value="other">Other (requires written justification)</option>
        </select>
      </div>

      {/* Access Scope */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Access Scope</label>
        <div className="text-xs text-gray-500 mb-2">What can this person access?</div>
        <div className="space-y-2">
          {[
            { id: 'view-files', label: 'View patient files', checked: true },
            { id: 'view-notes', label: 'View clinical notes', checked: true },
            { id: 'edit-records', label: 'Edit records', checked: false },
            { id: 'download-files', label: 'Download / export files', checked: false },
            { id: 'share-externally', label: 'Share externally', checked: false },
          ].map((scope) => (
            <label key={scope.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={accessScope.includes(scope.id)}
                onChange={() => toggleAccessScope(scope.id)}
                className="w-4 h-4 rounded border-white/10 bg-navy-900 text-orange-primary focus:ring-orange-primary focus:ring-offset-0"
              />
              <span className="text-sm">{scope.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Duration <span className="text-red-500">*</span>
        </label>
        <div className="text-xs text-gray-500 mb-2">How long should access remain active?</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: '1', label: '1 Hour' },
            { value: '4', label: '4 Hours' },
            { value: '12', label: '12 Hours' },
            { value: '24', label: '24 Hours (requires supervisor PIN)' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setDuration(option.value)}
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                duration === option.value
                  ? 'bg-orange-primary text-white'
                  : 'bg-navy-900 border border-white/10 hover:border-white/20'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Justification */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Justification <span className="text-red-500">*</span>
        </label>
        <div className="text-xs text-gray-500 mb-2">
          Required — this will appear in the audit report (min. 20 characters)
        </div>
        <textarea
          placeholder="Describe the clinical emergency that requires this access override..."
          className="input-field min-h-[100px] resize-none"
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        />
        <div className="text-xs text-gray-500 text-right">
          {justification.length} / 20 characters minimum
        </div>
      </div>

      {/* Supervisor Acknowledgement */}
      <div className="space-y-2">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={supervisorAcknowledged}
            onChange={(e) => setSupervisorAcknowledged(e.target.checked)}
            className="w-4 h-4 rounded border-white/10 bg-navy-900 text-orange-primary focus:ring-orange-primary focus:ring-offset-0 mt-0.5"
          />
          <span className="text-sm">
            I, <strong>Dr. Daryl Chen</strong>, confirm this access grant is clinically justified and accept 
            responsibility for its use under Medic Vault's emergency access policy.
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="btn-primary flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LockOpen className="w-4 h-4" />
          Grant Emergency Access
        </button>
      </div>
    </div>
  );
}
