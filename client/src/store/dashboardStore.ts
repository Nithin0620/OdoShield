import { create } from 'zustand';
import api from '../lib/api';

interface DashboardState {
  stats: any[];
  suspiciousCenters: any[];
  recentVehicles: any[];
  riskDistribution: any[];
  fraudCluster: any[];
  loading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: [],
  suspiciousCenters: [],
  recentVehicles: [],
  riskDistribution: [],
  fraudCluster: [],
  loading: false,
  error: null,
  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      const [statsRes, centersRes, vehiclesRes, riskRes, clusterRes] = await Promise.all([
        api.get('/dashboard/stats') as Promise<any>,
        api.get('/dashboard/suspicious-centers') as Promise<any>,
        api.get('/dashboard/recent-vehicles') as Promise<any>,
        api.get('/dashboard/risk-distribution') as Promise<any>,
        api.get('/dashboard/fraud-cluster') as Promise<any>
      ]);

      set({
        stats: statsRes.data || [],
        suspiciousCenters: centersRes.data || [],
        recentVehicles: vehiclesRes.data || [],
        riskDistribution: riskRes.data || [],
        fraudCluster: clusterRes.data || [],
        loading: false
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch dashboard data', loading: false });
    }
  }
}));
