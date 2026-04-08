import { create } from 'zustand';
import api from '../lib/api';

interface SettingsState {
  health: any;
  loading: boolean;
  error: string | null;
  checkHealth: () => Promise<void>;
  updatePreferences: (userId: string, prefs: any) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  health: null,
  loading: false,
  error: null,
  checkHealth: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/settings/health') as any;
      set({ health: res.data || null, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to check health', loading: false });
    }
  },
  updatePreferences: async (userId: string, prefs: any) => {
    try {
      await api.post('/settings/preferences', { userId, preferences: prefs });
    } catch (err: any) {
      console.error('Failed to update preferences', err);
      throw err;
    }
  }
}));
