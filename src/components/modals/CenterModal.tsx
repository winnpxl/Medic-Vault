import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { ModalProps } from '../../types';

export function CenterModal({ title, onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />
      <motion.div
        initial={{ y: '20%', opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: '20%', opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-navy-950 border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Plus className="w-6 h-6 rotate-45" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 max-h-[calc(90vh-120px)]">{children}</div>
      </motion.div>
    </div>
  );
}
