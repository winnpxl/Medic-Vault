import { Patient, Stats } from '../types';

export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await fetch('/api/patients');
  return response.json();
};

export const fetchStats = async (): Promise<Stats> => {
  const response = await fetch('/api/stats');
  return response.json();
};
