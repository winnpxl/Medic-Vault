import { useState } from 'react';
import { DEPARTMENTS } from '../../constants';

interface CreateFolderModalContentProps {
  onClose?: () => void;
  onCreate?: (folderData: any) => void;
}

export function CreateFolderModalContent({ onClose, onCreate }: CreateFolderModalContentProps) {
  const [parentDepartment, setParentDepartment] = useState(DEPARTMENTS[0].name);
  const [folderName, setFolderName] = useState('');
  const [folderType, setFolderType] = useState('Patient Subfolder');
  const [description, setDescription] = useState('');
  const [inheritPermissions, setInheritPermissions] = useState(true);
  const [allowCustomAccess, setAllowCustomAccess] = useState(false);
  const [allowExternalSharing, setAllowExternalSharing] = useState(false);
  const [requiresApproval, setRequiresApproval] = useState(true);

  const handleCreate = () => {
    if (!folderName.trim()) {
      alert('Please enter a folder name');
      return;
    }

    const folderData = {
      id: Date.now().toString(),
      name: folderName,
      department: parentDepartment,
      type: folderType,
      description,
      inheritPermissions,
      allowCustomAccess,
      allowExternalSharing,
      requiresApproval,
      createdAt: new Date().toISOString(),
      fileCount: 0,
    };

    // Store in localStorage
    const existingFolders = JSON.parse(localStorage.getItem('departmentFolders') || '[]');
    existingFolders.push(folderData);
    localStorage.setItem('departmentFolders', JSON.stringify(existingFolders));

    if (onCreate) {
      onCreate(folderData);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 1: Location Context
        </p>
        <div className="space-y-1.5">
          <label className="text-xs text-gray-500 font-medium">Parent Department</label>
          <select
            className="input-field w-full"
            value={parentDepartment}
            onChange={(e) => setParentDepartment(e.target.value)}
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 2: Folder Details
        </p>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Folder Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Folder Type</label>
            <select
              className="input-field"
              value={folderType}
              onChange={(e) => setFolderType(e.target.value)}
            >
              <option>Patient Subfolder</option>
              <option>Department Folder</option>
              <option>Institutional Resource</option>
              <option>Temporary Review Folder</option>
            </select>
          </div>
          <textarea
            className="input-field h-24 resize-none"
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 3: Permission Settings
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Inherit Parent Permissions</span>
            <button
              onClick={() => setInheritPermissions(!inheritPermissions)}
              className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                inheritPermissions ? 'bg-orange-primary' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${
                  inheritPermissions ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Allow Custom Access (Admin only)</span>
            <button
              onClick={() => setAllowCustomAccess(!allowCustomAccess)}
              className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                allowCustomAccess ? 'bg-orange-primary' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${
                  allowCustomAccess ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 4: External Sharing Eligibility
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Allow External Sharing</span>
            <button
              onClick={() => setAllowExternalSharing(!allowExternalSharing)}
              className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                allowExternalSharing ? 'bg-orange-primary' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${
                  allowExternalSharing ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Requires Admin Approval</span>
            <button
              onClick={() => setRequiresApproval(!requiresApproval)}
              className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                requiresApproval ? 'bg-orange-primary' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${
                  requiresApproval ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      <div className="pt-6 flex gap-3">
        <button onClick={onClose} className="btn-secondary flex-1 justify-center">
          Cancel
        </button>
        <button onClick={handleCreate} className="btn-primary flex-1 justify-center">
          Create Folder
        </button>
      </div>
    </div>
  );
}
