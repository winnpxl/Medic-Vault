import React from 'react';
import { Plus } from 'lucide-react';

export function FileUploadModalContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 1: Location Context (Non-Editable)
        </p>
        <div className="p-4 rounded-lg bg-white/5 space-y-2 light-mode:bg-gray-50">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Department</span>
            <span className="font-medium">Radiology</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Patient</span>
            <span className="font-medium">ID 4421 | John Okafor</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Category</span>
            <span className="font-medium">Imaging</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 2: File Upload
        </p>
        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center space-y-4 hover:border-orange-primary/50 transition-colors cursor-pointer light-mode:border-gray-200">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium">Drag & Drop Area</p>
            <p className="text-xs text-gray-500 mt-1">
              Accepted Formats: PDF, JPG, PNG, DOCX, DICOM
            </p>
          </div>
          <button className="btn-secondary mx-auto">Browse File</button>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 3: Required Metadata
        </p>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">File Title</label>
            <input type="text" className="input-field" placeholder="Enter file title" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Medical Category</label>
            <select className="input-field appearance-none">
              <option>Lab Results</option>
              <option>Imaging</option>
              <option>Prescription</option>
              <option>Consultation Note</option>
              <option>Surgical Report</option>
              <option>Discharge Summary</option>
              <option>Insurance</option>
              <option>Administrative</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-500 font-medium">Date of Document</label>
              <input type="date" className="input-field" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-500 font-medium">Priority Level</label>
              <select className="input-field">
                <option>Normal</option>
                <option>Urgent</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Attending Physician</label>
            <input type="text" className="input-field" placeholder="Dr. Name" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Tags</label>
            <input
              type="text"
              className="input-field"
              placeholder="Condition, treatment type, keywords"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 4: Access Controls (Role-Aware)
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Restrict to Department Only</span>
            <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Mark as Sensitive</span>
            <input type="checkbox" className="w-4 h-4 accent-orange-primary" />
          </div>
        </div>
      </section>

      <div className="pt-6 flex gap-3">
        <button className="btn-secondary flex-1 justify-center">Cancel</button>
        <button className="btn-primary flex-1 justify-center">Upload File</button>
      </div>
    </div>
  );
}
