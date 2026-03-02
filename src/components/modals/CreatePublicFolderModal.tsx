import { useState, FormEvent } from 'react';

interface CreatePublicFolderModalProps {
  onClose: () => void;
  onCreate: (folder: {
    name: string;
    description: string;
    expiryDays: number;
    requiresApproval: boolean;
  }) => void;
}

export function CreatePublicFolderModal({ onClose, onCreate }: CreatePublicFolderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    expiryDays: 30,
    requiresApproval: true,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs text-gray-600 font-medium">Folder Name *</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g., Cardiology - External Share"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-gray-600 font-medium">Description</label>
          <textarea
            className="input-field h-24 resize-none"
            placeholder="Brief description of what this folder contains..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-gray-600 font-medium">Access Expiry</label>
          <select
            className="input-field"
            value={formData.expiryDays}
            onChange={(e) => setFormData({ ...formData, expiryDays: parseInt(e.target.value) })}
          >
            <option value={7}>7 days</option>
            <option value={14}>14 days</option>
            <option value={30}>30 days</option>
            <option value={60}>60 days</option>
            <option value={90}>90 days</option>
            <option value={365}>1 year</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            External access will expire after this period
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Require Admin Approval</p>
              <p className="text-xs text-gray-500">All file uploads need admin review</p>
            </div>
            <input
              type="checkbox"
              checked={formData.requiresApproval}
              onChange={(e) => setFormData({ ...formData, requiresApproval: e.target.checked })}
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Note:</strong> You can upload files and manage access permissions after creating
          the folder.
        </p>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1 justify-center">
          Create Folder
        </button>
      </div>
    </form>
  );
}
