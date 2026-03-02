import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MoreHorizontal, Eye, Edit, CheckCircle, Archive, Trash2 } from 'lucide-react';
import { Patient } from '../../types';

interface PatientActionsDropdownProps {
  patient: Patient;
  onSelect: (patient: Patient) => void;
  onEdit: () => void;
  onCheckStatus: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

export function PatientActionsDropdown({ 
  patient, 
  onSelect, 
  onEdit,
  onCheckStatus,
  onArchive,
  onDelete
}: PatientActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 text-gray-500 hover:text-white transition-colors"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-navy-900 border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              {[
                { label: 'View Full Details', icon: Eye, action: () => { onSelect(patient); setIsOpen(false); } },
                { label: 'Edit', icon: Edit, action: () => { onEdit(); setIsOpen(false); } },
                { label: 'Check Status', icon: CheckCircle, action: () => { onCheckStatus(); setIsOpen(false); } },
                { label: 'Archive', icon: Archive, action: () => { onArchive(); setIsOpen(false); } },
                { label: 'Delete', icon: Trash2, action: () => { onDelete(); setIsOpen(false); }, danger: true },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium hover:bg-white/5 transition-colors text-left ${
                    item.danger ? 'text-red-500' : 'text-gray-300'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.action();
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
