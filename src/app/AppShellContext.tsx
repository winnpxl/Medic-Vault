import { createContext, useContext } from 'react';
import { Patient } from '../types';

export type ToastType = 'success' | 'error' | 'info';

/** State and actions shared by every screen inside the signed-in app (/app/*). */
export interface AppShell {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  showToast: (type: ToastType, message: string) => void;
  openModal: (modal: string) => void;
  openPatientModal: (patient: Patient, modal: string) => void;
}

export const AppShellContext = createContext<AppShell | undefined>(undefined);

export function useAppShell(): AppShell {
  const shell = useContext(AppShellContext);
  if (!shell) {
    throw new Error('useAppShell must be used inside AppLayout');
  }
  return shell;
}

/** Same matching the old single-page App used: free-text search, status filter, optional department. */
export function filterPatients(
  patients: Patient[],
  { search, status, department }: { search: string; status: string | null; department?: string | null },
): Patient[] {
  const query = search.toLowerCase();
  return patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query) ||
      p.age.toString().includes(query) ||
      p.status.toLowerCase().includes(query) ||
      p.department.toLowerCase().includes(query) ||
      p.lastUpdated.toLowerCase().includes(query);
    const matchesStatus = status ? p.status === status : true;
    const matchesDept = department ? p.department === department : true;
    return matchesSearch && matchesStatus && matchesDept;
  });
}
