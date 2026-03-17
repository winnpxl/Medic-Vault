import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  ChevronDown,
  Plus,
  LogOut,
  UserCircle,
  File,
  FolderTree,
} from 'lucide-react';
import { SIDEBAR_ITEMS } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  selectedDept: string | null;
  onTabChange: (tab: string) => void;
  onModalOpen: (modal: string) => void;
}

export function Sidebar({
  activeTab,
  selectedDept,
  onTabChange,
  onModalOpen,
}: SidebarProps) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(
    localStorage.getItem('profilePicture')
  );
  const { user, signOut } = useAuth();

  // Listen for profile picture changes
  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePicture(localStorage.getItem('profilePicture'));
    };
    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener('profilePictureChanged', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profilePictureChanged', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside className="w-64 h-screen border-r border-white/5 flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3">
        <img 
          src="/logo.png" 
          alt="Medic Vault Logo" 
          className="w-10 h-10 object-contain"
        />
        <div>
          <h1 className="font-bold text-lg leading-tight">Medic Vault</h1>
          <p className="text-xs text-gray-500">Medical Cloud Services</p>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="relative">
          <button
            onClick={() => setIsUploadOpen(!isUploadOpen)}
            className="w-full bg-navy-900 border border-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-white/5 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Plus className="w-4 h-4" />
              <span className="font-medium">Upload new</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 group-hover:text-white transition-transform ${
                isUploadOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {isUploadOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-navy-900 border border-white/5 rounded-lg shadow-xl z-50 overflow-hidden"
              >
                {[
                  { label: 'Add new file', icon: File, action: () => onModalOpen('file') },
                  { label: 'Add a new folder', icon: FolderTree, action: () => onModalOpen('folder') },
                  { label: 'Create patient data', icon: UserCircle, action: () => onModalOpen('user') },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition-colors text-left"
                    onClick={() => {
                      item.action();
                      setIsUploadOpen(false);
                    }}
                  >
                    <item.icon className="w-4 h-4 text-gray-400" />
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-6 overflow-y-auto">
        <div>
          <p className="px-4 text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-2">
            General
          </p>
          <div className="space-y-1">
            {SIDEBAR_ITEMS.filter((item) => item.section === 'General').map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={
                  activeTab === item.id && !selectedDept
                    ? 'sidebar-item-active w-full'
                    : 'sidebar-item w-full'
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.hasSubmenu && <ChevronDown className="w-4 h-4 opacity-50" />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="px-4 text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-2">
            Management
          </p>
          <div className="space-y-1">
            {SIDEBAR_ITEMS.filter((item) => item.section === 'Management').map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={
                  activeTab === item.id && !selectedDept
                    ? 'sidebar-item-active w-full'
                    : 'sidebar-item w-full'
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-white/5 relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <img
            src={profilePicture || 'https://picsum.photos/seed/doc/100/100'}
            className="w-10 h-10 rounded-full object-cover border border-white/10"
            alt="User"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 text-left">
            <p className="text-sm font-medium">{user?.displayName || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
            <p className="text-[10px] text-orange-primary uppercase font-semibold mt-0.5">
              {user?.role.replace('_', ' ')}
            </p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isUserMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-4 right-4 mb-2 bg-navy-900 border border-white/5 rounded-lg shadow-xl z-50 overflow-hidden"
            >
              {[
                { label: 'Profile settings', icon: UserCircle, action: () => onTabChange('settings') },
                { label: 'Log out', icon: LogOut, danger: true, action: handleLogout },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition-colors text-left ${
                    item.danger ? 'text-red-500' : ''
                  }`}
                  onClick={() => {
                    item.action();
                    setIsUserMenuOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
