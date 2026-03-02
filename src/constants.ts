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
  Baby
} from 'lucide-react';

export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'General' },
  { id: 'departments', label: 'Departments', icon: FolderTree, section: 'General' },
  { id: 'patients', label: 'Patients', icon: Users, section: 'General' },
  { id: 'folders', label: 'Public Medical Folders', icon: Share2, section: 'General' },
  { id: 'activity', label: 'Activity & Audit', icon: Activity, section: 'General', hasSubmenu: true },
  { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck, section: 'Management' },
  { id: 'admin', label: 'Administration', icon: Settings, section: 'Management' },
];

export const DEPARTMENTS = [
  { id: 'cardiology', name: 'Cardiology', icon: HeartPulse, patients: 225, size: '3.85GB', lastUpdate: '3 mins ago' },
  { id: 'oncology', name: 'Oncology', icon: Stethoscope, patients: 8, size: '235mb', lastUpdate: '9 mins ago' },
  { id: 'pediatrics', name: 'Pediatrics', icon: Baby, patients: 44, size: '1.09GB', lastUpdate: '2hrs ago' },
  { id: 'laboratory', name: 'Laboratory', icon: Microscope, patients: 9086, size: '33.69GB', lastUpdate: '57 secs ago' },
];

export const STATUS_COLORS: Record<string, string> = {
  'Discharged': 'bg-green-500/10 text-green-500 border-green-500/20',
  'ICU': 'bg-red-500/10 text-red-500 border-red-500/20',
  'Admitted': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'Outpatient': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
};
