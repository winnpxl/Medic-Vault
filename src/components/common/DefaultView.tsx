import React from 'react';
import { FolderTree } from 'lucide-react';

interface DefaultViewProps {
  activeTab: string;
}

export function DefaultView({ activeTab }: DefaultViewProps) {
  return (
    <div className="flex-1 flex items-center justify-center text-gray-500">
      <div className="text-center">
        <FolderTree className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <h3 className="text-xl font-semibold text-white mb-2">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h3>
        <p>This section is currently under development.</p>
      </div>
    </div>
  );
}
