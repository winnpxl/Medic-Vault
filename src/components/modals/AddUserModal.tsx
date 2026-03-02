import React from 'react';

export function AddUserModalContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 1: User Information
        </p>
        <div className="space-y-4">
          <input type="text" className="input-field" placeholder="Full Name" />
          <input type="email" className="input-field" placeholder="Email Address" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" className="input-field" placeholder="Employee ID" />
            <input type="text" className="input-field" placeholder="Phone Number" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 2: Role Assignment
        </p>
        <select className="input-field">
          <option>Doctor</option>
          <option>Nurse</option>
          <option>Lab Scientist</option>
          <option>Admin</option>
          <option>Medical Records Officer</option>
          <option>External Specialist</option>
        </select>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 3: Department Assignment
        </p>
        <div className="space-y-4">
          <select className="input-field">
            <option>Primary Department</option>
            <option>Cardiology</option>
            <option>Radiology</option>
          </select>
          <input
            type="text"
            className="input-field"
            placeholder="Secondary Departments (Optional)"
          />
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 4: Access Scope
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 accent-orange-primary" />
            <span className="text-sm">Department-Level Access</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 accent-orange-primary" />
            <span className="text-sm">Patient-Specific Access (Optional)</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 accent-orange-primary" />
            <span className="text-sm">Global Access (Admin only)</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 5: Security Settings
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Require Two-Factor Authentication</span>
            <div className="w-10 h-5 rounded-full bg-orange-primary relative cursor-pointer">
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Emergency Override Permission</span>
            <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-6 flex gap-3">
        <button className="btn-secondary flex-1 justify-center">Cancel</button>
        <button className="btn-primary flex-1 justify-center">Create User</button>
      </div>
    </div>
  );
}
