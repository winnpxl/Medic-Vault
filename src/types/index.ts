export interface Patient {
  id: string;
  name: string;
  age: number;
  status: string;
  files: number;
  department: string;
  lastUpdated: string;
}

export interface Stats {
  recentlyAccessed: number;
  pendingReviews: number;
  externalShares: number;
  accessAlerts: number;
}

export interface Department {
  id: string;
  name: string;
  icon: any;
  patients: number;
  size: string;
  lastUpdate: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  section: string;
  hasSubmenu?: boolean;
}

export interface NotificationItemProps {
  priority: 'green' | 'blue' | 'orange' | 'red';
  title: string;
  context: string;
  summary: string;
  time: string;
  actionLabel: string;
}

export interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}
