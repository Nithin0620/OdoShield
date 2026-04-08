import { create } from 'zustand';
import api from '../lib/api';

interface FraudState {
  rings: any[];
  loading: boolean;
  error: string | null;
  fetchRings: () => Promise<void>;
}

export const useFraudStore = create<FraudState>((set) => ({
  rings: [],
  loading: false,
  error: null,
  fetchRings: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/fraud-rings') as any;
      set({ rings: res.data || [], loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch fraud rings', loading: false });
    }
  }
}));
