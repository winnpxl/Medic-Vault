import React from 'react';

export function CreateFolderModalContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 1: Location Context (Non-Editable)
        </p>
        <div className="p-4 rounded-lg bg-white/5 space-y-2 light-mode:bg-gray-50">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Parent Location</span>
            <span className="font-medium">Department / Cardiology</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 2: Folder Details
        </p>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Folder Name</label>
            <input type="text" className="input-field" placeholder="Enter folder name" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Folder Type</label>
            <select className="input-field">
              <option>Patient Subfolder</option>
              <option>Department Folder</option>
              <option>Institutional Resource</option>
              <option>Temporary Review Folder</option>
            </select>
          </div>
          <textarea
            className="input-field h-24 resize-none"
            placeholder="Description (Optional)"
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
            <div className="w-10 h-5 rounded-full bg-orange-primary relative cursor-pointer">
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Allow Custom Access (Admin only)</span>
            <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white" />
            </div>
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
            <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Requires Admin Approval</span>
            <div className="w-10 h-5 rounded-full bg-orange-primary relative cursor-pointer">
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-6 flex gap-3">
        <button className="btn-secondary flex-1 justify-center">Cancel</button>
        <button className="btn-primary flex-1 justify-center">Create Folder</button>
      </div>
    </div>
  );
}
