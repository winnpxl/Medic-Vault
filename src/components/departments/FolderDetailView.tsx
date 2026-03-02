import React, { useState } from 'react';
import {
  ChevronLeft,
  Search,
  LayoutDashboard,
  FileText,
  Download,
  Share2,
  Trash2,
  MoreHorizontal,
  Filter,
  ArrowUpDown,
} from 'lucide-react';

interface FolderDetailViewProps {
  folderName: string;
  departmentName: string;
  onBack: () => void;
}

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  category: string;
}

export function FolderDetailView({ folderName, departmentName, onBack }: FolderDetailViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Mock data - in real app, this would come from API based on folder
  const files: FileItem[] = [
    {
      id: '1',
      name: 'patient_record_PT000001.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'Dr. Sarah Johnson',
      uploadedDate: 'Mar 15, 2026',
      category: 'Medical Record',
    },
    {
      id: '2',
      name: 'lab_results_PT000002.pdf',
      type: 'PDF',
      size: '1.8 MB',
      uploadedBy: 'Lab Technician',
      uploadedDate: 'Mar 14, 2026',
      category: 'Lab Results',
    },
    {
      id: '3',
      name: 'xray_scan_PT000003.dcm',
      type: 'DICOM',
      size: '15.2 MB',
      uploadedBy: 'Radiology Dept',
      uploadedDate: 'Mar 13, 2026',
      category: 'Imaging',
    },
    {
      id: '4',
      name: 'prescription_PT000004.pdf',
      type: 'PDF',
      size: '856 KB',
      uploadedBy: 'Dr. Michael Chen',
      uploadedDate: 'Mar 12, 2026',
      category: 'Prescription',
    },
    {
      id: '5',
      name: 'consultation_notes_PT000005.docx',
      type: 'DOCX',
      size: '124 KB',
      uploadedBy: 'Dr. Emily Rodriguez',
      uploadedDate: 'Mar 11, 2026',
      category: 'Consultation',
    },
    {
      id: '6',
      name: 'blood_test_PT000006.pdf',
      type: 'PDF',
      size: '1.2 MB',
      uploadedBy: 'Lab Technician',
      uploadedDate: 'Mar 10, 2026',
      category: 'Lab Results',
    },
    {
      id: '7',
      name: 'discharge_summary_PT000007.pdf',
      type: 'PDF',
      size: '3.1 MB',
      uploadedBy: 'Dr. Sarah Johnson',
      uploadedDate: 'Mar 9, 2026',
      category: 'Discharge Summary',
    },
    {
      id: '8',
      name: 'ecg_report_PT000008.pdf',
      type: 'PDF',
      size: '2.7 MB',
      uploadedBy: 'Cardiology Dept',
      uploadedDate: 'Mar 8, 2026',
      category: 'Diagnostic Report',
    },
  ];

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    return <FileText className="w-10 h-10 text-orange-primary" />;
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8">
      <div className="space-y-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-500 hover:text-white text-sm transition-colors light-mode:hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4" /> {departmentName}
        </button>
        <h2 className="text-3xl font-bold">{folderName}</h2>
        <p className="text-gray-500 text-sm">{filteredFiles.length} files</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search files..."
            className="w-full bg-navy-900 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none light-mode:bg-white light-mode:border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors light-mode:bg-white light-mode:border-gray-300 light-mode:text-gray-600 light-mode:hover:text-gray-900">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="flex items-center gap-2 px-3 py-2 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors light-mode:bg-white light-mode:border-gray-300 light-mode:text-gray-600 light-mode:hover:text-gray-900"
          >
            <LayoutDashboard className="w-4 h-4" /> {viewMode === 'grid' ? 'List' : 'Grid'}
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 light-mode:border-gray-200">
                <th className="px-6 py-4 font-medium">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors light-mode:hover:text-gray-900">
                    File Name <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Uploaded By</th>
                <th className="px-6 py-4 font-medium">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors light-mode:hover:text-gray-900">
                    Upload Date <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 light-mode:divide-gray-100">
              {filteredFiles.map((file) => (
                <tr
                  key={file.id}
                  className="hover:bg-white/5 transition-colors group cursor-pointer light-mode:hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <span className="font-medium">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-xs font-medium border border-blue-500/20">
                      {file.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 light-mode:text-gray-600">{file.size}</td>
                  <td className="px-6 py-4">{file.category}</td>
                  <td className="px-6 py-4 text-gray-400 light-mode:text-gray-600">
                    {file.uploadedBy}
                  </td>
                  <td className="px-6 py-4 text-gray-400 light-mode:text-gray-600">
                    {file.uploadedDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 text-gray-500 hover:text-white transition-colors light-mode:hover:text-gray-900">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-white transition-colors light-mode:hover:text-gray-900">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-white transition-colors light-mode:hover:text-gray-900">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer group light-mode:hover:bg-gray-50"
            >
              <div className="aspect-square bg-white/5 rounded-lg flex flex-col items-center justify-center mb-4 relative overflow-hidden light-mode:bg-gray-100">
                <div className="text-[10px] font-bold text-gray-500 mb-2">{file.type}</div>
                {getFileIcon(file.type)}
              </div>
              <h4 className="text-sm font-bold truncate mb-2">{file.name}</h4>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Size</span>
                  <span className="font-medium">{file.size}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium truncate ml-2">{file.category}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Uploaded</span>
                  <span className="font-medium">{file.uploadedDate}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between light-mode:border-gray-200">
                <button className="p-1 text-gray-500 hover:text-white transition-colors light-mode:hover:text-gray-900">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-500 hover:text-white transition-colors light-mode:hover:text-gray-900">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-500 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
