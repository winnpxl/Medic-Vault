import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Settings } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
  onOpenSettings: () => void;
}

interface NotificationItemProps {
  priority: 'green' | 'blue' | 'orange' | 'red';
  title: string;
  context: string;
  summary: string;
  time: string;
  actionLabel: string;
}

function NotificationItem({
  priority,
  title,
  context,
  summary,
  time,
  actionLabel,
}: NotificationItemProps) {
  const priorityColors: Record<string, string> = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  };

  return (
    <div className="p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group light-mode:border-gray-100 light-mode:hover:bg-gray-50">
      <div className="flex gap-3">
        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${priorityColors[priority]}`} />
        <div className="flex-1 space-y-1">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-semibold">{title}</h4>
            <span className="text-[10px] text-gray-500">{time}</span>
          </div>
          <p className="text-xs text-gray-400 font-medium">{context}</p>
          <p className="text-[11px] text-gray-500">{summary}</p>
          <div className="pt-3">
            <button className="text-xs font-bold text-orange-primary hover:underline">
              {actionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NotificationPanel({ onClose, onOpenSettings }: NotificationPanelProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md md:max-w-md h-full bg-navy-950 border-l border-white/10 flex flex-col shadow-2xl light-mode:bg-white light-mode:border-gray-200"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between light-mode:border-gray-100">
          <h3 className="text-xl font-bold">Notifications</h3>
          <div className="flex items-center gap-2">
            <button className="hidden md:block text-xs text-orange-primary font-medium hover:underline">
              Mark All as Read
            </button>
            <button
              onClick={onOpenSettings}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors light-mode:hover:bg-gray-100"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors light-mode:hover:bg-gray-100"
            >
              <Plus className="w-6 h-6 rotate-45" />
            </button>
          </div>
        </div>

        <div className="px-4 md:px-6 py-4 border-b border-white/5 light-mode:border-gray-100">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {['All', 'Patient Updates', 'Access & Permissions', 'External Shares', 'System Alerts'].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
                    activeFilter === filter
                      ? 'bg-orange-primary text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white light-mode:bg-gray-100 light-mode:text-gray-600'
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <NotificationItem
            priority="green"
            title="New Lab Result Uploaded"
            context="Patient: ID 4421 | John Okafor"
            summary="Uploaded by: Lab Unit"
            time="2 minutes ago"
            actionLabel="View File"
          />
          <NotificationItem
            priority="orange"
            title="Emergency Access Used"
            context="Dr. Adebayo accessed restricted oncology file"
            summary="Reason logged"
            time="10 minutes ago"
            actionLabel="View Audit"
          />
          <NotificationItem
            priority="green"
            title="External Folder Accessed"
            context="Insurance Portal viewed shared documents"
            summary="3 views total"
            time="Today at 10:45 AM"
            actionLabel="View Share Details"
          />
          <NotificationItem
            priority="red"
            title="Unusual Access Pattern"
            context="Multiple attempts to access restricted patient folder"
            summary="Review recommended"
            time="1 hour ago"
            actionLabel="Review Activity"
          />
        </div>
      </motion.div>
    </div>
  );
}
