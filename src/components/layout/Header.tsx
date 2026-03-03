import React from 'react';
import { Search, Bell, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNotificationsOpen: () => void;
  onEmergencyAccess: () => void;
}

export function Header({ searchQuery, onSearchChange, onNotificationsOpen, onEmergencyAccess }: HeaderProps) {
  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 gap-4 light-mode:border-gray-200 light-mode:bg-white">
      <div className="flex-1 max-w-2xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="search patients, files, departments, e.t.c"
          className="w-full bg-navy-900/50 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-primary/50 transition-colors light-mode:bg-white light-mode:border-gray-300 light-mode:text-gray-900"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onNotificationsOpen}
          className="relative p-2 text-gray-400 hover:text-white transition-colors light-mode:text-gray-600 light-mode:hover:text-gray-900"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-orange-primary text-[10px] font-bold text-white rounded-full flex items-center justify-center border-2 border-navy-950 light-mode:border-white">
            4
          </span>
        </button>
        <button 
          onClick={onEmergencyAccess}
          className="bg-orange-primary/10 text-orange-primary border border-orange-primary/20 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-orange-primary/20 transition-colors"
        >
          <AlertTriangle className="w-4 h-4" />
          Grant emergency access
        </button>
      </div>
    </header>
  );
}
