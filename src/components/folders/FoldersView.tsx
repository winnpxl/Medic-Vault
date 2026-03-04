import { useState } from 'react';
import { Plus, Share2, MoreHorizontal } from 'lucide-react';

interface FoldersViewProps {
  onFolderSelect: (folder: { name: string; files: number; expiry: string; views: number }) => void;
  onShowToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export function FoldersView({ onFolderSelect, onShowToast }: FoldersViewProps) {
  const [folders] = useState([
    { name: 'Cardiology - External Share', files: 12, expiry: '2 days left', views: 45 },
    { name: 'Oncology Research - Partner A', files: 8, expiry: 'Expired', views: 128 },
    { name: 'Pediatrics - General Public', files: 24, expiry: '14 days left', views: 8 },
  ]);
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Public Medical Folders</h2>
        <button
          onClick={() => onShowToast('info', 'Create folder modal will open')}
          className="bg-orange-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-orange-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Create shareable folder
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.map((folder, i) => (
          <div
            key={i}
            className="glass-card p-3 group hover:border-orange-primary/30 transition-all cursor-pointer"
            onClick={() => onFolderSelect(folder)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-orange-primary/10 transition-colors">
                <Share2 className="w-6 h-6 text-gray-400 group-hover:text-orange-primary" />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShowToast('info', 'Folder options');
                }}
                className="p-1 text-gray-500 hover:text-white transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShowToast('info', 'Manage access for ' + folder.name);
                }}
                className="text-xs text-orange-primary hover:underline font-medium"
              >
                Manage access
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
