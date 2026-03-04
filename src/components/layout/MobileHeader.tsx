import { Bell, Search, ShieldCheck } from 'lucide-react';

interface MobileHeaderProps {
  onNotificationsOpen: () => void;
  onSearchOpen: () => void;
}

export function MobileHeader({ onNotificationsOpen, onSearchOpen }: MobileHeaderProps) {
  return (
    <header className="lg:hidden sticky top-0 z-40 bg-navy-950 border-b border-white/10 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Medic Vault Logo" 
            className="w-8 h-8 object-contain"
          />
          <div>
            <h1 className="font-bold text-sm leading-tight">Medic Vault</h1>
            <p className="text-[10px] text-gray-500">Medical Cloud</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSearchOpen}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center"
          >
            <Search className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={onNotificationsOpen}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors relative flex items-center justify-center"
          >
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-primary rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
