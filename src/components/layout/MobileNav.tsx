import { Home, Users, Building2, FolderOpen, Menu } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onMenuOpen: () => void;
}

export function MobileNav({ activeTab, onTabChange, onMenuOpen }: MobileNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'departments', label: 'Depts', icon: Building2 },
    { id: 'folders', label: 'Folders', icon: FolderOpen },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-navy-900 border-t border-white/10 z-50 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === item.id
                ? 'text-orange-primary bg-orange-primary/10'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
        <button
          onClick={onMenuOpen}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-medium">Menu</span>
        </button>
      </div>
    </nav>
  );
}
