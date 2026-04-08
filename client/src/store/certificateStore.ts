import { create } from 'zustand';
import api from '../lib/api';

interface CertificateState {
  status: any;
  verification: any;
  loading: boolean;
  error: string | null;
  fetchCertificateData: (vin: string) => Promise<void>;
}

export const useCertificateStore = create<CertificateState>((set) => ({
  status: null,
  verification: null,
  loading: false,
  error: null,
  fetchCertificateData: async (vin: string) => {
    set({ loading: true, error: null });
    try {
      const [statusRes, verifRes] = await Promise.all([
        api.get(`/certificate/${vin}/status`) as Promise<any>,
        api.get(`/certificate/${vin}/verification`) as Promise<any>
      ]);
      set({
        status: statusRes.data?.[0] || null,
        verification: verifRes.data?.[0] || null,
        loading: false
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch certificate data', loading: false });
    }
  }
}));
