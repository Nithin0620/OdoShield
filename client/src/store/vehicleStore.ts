import { create } from 'zustand';
import api from '../lib/api';

interface VehicleState {
  searchResults: any[];
  vehicleDetails: any;
  fraudProbability: any;
  mileageTimeline: any[];
  dataSources: any[];
  connections: any[];
  loading: boolean;
  error: string | null;
  searchVehicles: (term: string) => Promise<void>;
  fetchVehicleData: (vin: string) => Promise<void>;
}

export const useVehicleStore = create<VehicleState>((set) => ({
  searchResults: [],
  vehicleDetails: null,
  fraudProbability: null,
  mileageTimeline: [],
  dataSources: [],
  connections: [],
  loading: false,
  error: null,
  searchVehicles: async (term: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/vehicles/search?searchTerm=${encodeURIComponent(term)}`) as any;
      set({ searchResults: res.data || [], loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to search vehicles', loading: false });
    }
  },
  fetchVehicleData: async (vin: string) => {
    set({ loading: true, error: null });
    try {
      const [detailsRes, fraudRes, mileageRes, sourcesRes, connRes] = await Promise.all([
        api.get(`/vehicles/${vin}/details`) as Promise<any>,
        api.get(`/vehicles/${vin}/fraud-probability`) as Promise<any>,
        api.get(`/vehicles/${vin}/mileage`) as Promise<any>,
        api.get(`/vehicles/${vin}/data-sources`) as Promise<any>,
        api.get(`/vehicles/${vin}/connections`) as Promise<any>
      ]);
      set({
        vehicleDetails: detailsRes.data?.[0] || null,
        fraudProbability: fraudRes.data?.[0] || null,
        mileageTimeline: mileageRes.data || [],
        dataSources: sourcesRes.data || [],
        connections: connRes.data || [],
        loading: false
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch vehicle data', loading: false });
    }
  }
}));
