import React from 'react';
import { FolderTree } from 'lucide-react';

interface DefaultViewProps {
  activeTab: string;
}

export function DefaultView({ activeTab }: DefaultViewProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FolderTree className="w-10 h-10 text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Oops! There's nothing here...</h3>
        <p className="text-gray-500 text-sm">
          This section is currently under development. Please check back later.
        </p>
      </div>
    </div>
  );
}
