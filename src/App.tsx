import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FolderTree, 
  Users, 
  Share2, 
  Activity, 
  ShieldCheck, 
  Settings, 
  ChevronDown,
  Plus,
  Search,
  Bell,
  AlertTriangle,
  MoreHorizontal,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Stethoscope,
  HeartPulse,
  Microscope,
  Baby,
  User,
  ExternalLink,
  Clock,
  ChevronUp,
  LogOut,
  Moon,
  UserCircle,
  FileText,
  ChevronRight as ChevronRightIcon,
  BarChart3,
  File,
  Upload,
  Archive,
  Eye,
  Edit,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { SIDEBAR_ITEMS, DEPARTMENTS, STATUS_COLORS } from './constants';

interface Patient {
  id: string;
  name: string;
  age: number;
  status: string;
  files: number;
  department: string;
  lastUpdated: string;
}

interface Stats {
  recentlyAccessed: number;
  pendingReviews: number;
  externalShares: number;
  accessAlerts: number;
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deptTab, setDeptTab] = useState('Patients');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data));
    
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const filteredPatients = patients.filter(p => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(query) || 
      p.id.toLowerCase().includes(query) ||
      p.age.toString().includes(query) ||
      p.status.toLowerCase().includes(query) ||
      p.department.toLowerCase().includes(query) ||
      p.lastUpdated.toLowerCase().includes(query);
    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    const matchesDept = selectedDept ? p.department === selectedDept : true;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const renderContent = () => {
    if (selectedPatient) {
      return <PatientProfile patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
    }

    if (selectedDept) {
      const dept = DEPARTMENTS.find(d => d.name === selectedDept);
      return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="space-y-2">
            <button 
              onClick={() => setSelectedDept(null)}
              className="flex items-center gap-1 text-gray-500 hover:text-white text-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Departments
            </button>
            <h2 className="text-3xl font-bold">{selectedDept}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Total Patients" 
              value={dept?.patients || 0} 
              icon={Users} 
              iconColor="text-blue-500"
            />
            <StatCard 
              title="Total Files" 
              value={73} 
              icon={FileText} 
              iconColor="text-orange-500"
            />
            <StatCard 
              title="Department Activities" 
              value={89} 
              icon={BarChart3} 
              iconColor="text-green-500"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 border-b border-white/5">
              {['Patients', 'Medical Categories', 'Recent Activity', 'Files'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setDeptTab(tab)}
                  className={`pb-4 text-sm font-medium transition-colors relative ${deptTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {tab}
                  {deptTab === tab && <motion.div layoutId="activeDeptTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-primary" />}
                </button>
              ))}
            </div>

            {deptTab === 'Patients' ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex-1 max-w-sm relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Filter patients..."
                      className="w-full bg-navy-900 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
                      <Plus className="w-4 h-4" /> Status
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
                      <Plus className="w-4 h-4" /> Department
                    </button>
                    <div className="h-6 w-px bg-white/5 mx-2"></div>
                    <button className="flex items-center gap-2 px-3 py-2 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> View
                    </button>
                  </div>
                </div>

                <div className="glass-card overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-500">
                        <th className="px-6 py-4 font-medium">Name</th>
                        <th className="px-6 py-4 font-medium">Patient ID</th>
                        <th className="px-6 py-4 font-medium">Age</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Files</th>
                        <th className="px-6 py-4 font-medium">Department</th>
                        <th className="px-6 py-4 font-medium">Last Updated</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredPatients.map((patient) => (
                        <tr 
                          key={patient.id} 
                          className="hover:bg-white/5 transition-colors group cursor-pointer"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <td className="px-6 py-4 font-medium">{patient.name}</td>
                          <td className="px-6 py-4 text-gray-400 font-mono">{patient.id}</td>
                          <td className="px-6 py-4">{patient.age}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${STATUS_COLORS[patient.status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
                              {patient.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">{patient.files} files</td>
                          <td className="px-6 py-4">{patient.department}</td>
                          <td className="px-6 py-4 text-gray-400">{patient.lastUpdated}</td>
                          <td className="px-6 py-4 text-right">
                            <PatientActionsDropdown patient={patient} onSelect={setSelectedPatient} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-6 py-4 flex items-center justify-between border-t border-white/5 text-gray-500 text-xs">
                    <div>0 of 100 row(s) selected.</div>
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <span>Rows per page</span>
                        <div className="flex items-center gap-1 bg-navy-900 border border-white/5 rounded px-2 py-1 cursor-pointer">
                          10 <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                      <span>Page 1 of 10</span>
                      <div className="flex items-center gap-1">
                        <button className="p-1 hover:text-white disabled:opacity-30"><ChevronsLeft className="w-4 h-4" /></button>
                        <button className="p-1 hover:text-white disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
                        <button className="p-1 hover:text-white disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
                        <button className="p-1 hover:text-white disabled:opacity-30"><ChevronsRight className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : deptTab === 'Files' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Patient Records', count: 45, size: '1.2 GB' },
                  { name: 'Lab Reports', count: 128, size: '850 MB' },
                  { name: 'Imaging Data', count: 32, size: '4.5 GB' },
                  { name: 'Consultation Notes', count: 210, size: '120 MB' },
                ].map((folder, i) => (
                  <div key={i} className="glass-card p-6 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-primary/10 rounded-xl flex items-center justify-center text-orange-primary">
                        <FolderTree className="w-6 h-6" />
                      </div>
                      <button className="p-1 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="font-bold mb-1">{folder.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{folder.count} items</span>
                      <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                      <span>{folder.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-500">
                  <LayoutDashboard className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">No data available</h4>
                  <p className="text-gray-500 text-sm">This section is currently being updated with real-time department data.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Dashboard</h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Recently Accessed Patients" 
                value={stats?.recentlyAccessed || 0} 
                subValue="+12 in the last hour" 
                icon={Users} 
                iconColor="text-blue-500"
              />
              <StatCard 
                title="Pending File Reviews" 
                value={stats?.pendingReviews || 0} 
                subValue="3 require urgent attention" 
                icon={Clock} 
                iconColor="text-orange-500"
              />
              <StatCard 
                title="External Shares Active" 
                value={stats?.externalShares || 0} 
                subValue="All compliant" 
                icon={ExternalLink} 
                iconColor="text-green-500"
              />
              <StatCard 
                title="Access Alerts" 
                value={stats?.accessAlerts || 0} 
                subValue="1 unauthorized attempt blocked" 
                icon={AlertTriangle} 
                iconColor="text-red-500"
              />
            </div>

            {/* Patient Access Table */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Patient Access</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Filter patients..."
                      className="bg-navy-900 border border-white/5 rounded-lg py-1.5 pl-3 pr-8 text-sm focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
                      <Plus className="w-4 h-4" /> Status
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-48 bg-navy-900 border border-white/5 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
                      {['Discharged', 'ICU', 'Admitted', 'Outpatient'].map(status => (
                        <button 
                          key={status}
                          onClick={() => setStatusFilter(statusFilter === status ? null : status)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${statusFilter === status ? 'bg-orange-primary/10 text-orange-primary' : 'hover:bg-white/5'}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
                    <Plus className="w-4 h-4" /> Department
                  </button>
                  <div className="h-6 w-px bg-white/5 mx-2"></div>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> View
                  </button>
                </div>
              </div>

              <div className="glass-card overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500">
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Patient ID</th>
                      <th className="px-6 py-4 font-medium">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                          Age <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Files</th>
                      <th className="px-6 py-4 font-medium">Department</th>
                      <th className="px-6 py-4 font-medium">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                          Last Updated <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredPatients.map((patient) => (
                      <tr 
                        key={patient.id} 
                        className="hover:bg-white/5 transition-colors group cursor-pointer"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <td className="px-6 py-4 font-medium">{patient.name}</td>
                        <td className="px-6 py-4 text-gray-400 font-mono">{patient.id}</td>
                        <td className="px-6 py-4">{patient.age}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${STATUS_COLORS[patient.status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{patient.files} files</td>
                        <td className="px-6 py-4">{patient.department}</td>
                        <td className="px-6 py-4 text-gray-400">{patient.lastUpdated}</td>
                        <td className="px-6 py-4 text-right">
                          <PatientActionsDropdown patient={patient} onSelect={setSelectedPatient} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="px-6 py-4 flex items-center justify-between border-t border-white/5 text-gray-500 text-xs">
                  <div>{filteredPatients.length} of {patients.length} row(s) selected.</div>
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <span>Rows per page</span>
                      <div className="flex items-center gap-1 bg-navy-900 border border-white/5 rounded px-2 py-1 cursor-pointer">
                        10 <ChevronDown className="w-3 h-3" />
                      </div>
                    </div>
                    <span>Page 1 of 1</span>
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:text-white disabled:opacity-30"><ChevronsLeft className="w-4 h-4" /></button>
                      <button className="p-1 hover:text-white disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
                      <button className="p-1 hover:text-white disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
                      <button className="p-1 hover:text-white disabled:opacity-30"><ChevronsRight className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      case 'patients':
        return (
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Patients Registry</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search all patients..."
                    className="bg-navy-900 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="btn-secondary">
                  <Filter className="w-4 h-4" /> Filter
                </button>
              </div>
            </div>

            <div className="glass-card overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500">
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Patient ID</th>
                    <th className="px-6 py-4 font-medium">Age</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Department</th>
                    <th className="px-6 py-4 font-medium">Last Updated</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredPatients.map((patient) => (
                    <tr 
                      key={patient.id} 
                      className="hover:bg-white/5 transition-colors group cursor-pointer"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <td className="px-6 py-4 font-medium">{patient.name}</td>
                      <td className="px-6 py-4 text-gray-400 font-mono">{patient.id}</td>
                      <td className="px-6 py-4">{patient.age}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${STATUS_COLORS[patient.status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{patient.department}</td>
                      <td className="px-6 py-4 text-gray-400">{patient.lastUpdated}</td>
                      <td className="px-6 py-4 text-right">
                        <PatientActionsDropdown patient={patient} onSelect={setSelectedPatient} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'departments':
        return (
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Departments</h2>
              <button 
                onClick={() => setActiveModal('department')}
                className="bg-orange-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-orange-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" /> Create new department
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DEPARTMENTS.map(dept => (
                <div 
                  key={dept.id} 
                  onClick={() => setSelectedDept(dept.name)}
                  className="glass-card p-5 group hover:border-orange-primary/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-orange-primary/10 transition-colors">
                      <dept.icon className="w-5 h-5 text-gray-400 group-hover:text-orange-primary" />
                    </div>
                    <span className="font-semibold">{dept.name}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Patients</span>
                      <span className="font-medium">{dept.patients.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-600 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Size</span>
                      <span className="font-medium">{dept.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Last update</span>
                      <span className="font-medium">{dept.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'folders':
        return (
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Public Medical Folders</h2>
              <button className="bg-orange-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-orange-primary/90 transition-colors">
                <Plus className="w-4 h-4" /> Create shareable folder
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Cardiology - External Share', files: 12, expiry: '2 days left', views: 45 },
                { name: 'Oncology Research - Partner A', files: 8, expiry: 'Expired', views: 128 },
                { name: 'Pediatrics - General Public', files: 24, expiry: '14 days left', views: 8 },
              ].map((folder, i) => (
                <div key={i} className="glass-card p-3 group hover:border-orange-primary/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-orange-primary/10 transition-colors">
                      <Share2 className="w-6 h-6 text-gray-400 group-hover:text-orange-primary" />
                    </div>
                    <button className="p-1 text-gray-500 hover:text-white transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  <h4 className="font-semibold mb-1">{folder.name}</h4>
                  <p className="text-xs text-gray-500 mb-6">{folder.files} files • {folder.views} views</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${folder.expiry === 'Expired' ? 'text-red-500' : 'text-green-500'}`}>
                      {folder.expiry}
                    </span>
                    <button className="text-xs text-orange-primary hover:underline font-medium">Manage access</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <FolderTree className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-semibold text-white mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
              <p>This section is currently under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-navy-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-primary rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
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
              <ChevronDown className={`w-4 h-4 text-gray-500 group-hover:text-white transition-transform ${isUploadOpen ? 'rotate-180' : ''}`} />
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
                    { label: 'Add new file', icon: File, action: () => setActiveModal('file') },
                    { label: 'Add a new folder', icon: FolderTree, action: () => setActiveModal('folder') },
                    { label: 'Create patient data', icon: UserCircle, action: () => setActiveModal('user') },
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
            <p className="px-4 text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-2">General</p>
            <div className="space-y-1">
              {SIDEBAR_ITEMS.filter(item => item.section === 'General').map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSelectedDept(null);
                  }}
                  className={(activeTab === item.id && !selectedDept) ? 'sidebar-item-active w-full' : 'sidebar-item w-full'}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.hasSubmenu && <ChevronDown className="w-4 h-4 opacity-50" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="px-4 text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-2">Management</p>
            <div className="space-y-1">
              {SIDEBAR_ITEMS.filter(item => item.section === 'Management').map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSelectedDept(null);
                  }}
                  className={(activeTab === item.id && !selectedDept) ? 'sidebar-item-active w-full' : 'sidebar-item w-full'}
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
              src="https://picsum.photos/seed/doc/100/100" 
              className="w-10 h-10 rounded-full object-cover border border-white/10"
              alt="User"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">Dr. Daryl Chen</p>
              <p className="text-xs text-gray-500">dchen@medicover.org</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
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
                  { label: 'Profile settings', icon: UserCircle, action: () => {} },
                  { label: `Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`, icon: Moon, action: () => setIsDarkMode(!isDarkMode) },
                  { label: 'Log out', icon: LogOut, danger: true, action: () => {} },
                ].map((item, i) => (
                  <button 
                    key={i}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition-colors text-left ${item.danger ? 'text-red-500' : ''}`}
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 gap-4">
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="search patients, files, departments, e.t.c"
              className="w-full bg-navy-900/50 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-primary/50 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-primary text-[10px] font-bold text-white rounded-full flex items-center justify-center border-2 border-navy-950">4</span>
            </button>
            <button className="bg-orange-primary/10 text-orange-primary border border-orange-primary/20 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-orange-primary/20 transition-colors">
              <AlertTriangle className="w-4 h-4" />
              Grant emergency access
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
      </main>

      {/* Overlays */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <NotificationPanel 
            onClose={() => setIsNotificationsOpen(false)} 
            onOpenSettings={() => setActiveModal('notification-settings')}
          />
        )}
        {activeModal === 'file' && (
          <CenterModal title="Upload New Medical File" onClose={() => setActiveModal(null)}>
            <FileUploadModalContent onClose={() => setActiveModal(null)} />
          </CenterModal>
        )}
        {activeModal === 'folder' && (
          <CenterModal title="Create New Folder" onClose={() => setActiveModal(null)}>
            <CreateFolderModalContent onClose={() => setActiveModal(null)} />
          </CenterModal>
        )}
        {activeModal === 'user' && (
          <CenterModal title="Add New User" onClose={() => setActiveModal(null)}>
            <AddUserModalContent onClose={() => setActiveModal(null)} />
          </CenterModal>
        )}
        {activeModal === 'department' && (
          <CenterModal title="Create New Department" onClose={() => setActiveModal(null)}>
            <CreateDepartmentModalContent onClose={() => setActiveModal(null)} />
          </CenterModal>
        )}
        {activeModal === 'notification-settings' && (
          <RightModal title="Notification Settings" onClose={() => setActiveModal(null)}>
            <NotificationSettingsModalContent />
          </RightModal>
        )}
      </AnimatePresence>
    </div>
  );
}

function RightModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md h-full bg-navy-950 border-l border-white/10 flex flex-col shadow-2xl light-mode:bg-white light-mode:border-gray-200"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between light-mode:border-gray-100">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors light-mode:hover:bg-gray-100">
            <Plus className="w-6 h-6 rotate-45" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function NotificationPanel({ onClose, onOpenSettings }: { onClose: () => void; onOpenSettings: () => void }) {
  const [activeFilter, setActiveFilter] = useState('All');
  
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md h-full bg-navy-950 border-l border-white/10 flex flex-col shadow-2xl light-mode:bg-white light-mode:border-gray-200"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between light-mode:border-gray-100">
          <h3 className="text-xl font-bold">Notifications</h3>
          <div className="flex items-center gap-2">
            <button className="text-xs text-orange-primary font-medium hover:underline">Mark All as Read</button>
            <button 
              onClick={onOpenSettings}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors light-mode:hover:bg-gray-100"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors light-mode:hover:bg-gray-100">
              <Plus className="w-6 h-6 rotate-45" />
            </button>
          </div>
        </div>
        
        <div className="px-6 py-4 border-b border-white/5 flex gap-2 overflow-x-auto light-mode:border-gray-100">
          {['All', 'Patient Updates', 'Access & Permissions', 'External Shares', 'System Alerts'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeFilter === filter ? 'bg-orange-primary text-white' : 'bg-white/5 text-gray-400 hover:text-white light-mode:bg-gray-100 light-mode:text-gray-600'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <NotificationItem 
            priority="green"
            title="New Lab Result Uploaded"
            context="Patient: ID 4421 | John Okafor"
            summary="Uploaded by: Lab Unit"
            time="2 minutes ago"
            actionLabel="View File"
          />
          <NotificationItem 
            priority="orange"
            title="Emergency Access Used"
            context="Dr. Adebayo accessed restricted oncology file"
            summary="Reason logged"
            time="10 minutes ago"
            actionLabel="View Audit"
          />
          <NotificationItem 
            priority="green"
            title="External Folder Accessed"
            context="Insurance Portal viewed shared documents"
            summary="3 views total"
            time="Today at 10:45 AM"
            actionLabel="View Share Details"
          />
          <NotificationItem 
            priority="red"
            title="Unusual Access Pattern"
            context="Multiple attempts to access restricted patient folder"
            summary="Review recommended"
            time="1 hour ago"
            actionLabel="Review Activity"
          />
        </div>
      </motion.div>
    </div>
  );
}

function NotificationItem({ priority, title, context, summary, time, actionLabel }: any) {
  const priorityColors: any = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500'
  };

  return (
    <div className="p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group light-mode:border-gray-100 light-mode:hover:bg-gray-50">
      <div className="flex gap-3">
        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${priorityColors[priority]}`} />
        <div className="flex-1 space-y-1">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-semibold">{title}</h4>
            <span className="text-[10px] text-gray-500">{time}</span>
          </div>
          <p className="text-xs text-gray-400 font-medium">{context}</p>
          <p className="text-[11px] text-gray-500">{summary}</p>
          <div className="pt-3">
            <button className="text-xs font-bold text-orange-primary hover:underline">{actionLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileUploadModalContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 1: Location Context (Non-Editable)</p>
        <div className="p-4 rounded-lg bg-white/5 space-y-2 light-mode:bg-gray-50">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Department</span>
            <span className="font-medium">Radiology</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Patient</span>
            <span className="font-medium">ID 4421 | John Okafor</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Category</span>
            <span className="font-medium">Imaging</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 2: File Upload</p>
        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center space-y-4 hover:border-orange-primary/50 transition-colors cursor-pointer light-mode:border-gray-200">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium">Drag & Drop Area</p>
            <p className="text-xs text-gray-500 mt-1">Accepted Formats: PDF, JPG, PNG, DOCX, DICOM</p>
          </div>
          <button className="btn-secondary mx-auto">Browse File</button>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 3: Required Metadata</p>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">File Title</label>
            <input type="text" className="input-field" placeholder="Enter file title" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Medical Category</label>
            <select className="input-field appearance-none">
              <option>Lab Results</option>
              <option>Imaging</option>
              <option>Prescription</option>
              <option>Consultation Note</option>
              <option>Surgical Report</option>
              <option>Discharge Summary</option>
              <option>Insurance</option>
              <option>Administrative</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-500 font-medium">Date of Document</label>
              <input type="date" className="input-field" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-500 font-medium">Priority Level</label>
              <select className="input-field">
                <option>Normal</option>
                <option>Urgent</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Attending Physician</label>
            <input type="text" className="input-field" placeholder="Dr. Name" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Tags</label>
            <input type="text" className="input-field" placeholder="Condition, treatment type, keywords" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 4: Access Controls (Role-Aware)</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Restrict to Department Only</span>
            <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Mark as Sensitive</span>
            <input type="checkbox" className="w-4 h-4 accent-orange-primary" />
          </div>
        </div>
      </section>

      <div className="pt-6 flex gap-3">
        <button className="btn-secondary flex-1 justify-center">Cancel</button>
        <button className="btn-primary flex-1 justify-center">Upload File</button>
      </div>
    </div>
  );
}

function CreateFolderModalContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 1: Location Context (Non-Editable)</p>
        <div className="p-4 rounded-lg bg-white/5 space-y-2 light-mode:bg-gray-50">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Parent Location</span>
            <span className="font-medium">Department / Cardiology</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 2: Folder Details</p>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Folder Name</label>
            <input type="text" className="input-field" placeholder="Enter folder name" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Folder Type</label>
            <select className="input-field">
              <option>Patient Subfolder</option>
              <option>Department Folder</option>
              <option>Institutional Resource</option>
              <option>Temporary Review Folder</option>
            </select>
          </div>
          <textarea className="input-field h-24 resize-none" placeholder="Description (Optional)"></textarea>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 3: Permission Settings</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Inherit Parent Permissions</span>
            <div className="w-10 h-5 rounded-full bg-orange-primary relative cursor-pointer">
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Allow Custom Access (Admin only)</span>
            <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 4: External Sharing Eligibility</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Allow External Sharing</span>
            <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Requires Admin Approval</span>
            <div className="w-10 h-5 rounded-full bg-orange-primary relative cursor-pointer">
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-6 flex gap-3">
        <button className="btn-secondary flex-1 justify-center">Cancel</button>
        <button className="btn-primary flex-1 justify-center">Create Folder</button>
      </div>
    </div>
  );
}

function AddUserModalContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 1: User Information</p>
        <div className="space-y-4">
          <input type="text" className="input-field" placeholder="Full Name" />
          <input type="email" className="input-field" placeholder="Email Address" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" className="input-field" placeholder="Employee ID" />
            <input type="text" className="input-field" placeholder="Phone Number" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 2: Role Assignment</p>
        <select className="input-field">
          <option>Doctor</option>
          <option>Nurse</option>
          <option>Lab Scientist</option>
          <option>Admin</option>
          <option>Medical Records Officer</option>
          <option>External Specialist</option>
        </select>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 3: Department Assignment</p>
        <div className="space-y-4">
          <select className="input-field">
            <option>Primary Department</option>
            <option>Cardiology</option>
            <option>Radiology</option>
          </select>
          <input type="text" className="input-field" placeholder="Secondary Departments (Optional)" />
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 4: Access Scope</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 accent-orange-primary" />
            <span className="text-sm">Department-Level Access</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 accent-orange-primary" />
            <span className="text-sm">Patient-Specific Access (Optional)</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 accent-orange-primary" />
            <span className="text-sm">Global Access (Admin only)</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 5: Security Settings</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Require Two-Factor Authentication</span>
            <div className="w-10 h-5 rounded-full bg-orange-primary relative cursor-pointer">
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Emergency Override Permission</span>
            <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-6 flex gap-3">
        <button className="btn-secondary flex-1 justify-center">Cancel</button>
        <button className="btn-primary flex-1 justify-center">Create User</button>
      </div>
    </div>
  );
}

function CreateDepartmentModalContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 1: Department Identity</p>
        <div className="space-y-4">
          <input type="text" className="input-field" placeholder="Department Name" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" className="input-field" placeholder="Department Code" />
            <select className="input-field">
              <option>Clinical</option>
              <option>Diagnostic</option>
              <option>Surgical</option>
              <option>Administrative</option>
              <option>Support Services</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 2: Department Head & Ownership</p>
        <div className="space-y-4">
          <input type="text" className="input-field" placeholder="Assign Department Head (Search User)" />
          <input type="text" className="input-field" placeholder="Backup Supervisor (Optional)" />
          <input type="email" className="input-field" placeholder="Primary Contact Email" />
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 3: Access & Permission Defaults</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Allow Cross-Department Access</span>
            <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Allow External Sharing by Default</span>
            <div className="w-10 h-5 rounded-full bg-white/10 relative cursor-pointer">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 4: Operational Settings</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Enable Emergency Override</span>
            <div className="w-10 h-5 rounded-full bg-orange-primary relative cursor-pointer">
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Require File Metadata Before Upload</span>
            <div className="w-10 h-5 rounded-full bg-orange-primary relative cursor-pointer">
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Section 6: Status</p>
        <select className="input-field">
          <option>Active</option>
          <option>Inactive</option>
          <option>Under Setup</option>
        </select>
      </section>

      <div className="pt-6 flex gap-3">
        <button className="btn-secondary flex-1 justify-center">Cancel</button>
        <button className="btn-primary flex-1 justify-center">Create Department</button>
      </div>
    </div>
  );
}

