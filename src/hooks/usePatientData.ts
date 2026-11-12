import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { ApiError, fetchPatients, fetchStats } from '../api/patients';
import { useAuth } from '../contexts/AuthContext';
import { Patient, Stats } from '../types';

export const EMPTY_STATS: Stats = {
  recentlyAccessed: 0,
  pendingReviews: 0,
  externalShares: 0,
  accessAlerts: 0,
};

// Query keys include the uid so one user's cached data never shows for another.
const patientsKey = (uid: string | undefined) => ['patients', uid] as const;
const statsKey = (uid: string | undefined) => ['stats', uid] as const;

// Don't retry auth/permission failures; retry other errors (network, 5xx) as usual.
const retry = (failureCount: number, error: unknown) =>
  !(error instanceof ApiError && (error.status === 401 || error.status === 403)) && failureCount < 2;

/**
 * Demo data is only shown to super admins until institutions exist (Phase 1);
 * everyone else starts with an empty workspace.
 */
function useDemoDataEnabled() {
  const { user } = useAuth();
  return { uid: user?.uid, enabled: user?.role === 'super_admin' };
}

export function usePatients() {
  const { uid, enabled } = useDemoDataEnabled();
  const query = useQuery({ queryKey: patientsKey(uid), queryFn: fetchPatients, enabled, retry });
  return { ...query, patients: query.data ?? [] };
}

export function useStats() {
  const { uid, enabled } = useDemoDataEnabled();
  const query = useQuery({ queryKey: statsKey(uid), queryFn: fetchStats, enabled, retry });
  return { ...query, stats: enabled ? (query.data ?? null) : EMPTY_STATS };
}

/**
 * Local-only edits to the cached patient list. Add/edit/archive/delete aren't
 * persisted by the API yet (Phase 3), matching the previous behaviour.
 */
export function usePatientCacheEditor() {
  const queryClient = useQueryClient();
  const { uid } = useDemoDataEnabled();
  const update = useCallback(
    (fn: (patients: Patient[]) => Patient[]) =>
      queryClient.setQueryData<Patient[]>(patientsKey(uid), (prev) => fn(prev ?? [])),
    [queryClient, uid],
  );
  return {
    add: (patient: Patient) => update((prev) => [...prev, patient]),
    replace: (patient: Patient) => update((prev) => prev.map((p) => (p.id === patient.id ? patient : p))),
    remove: (patientId: string) => update((prev) => prev.filter((p) => p.id !== patientId)),
  };
}
