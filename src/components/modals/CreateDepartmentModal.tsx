import React from 'react';

export function CreateDepartmentModalContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 1: Department Identity
        </p>
        <div className="space-y-4">
          <input type="text" className="input-field" placeholder="Department Name" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" className="input-field" placeholder="Department Code" />
            <select className="input-field">
              <option>Clinical</option>
              <option>Diagnostic</option>
              <option>Surgical</option>
              <option>Administrative</option>
              <option>Support Services</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 2: Department Head & Ownership
        </p>
        <div className="space-y-4">
          <input
            type="text"
            className="input-field"
            placeholder="Assign Department Head (Search User)"
          />
          <input type="text" className="input-field" placeholder="Backup Supervisor (Optional)" />
          <input type="email" className="input-field" placeholder="Primary Contact Email" />
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 3: Access & Permission Defaults
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Allow Cross-Department Access</span>
            <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Allow External Sharing by Default</span>
            <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 4: Operational Settings
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Enable Emergency Override</span>
            <div className="w-10 h-5 rounded-full bg-orange-primary relative cursor-pointer">
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Require File Metadata Before Upload</span>
            <div className="w-10 h-5 rounded-full bg-orange-primary relative cursor-pointer">
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 6: Status
        </p>
        <select className="input-field">
          <option>Active</option>
          <option>Inactive</option>
          <option>Under Setup</option>
        </select>
      </section>

      <div className="pt-6 flex gap-3">
        <button className="btn-secondary flex-1 justify-center">Cancel</button>
        <button className="btn-primary flex-1 justify-center">Create Department</button>
      </div>
    </div>
  );
}
