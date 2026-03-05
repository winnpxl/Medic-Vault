import { useState } from 'react';
import {
  ChevronLeft,
  Search,
  Upload,
  Download,
  Share2,
  Trash2,
  FileText,
  MoreHorizontal,
  Clock,
  Eye,
} from 'lucide-react';

interface PublicFolderDetailViewProps {
  folder: {
    name: string;
    files: number;
    expiry: string;
    views: number;
  };
  onBack: () => void;
  onUploadFile: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  downloads: number;
}

export function PublicFolderDetailView({
  folder,
  onBack,
  onUploadFile,
  onShowToast,
}: PublicFolderDetailViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'cardiology_report_2026.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'Dr. Sarah Johnson',
      uploadedDate: 'Mar 15, 2026',
      downloads: 12,
    },
    {
      id: '2',
      name: 'patient_consent_form.pdf',
      type: 'PDF',
      size: '856 KB',
      uploadedBy: 'Admin',
      uploadedDate: 'Mar 14, 2026',
      downloads: 45,
    },
    {
      id: '3',
      name: 'treatment_guidelines.docx',
      type: 'DOCX',
      size: '1.2 MB',
      uploadedBy: 'Dr. Michael Chen',
      uploadedDate: 'Mar 13, 2026',
      downloads: 28,
    },
  ]);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (fileName: string) => {
    onShowToast('success', `Downloading ${fileName}...`);
  };

  const handleShare = (fileName: string) => {
    onShowToast('info', `Share link copied for ${fileName}`);
  };

  const handleDelete = (fileId: string, fileName: string) => {
    setFiles(files.filter((f) => f.id !== fileId));
    onShowToast('success', `${fileName} deleted successfully`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
      <div className="space-y-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-500 hover:text-white text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Public Medical Folders
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold">{folder.name}</h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {filteredFiles.length} files
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {folder.views} views
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {folder.expiry}
              </span>
            </div>
          </div>
          <button
            onClick={onUploadFile}
            className="hidden md:flex bg-orange-primary text-white px-4 py-2 rounded-lg text-sm font-medium items-center gap-2 hover:bg-orange-primary/90 transition-colors"
          >
            <Upload className="w-4 h-4" /> Upload File
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search files..."
            className="w-full bg-navy-900 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-gray-500">
              <th className="px-6 py-4 font-medium">File Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Size</th>
              <th className="px-6 py-4 font-medium">Uploaded By</th>
              <th className="px-6 py-4 font-medium">Upload Date</th>
              <th className="px-6 py-4 font-medium">Downloads</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-orange-primary" />
                      <span className="font-medium">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-medium border border-blue-500/20">
                      {file.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{file.size}</td>
                  <td className="px-6 py-4 text-gray-400">{file.uploadedBy}</td>
                  <td className="px-6 py-4 text-gray-400">{file.uploadedDate}</td>
                  <td className="px-6 py-4 text-gray-400">{file.downloads}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDownload(file.name)}
                        className="p-1 text-gray-500 hover:text-white transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleShare(file.name)}
                        className="p-1 text-gray-500 hover:text-white transition-colors"
                        title="Share"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(file.id, file.name)}
                        className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-500 hover:text-white transition-colors"
                        title="More options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3 text-gray-500">
                    <FileText className="w-12 h-12 opacity-20" />
                    <p className="text-sm">No files found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
        <p className="text-sm text-orange-400">
          <strong>External Access:</strong> This folder is shared externally. Access will expire{' '}
          {folder.expiry.toLowerCase()}.
        </p>
      </div>

      {/* FAB for mobile only */}
      <button
        onClick={onUploadFile}
        className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-orange-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-primary/90 transition-colors z-[60]"
      >
        <Upload className="w-5 h-5" />
      </button>
    </div>
  );
}