function NotificationSettingsModalContent() {
  return (
    <div className="space-y-6">
      {[
        { label: 'Notify on patient file uploads', default: true },
        { label: 'Notify on access requests', default: true },
        { label: 'Notify on external share activity', default: true },
        { label: 'Notify on emergency overrides', default: true, mandatory: true },
        { label: 'Email notifications', default: false },
        { label: 'Daily summary digest', default: false },
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="text-sm font-medium">{item.label}</span>
          <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.default ? 'bg-orange-primary' : 'bg-white/10'}`}>
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${item.default ? 'right-1' : 'left-1'}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PatientProfile({ patient, onBack }: { patient: Patient; onBack: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8">
      <div className="space-y-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-gray-500 hover:text-white text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> {patient.department}
        </button>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-xl">
            <img 
              src={`https://picsum.photos/seed/${patient.id}/400/400`} 
              alt={patient.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Name</p>
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <div className="pt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[patient.status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
                  {patient.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Patient ID</p>
              <p className="text-lg font-mono font-bold text-white">{patient.id}</p>
              <div className="pt-4 space-y-1">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Department</p>
                <p className="text-sm font-semibold">{patient.department}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Age</p>
              <p className="text-lg font-bold text-white">{patient.age}</p>
              <div className="pt-4 space-y-1">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Date Registered</p>
                <p className="text-sm font-semibold">{patient.lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="search files"
              className="w-full bg-navy-900 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-navy-900 border border-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
            <LayoutDashboard className="w-4 h-4" /> View
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { name: 'cardioscan_new.png', type: 'PNG', size: '658kb' },
            { name: 'diagnosis.jpeg', type: 'JPEG', size: '658kb' },
            { name: 'cardioscan_new.xry', type: 'XRAY', size: '658kb' },
            { name: 'permission.txt', type: 'TEXT', size: '658kb' },
            { name: 'background.pdf', type: 'PDF', size: '658kb' },
          ].map((file, i) => (
            <div key={i} className="glass-card p-3 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="aspect-square bg-white/5 rounded-lg flex flex-col items-center justify-center mb-4 relative overflow-hidden">
                <div className="text-[10px] font-bold text-gray-500 mb-1">{file.type}</div>
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h4 className="text-xs font-bold truncate mb-2">{file.name}</h4>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500">File Size</p>
                  <p className="text-[10px] font-bold">{file.size}</p>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="w-5 h-5 rounded-full border border-navy-950 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${j + i}/20/20`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PatientActionsDropdown({ patient, onSelect }: { patient: Patient; onSelect: (p: Patient) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 text-gray-500 hover:text-white transition-colors"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-navy-900 border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              {[
                { label: 'View Full Details', icon: Eye, action: () => onSelect(patient) },
                { label: 'Edit', icon: Edit, action: () => {} },
                { label: 'Check Status', icon: CheckCircle, action: () => {} },
                { label: 'Archive', icon: Archive, action: () => {} },
                { label: 'Delete', icon: Trash2, action: () => {}, danger: true },
              ].map((item, i) => (
                <button 
                  key={i}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium hover:bg-white/5 transition-colors text-left ${item.danger ? 'text-red-500' : 'text-gray-300'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.action();
                    setIsOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ title, value, subValue, icon: Icon, iconColor }: any) {
  return (
    <div className="glass-card p-3 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">{title}</p>
          <h4 className="text-3xl font-bold">{value}</h4>
        </div>
        <div className={`${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {subValue && <p className="text-xs text-gray-500">{subValue}</p>}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}

function CenterModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ y: '20%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '20%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-2xl bg-navy-950 border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden light-mode:bg-white light-mode:border-gray-200"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between light-mode:border-gray-100">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors light-mode:hover:bg-gray-100">
            <Plus className="w-6 h-6 rotate-45" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 max-h-[80vh]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
