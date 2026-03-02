import React from 'react';
import { ChevronLeft, Search, LayoutDashboard, FileText } from 'lucide-react';
import { Patient } from '../../types';
import { STATUS_COLORS } from '../../constants';

interface PatientProfileProps {
  patient: Patient;
  onBack: () => void;
}

export function PatientProfile({ patient, onBack }: PatientProfileProps) {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8">
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-500 hover:text-white text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> {patient.department}
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-xl">
            <img
              src={`https://picsum.photos/seed/${patient.id}/400/400`}
              alt={patient.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Name</p>
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <div className="pt-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    STATUS_COLORS[patient.status] ||
                    'bg-gray-500/10 text-gray-500 border-gray-500/20'
                  }`}
                >
                  {patient.status}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Patient ID
              </p>
              <p className="text-lg font-mono font-bold text-white">{patient.id}</p>
              <div className="pt-4 space-y-1">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Department
                </p>
                <p className="text-sm font-semibold">{patient.department}</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Age</p>
              <p className="text-lg font-bold text-white">{patient.age}</p>
              <div className="pt-4 space-y-1">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Date Registered
                </p>
                <p className="text-sm font-semibold">{patient.lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="search files"
              className="w-full bg-navy-900 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
            <LayoutDashboard className="w-4 h-4" /> View
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { name: 'cardioscan_new.png', type: 'PNG', size: '658kb' },
            { name: 'diagnosis.jpeg', type: 'JPEG', size: '658kb' },
            { name: 'cardioscan_new.xry', type: 'XRAY', size: '658kb' },
            { name: 'permission.txt', type: 'TEXT', size: '658kb' },
            { name: 'background.pdf', type: 'PDF', size: '658kb' },
          ].map((file, i) => (
            <div
              key={i}
              className="glass-card p-3 hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="aspect-square bg-white/5 rounded-lg flex flex-col items-center justify-center mb-4 relative overflow-hidden">
                <div className="text-[10px] font-bold text-gray-500 mb-1">{file.type}</div>
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h4 className="text-xs font-bold truncate mb-2">{file.name}</h4>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500">File Size</p>
                  <p className="text-[10px] font-bold">{file.size}</p>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="w-5 h-5 rounded-full border border-navy-950 overflow-hidden"
                    >
                      <img
                        src={`https://picsum.photos/seed/${j + i}/20/20`}
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
