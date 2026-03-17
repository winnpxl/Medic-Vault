import { useState, useEffect } from 'react';
import { Plus, Globe, MoreHorizontal, Share2, Trash2 } from 'lucide-react';

interface PublicFolder {
  id: string;
  name: string;
  files: number;
  expiry: string;
  views: number;
  createdBy: string;
  expiryDays: number;
  description?: string;
}

interface FoldersViewProps {
  onFolderSelect: (folder: { name: string; files: number; expiry: string; views: number }) => void;
  onShowToast: (type: 'success' | 'error' | 'info', message: string) => void;
  onCreateFolder: () => void;
}

export function FoldersView({ onFolderSelect, onShowToast, onCreateFolder }: FoldersViewProps) {
  const [folders, setFolders] = useState<PublicFolder[]>([]);
  const [currentUser] = useState('current-user-id'); // This should come from auth context
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    // Load folders from localStorage
    const savedFolders = localStorage.getItem('publicFolders');
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    } else {
      // Initialize with default folders
      const defaultFolders: PublicFolder[] = [
        { id: '1', name: 'Cardiology - External Share', files: 12, expiry: '2 days left', views: 45, createdBy: 'current-user-id', expiryDays: 2 },
        { id: '2', name: 'Oncology Research - Partner A', files: 8, expiry: 'Expired', views: 128, createdBy: 'other-user', expiryDays: 0 },
        { id: '3', name: 'Pediatrics - General Public', files: 24, expiry: '14 days left', views: 8, createdBy: 'current-user-id', expiryDays: 14 },
      ];
      setFolders(defaultFolders);
      localStorage.setItem('publicFolders', JSON.stringify(defaultFolders));
    }
  }, []);

  const handleShare = (e: React.MouseEvent, folder: PublicFolder) => {
    e.stopPropagation();
    setOpenDropdown(null);
    onShowToast('info', `Share link copied for ${folder.name}`);
  };

  const handleManage = (e: React.MouseEvent, folder: PublicFolder) => {
    e.stopPropagation();
    setOpenDropdown(null);
    onShowToast('info', 'Management Permission Currently Unavailable');
  };

  const handleDelete = (e: React.MouseEvent, folder: PublicFolder) => {
    e.stopPropagation();
    setOpenDropdown(null);
    
    if (folder.createdBy !== currentUser) {
      onShowToast('error', 'Only the folder creator can delete this folder');
      return;
    }

    const updatedFolders = folders.filter(f => f.id !== folder.id);
    setFolders(updatedFolders);
    localStorage.setItem('publicFolders', JSON.stringify(updatedFolders));
    onShowToast('success', `Folder "${folder.name}" deleted successfully`);
  };

  const toggleDropdown = (e: React.MouseEvent, folderId: string) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === folderId ? null : folderId);
  };
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Public Medical Folders</h2>
        <button
          onClick={onCreateFolder}
          className="hidden md:flex bg-orange-primary text-white px-4 py-2 rounded-lg text-sm font-medium items-center gap-2 hover:bg-orange-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Create shareable folder
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="glass-card p-3 group hover:border-orange-primary/30 transition-all cursor-pointer relative"
            onClick={() => onFolderSelect(folder)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-orange-primary/10 transition-colors">
                <Globe className="w-6 h-6 text-gray-400 group-hover:text-orange-primary" />
              </div>
              <div className="relative">
                <button
                  onClick={(e) => toggleDropdown(e, folder.id)}
                  className="p-1 text-gray-500 hover:text-white transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                {openDropdown === folder.id && (
                  <div className="absolute right-0 top-8 w-48 bg-navy-900 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                    <button
                      onClick={(e) => handleShare(e, folder)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition-colors text-left"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <button
                      onClick={(e) => handleManage(e, folder)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition-colors text-left"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                      Manage
                    </button>
                    {folder.createdBy === currentUser && (
                      <button
                        onClick={(e) => handleDelete(e, folder)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-red-500/10 text-red-500 transition-colors text-left"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <h4 className="font-semibold mb-1">{folder.name}</h4>
            <p className="text-xs text-gray-500 mb-6">
              {folder.files} files • {folder.views} views
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  folder.expiry === 'Expired' ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {folder.expiry}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* FAB for mobile only */}
      <button
        onClick={onCreateFolder}
        className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-orange-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-primary/90 transition-colors z-[60]"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
