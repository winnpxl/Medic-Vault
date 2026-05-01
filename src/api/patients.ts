import { Patient, Stats } from '../types';
import { auth } from '../lib/firebase';

const getAuthHeaders = async (): Promise<HeadersInit> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Not authenticated');
  }
  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await fetch('/api/patients', {
    headers: await getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch patients (${response.status})`);
  }
  return response.json();
};

export const fetchStats = async (): Promise<Stats> => {
  const response = await fetch('/api/stats', {
    headers: await getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch stats (${response.status})`);
  }
  return response.json();
};
