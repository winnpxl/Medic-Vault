import { Patient, Stats } from '../types';
import { auth } from '../lib/firebase';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

/** Fetch from the API with the signed-in user's Firebase ID token. */
async function apiGet<T>(path: string): Promise<T> {
  const user = auth.currentUser;
  if (!user) {
    throw new ApiError('Not authenticated', 401);
  }
  const token = await user.getIdToken();
  const response = await fetch(path, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new ApiError(`Request to ${path} failed (${response.status})`, response.status);
  }
  return response.json() as Promise<T>;
}

export const fetchPatients = (): Promise<Patient[]> => apiGet<Patient[]>('/api/patients');

export const fetchStats = (): Promise<Stats> => apiGet<Stats>('/api/stats');
