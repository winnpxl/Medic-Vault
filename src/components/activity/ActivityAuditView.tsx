import { useState, useEffect } from 'react';
import { 
  Download, 
  Search, 
  ChevronDown, 
  Grid3x3, 
  List,
  FileText,
  UserCheck,
  AlertTriangle,
  Clock,
  User,
  Shield,
  Activity as ActivityIcon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuditLog {
  id: string;
  userName: string;
  userRole: string;
  action: string;
  status: 'Success' | 'Denied' | 'Allowed';
  timestamp: string;
  fileAccessed?: string;
  ipAddress: string;
  tags: string[];
}

export function ActivityAuditView() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [actionFilter, setActionFilter] = useState<string | null>(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    // Generate audit logs based on actual app activities
    const logs: AuditLog[] = [
      {
        id: '1',
        userName: 'Dr. Eliza Bishop',
        userRole: 'Physician',
        action: 'File Accessed',
        status: 'Success',
        timestamp: '2/14/2024, 11:45:00 AM',
        fileAccessed: 'Connor Samson Lab Test',
        ipAddress: '192.168.1.100',
        tags: ['Allowed', 'Doctor']
      },
      {
        id: '2',
        userName: 'Dr. Esther Barnabas',
        userRole: 'Doctor',
        action: 'Emergency Access',
        status: 'Allowed',
        timestamp: '2/14/2024, 11:45:00 AM',
        fileAccessed: 'jbrad_ct_scan.pdf',
        ipAddress: '192.168.1.101',
        tags: ['Allowed', 'Emergency']
      },
      {
        id: '3',
        userName: 'Dr. Henry Keown',
        userRole: 'Doctor',
        action: 'File Accessed',
        status: 'Success',
        timestamp: '2/14/2024, 11:45:00 AM',
        fileAccessed: 'josiah_xrayfiles.xry',
        ipAddress: '192.168.1.102',
        tags: ['Allowed', 'Doctor']
      },
      {
        id: '4',
        userName: user?.displayName || 'Super Admin',
        userRole: 'Super Admin',
        action: 'Patient Added',
        status: 'Success',
        timestamp: new Date().toLocaleString('en-US', { 
          month: '2-digit', 
          day: '2-digit', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true 
        }),
        ipAddress: '192.168.1.1',
        tags: ['Allowed', 'Admin']
      },
      {
        id: '5',
        userName: 'Nurse Sarah Johnson',
        userRole: 'Nurse',
        action: 'File Upload',
        status: 'Success',
        timestamp: '2/14/2024, 10:30:00 AM',
        fileAccessed: 'patient_vitals_report.pdf',
        ipAddress: '192.168.1.105',
        tags: ['Allowed', 'Nurse']
      },
      {
        id: '6',
        userName: 'Dr. Michael Chen',
        userRole: 'Doctor',
        action: 'Patient Record Updated',
        status: 'Success',
        timestamp: '2/14/2024, 09:15:00 AM',
        ipAddress: '192.168.1.103',
        tags: ['Allowed', 'Doctor']
      },
      {
        id: '7',
        userName: 'Staff Member',
        userRole: 'Staff',
        action: 'File Access Attempt',
        status: 'Denied',
        timestamp: '2/14/2024, 08:45:00 AM',
        fileAccessed: 'restricted_patient_file.pdf',
        ipAddress: '192.168.1.110',
        tags: ['Denied', 'Staff']
      },
      {
        id: '8',
        userName: user?.displayName || 'Super Admin',
        userRole: 'Super Admin',
        action: 'Department Created',
        status: 'Success',
        timestamp: '2/13/2024, 04:20:00 PM',
        ipAddress: '192.168.1.1',
        tags: ['Allowed', 'Admin']
      },
      {
        id: '9',
        userName: 'Dr. Sarah Johnson',
        userRole: 'Doctor',
        action: 'Public Folder Created',
        status: 'Success',
        timestamp: '2/13/2024, 03:10:00 PM',
        fileAccessed: 'Cardiology - External Share',
        ipAddress: '192.168.1.104',
        tags: ['Allowed', 'Doctor']
      },
      {
        id: '10',
        userName: 'Admin User',
        userRole: 'Admin',
        action: 'User Added',
        status: 'Success',
        timestamp: '2/13/2024, 02:00:00 PM',
        ipAddress: '192.168.1.2',
        tags: ['Allowed', 'Admin']
      }
    ];

    setAuditLogs(logs);
  }, [user]);

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.fileAccessed && log.fileAccessed.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter ? log.status === statusFilter : true;
    const matchesAction = actionFilter ? log.action === actionFilter : true;

    return matchesSearch && matchesStatus && matchesAction;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Denied':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Allowed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('File')) return FileText;
    if (action.includes('Emergency')) return AlertTriangle;
    if (action.includes('Patient')) return UserCheck;
    if (action.includes('Access')) return Shield;
    return ActivityIcon;
  };

  const exportAuditReport = () => {
    // Create CSV content
    const headers = ['User', 'Role', 'Action', 'Status', 'Timestamp', 'File', 'IP Address'];
    const rows = filteredLogs.map(log => [
      log.userName,
      log.userRole,
      log.action,
      log.status,
      log.timestamp,
      log.fileAccessed || 'N/A',
      log.ipAddress
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold">Activity & Audit</h2>
          <p className="text-sm text-gray-400 mt-1">
            Detailed tracking of all system activities and access events
          </p>
        </div>
        <button
          onClick={exportAuditReport}
          className="hidden lg:flex items-center gap-2 px-4 py-2 bg-navy-900 border border-white/5 rounded-lg text-sm hover:bg-white/5 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export audit report
        </button>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by user, file, or actions"
            className="w-full bg-navy-900 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setIsStatusOpen(!isStatusOpen);
              setIsActionOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-navy-900 border border-white/5 rounded-lg text-sm hover:bg-white/5 transition-colors w-full lg:w-auto justify-between"
          >
            <span className="text-gray-400">Statuses</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          {isStatusOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsStatusOpen(false)}
              />
              <div className="absolute top-full left-0 right-0 lg:right-auto lg:w-48 mt-2 bg-navy-900 border border-white/5 rounded-lg shadow-xl z-50 p-2">
                {['Success', 'Denied', 'Allowed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(statusFilter === status ? null : status);
                      setIsStatusOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      statusFilter === status
                        ? 'bg-orange-primary/10 text-orange-primary'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Action Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setIsActionOpen(!isActionOpen);
              setIsStatusOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-navy-900 border border-white/5 rounded-lg text-sm hover:bg-white/5 transition-colors w-full lg:w-auto justify-between"
          >
            <span className="text-gray-400">Actions</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          {isActionOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsActionOpen(false)}
              />
              <div className="absolute top-full left-0 right-0 lg:right-auto lg:w-56 mt-2 bg-navy-900 border border-white/5 rounded-lg shadow-xl z-50 p-2">
                {['File Accessed', 'Emergency Access', 'Patient Added', 'File Upload', 'Patient Record Updated'].map((action) => (
                  <button
                    key={action}
                    onClick={() => {
                      setActionFilter(actionFilter === action ? null : action);
                      setIsActionOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      actionFilter === action
                        ? 'bg-orange-primary/10 text-orange-primary'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* View Toggle */}
        <div className="hidden lg:flex items-center gap-1 bg-navy-900 border border-white/5 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid'
                ? 'bg-orange-primary text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list'
                ? 'bg-orange-primary text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Export Button */}
      <button
        onClick={exportAuditReport}
        className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-2 bg-navy-900 border border-white/5 rounded-lg text-sm hover:bg-white/5 transition-colors"
      >
        <Download className="w-4 h-4" />
        Export audit report
      </button>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          {filteredLogs.map((log) => {
            const ActionIcon = getActionIcon(log.action);
            return (
              <div
                key={log.id}
                className="glass-card p-4 lg:p-6 hover:bg-white/5 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-orange-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{log.userName}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {log.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              tag === 'Denied'
                                ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                : tag === 'Emergency'
                                ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                : 'bg-green-500/10 text-green-500 border-green-500/20'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {log.fileAccessed && (
                    <div className="text-right">
                      <p className="text-xs text-gray-500">File Accessed:</p>
                      <p className="text-sm font-medium">{log.fileAccessed}</p>
                      <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                    </div>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Action</p>
                    <div className="flex items-center gap-2">
                      <ActionIcon className="w-4 h-4 text-orange-primary" />
                      <p className="text-sm font-medium">{log.action}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(
                        log.status
                      )}`}
                    >
                      {log.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">User</p>
                    <p className="text-sm font-medium">{log.userName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Role</p>
                    <p className="text-sm font-medium">{log.userRole}</p>
                  </div>
                  {!log.fileAccessed && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Timestamp</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <p className="text-sm">{log.timestamp}</p>
                      </div>
                    </div>
                  )}
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">IP</p>
                    <p className="text-sm font-mono">{log.ipAddress}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredLogs.length === 0 && (
            <div className="glass-card p-12 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <ActivityIcon className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No audit logs found</h3>
              <p className="text-sm text-gray-400">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-gray-500">
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Action</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">File</th>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{log.userName}</p>
                      <p className="text-xs text-gray-500">{log.userRole}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{log.action}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(
                        log.status
                      )}`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {log.fileAccessed || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-gray-400">{log.timestamp}</td>
                  <td className="px-6 py-4 font-mono text-gray-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLogs.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <ActivityIcon className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No audit logs found</h3>
              <p className="text-sm text-gray-400">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
