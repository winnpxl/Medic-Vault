import React from 'react';
import { Plus } from 'lucide-react';
import { DEPARTMENTS } from '../../constants';

interface DepartmentsViewProps {
  onDepartmentSelect: (deptName: string) => void;
  onModalOpen: (modal: string) => void;
}

export function DepartmentsView({ onDepartmentSelect, onModalOpen }: DepartmentsViewProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Departments</h2>
        <button
          onClick={() => onModalOpen('department')}
          className="hidden md:flex bg-orange-primary text-white px-4 py-2 rounded-lg text-sm font-medium items-center gap-2 hover:bg-orange-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Create new department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DEPARTMENTS.map((dept) => (
          <div
            key={dept.id}
            onClick={() => onDepartmentSelect(dept.name)}
            className="glass-card p-5 group hover:border-orange-primary/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-orange-primary/10 transition-colors">
                <dept.icon className="w-5 h-5 text-gray-400 group-hover:text-orange-primary" />
              </div>
              <span className="font-semibold">{dept.name}</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Patients</span>
                <span className="font-medium">{dept.patients.toLocaleString()}</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gray-600 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Size</span>
                <span className="font-medium">{dept.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last update</span>
                <span className="font-medium">{dept.lastUpdate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAB for mobile only */}
      <button
        onClick={() => onModalOpen('department')}
        className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-orange-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-primary/90 transition-colors z-[60]"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
