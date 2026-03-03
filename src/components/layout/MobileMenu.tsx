import { motion } from 'motion/react';
import { X, LogOut, UserCircle, ShieldCheck, Plus, File, FolderTree } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onModalOpen: (modal: string) => void;
}

export function MobileMenu({ isOpen, onClose, onModalOpen }: MobileMenuProps) {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] lg:hidden"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-navy-900 border-l border-white/10 z-[101] lg:hidden overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Medic Vault Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h2 className="font-bold text-lg">Menu</h2>
                <p className="text-xs text-gray-500">Medic Vault</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <img
                src="https://picsum.photos/seed/doc/100/100"
                className="w-12 h-12 rounded-full object-cover border border-white/10"
                alt="User"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.displayName || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                <p className="text-[10px] text-orange-primary uppercase font-semibold mt-0.5">
                  {user?.role.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 space-y-2">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-3">Quick Actions</p>
            <button
              onClick={() => {
                onModalOpen('file');
                onClose();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              <File className="w-5 h-5 text-gray-400" />
              <span className="text-sm">Upload File</span>
            </button>
            <button
              onClick={() => {
                onModalOpen('folder');
                onClose();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              <FolderTree className="w-5 h-5 text-gray-400" />
              <span className="text-sm">Create Folder</span>
            </button>
            <button
              onClick={() => {
                onModalOpen('user');
                onClose();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              <Plus className="w-5 h-5 text-gray-400" />
              <span className="text-sm">Add User</span>
            </button>
          </div>

          {/* Account Actions */}
          <div className="mt-auto p-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                onClose();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              <UserCircle className="w-5 h-5 text-gray-400" />
              <span className="text-sm">Profile Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left text-red-500"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
