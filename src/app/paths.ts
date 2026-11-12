// URL helpers for the signed-in app. Phase 1 will insert the institution slug
// (/app/:orgSlug/...), so build links through these instead of hard-coding them.

const enc = encodeURIComponent;

export const paths = {
  dashboard: () => '/app',
  patients: () => '/app/patients',
  patient: (patientId: string) => `/app/patients/${enc(patientId)}`,
  departments: () => '/app/departments',
  department: (deptName: string) => `/app/departments/${enc(deptName)}`,
  departmentFolder: (deptName: string, folderName: string) =>
    `/app/departments/${enc(deptName)}/folders/${enc(folderName)}`,
  publicFolders: () => '/app/folders',
  publicFolder: (folderId: string) => `/app/folders/${enc(folderId)}`,
  activity: () => '/app/activity',
  settings: () => '/app/settings',
};

/** Sidebar / mobile-nav item id → URL. Unknown ids (e.g. "roles", "admin") get a placeholder page. */
export function pathForTab(tab: string): string {
  return tab === 'dashboard' ? paths.dashboard() : `/app/${enc(tab)}`;
}

/** URL → the sidebar item to highlight. */
export function tabForPath(pathname: string): string {
  const section = pathname.split('/')[2];
  return section ? decodeURIComponent(section) : 'dashboard';
}
