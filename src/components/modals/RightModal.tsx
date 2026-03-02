import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { ModalProps } from '../../types';

export function RightModal({ title, onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md h-full bg-navy-950 border-l border-white/10 flex flex-col shadow-2xl light-mode:bg-white light-mode:border-gray-200"
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
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </motion.div>
    </div>
  );
}
