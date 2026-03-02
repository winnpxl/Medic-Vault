import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { ModalProps } from '../../types';

export function CenterModal({ title, onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: '20%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '20%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-2xl bg-navy-950 border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden light-mode:bg-white light-mode:border-gray-200"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between light-mode:border-gray-100">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors light-mode:hover:bg-gray-100"
          >
            <Plus className="w-6 h-6 rotate-45" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 max-h-[80vh]">{children}</div>
      </motion.div>
    </div>
  );
}
