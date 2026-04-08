export class VehicleService {
  static async search(searchTerm: string) {
    const mockVehicles = [
      { vin: "MH12AB1234", owner: "Rajesh Kumar", make: "Maruti", model: "Swift DZire VXI", year: 2019, city: "Pune", state: "MH", riskScore: 91, status: "fraud", lastChecked: "2024-03-15" },
      { vin: "DL3CAF9021", owner: "Anil Sharma", make: "Hyundai", model: "i20 Asta", year: 2020, city: "Delhi", state: "DL", riskScore: 87, status: "fraud", lastChecked: "2024-03-14" },
      { vin: "KA01MX4532", owner: "Meera Patil", make: "Honda", model: "City ZX CVT", year: 2021, city: "Bangalore", state: "KA", riskScore: 79, status: "suspicious", lastChecked: "2024-03-12" },
      { vin: "MH02XY3344", owner: "Suresh Desai", make: "Honda", model: "City V CVT", year: 2020, city: "Mumbai", state: "MH", riskScore: 12, status: "clean", lastChecked: "2024-03-10" },
      { vin: "PB10EE9988", owner: "Gurpreet Singh", make: "Toyota", model: "Innova Crysta", year: 2018, city: "Ludhiana", state: "PB", riskScore: 8, status: "clean", lastChecked: "2024-03-08" },
      { vin: "MH14CD5678", owner: "Vikram Joshi", make: "Tata", model: "Nexon XZ+", year: 2022, city: "Nashik", state: "MH", riskScore: 85, status: "fraud", lastChecked: "2024-03-16" },
      { vin: "TN07GH2211", owner: "Lakshmi Narayan", make: "Kia", model: "Seltos HTX", year: 2021, city: "Chennai", state: "TN", riskScore: 45, status: "suspicious", lastChecked: "2024-02-28" },
      { vin: "GJ05KL9900", owner: "Harsh Patel", make: "Maruti", model: "Baleno Delta", year: 2020, city: "Ahmedabad", state: "GJ", riskScore: 5, status: "clean", lastChecked: "2024-03-01" },
    ];
    if (!searchTerm) return mockVehicles;
    return mockVehicles.filter(v => 
      v.vin.toLowerCase().includes(searchTerm.toLowerCase()) || 
      v.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  static async getDetails(vin: string) {
    return [{
      vin,
      owner: "Rajesh Kumar",
      make: "Maruti",
      model: "Swift DZire VXI",
      year: 2019,
      city: "Pune",
      state: "MH",
      riskScore: 85,
    }];
  }

  static async getFraudProbability(vin: string) {
    return [{ value: 85 }];
  }

  static async getMileageTimeline(vin: string) {
    return [
      { year: "2021", km: "22,000 km", source: "RTO Record", status: "verified" },
      { year: "2022", km: "40,000 km", source: "Insurance Claim", status: "verified" },
      { year: "2023", km: "61,000 km", source: "Service Record", status: "verified" },
      { year: "2024", km: "20,000 km", source: "Mileage Rollback Detected", status: "anomaly" },
    ];
  }

  static async getDataSources(vin: string) {
    return [
      { icon: 'Shield', name: "RTO Records", status: "Verified", ok: true },
      { icon: 'FileText', name: "Insurance Records", status: "Verified", ok: true },
      { icon: 'Wrench', name: "Service Center Log", status: "Conflict Detected", ok: false },
      { icon: 'GitCommit', name: "Blockchain Record", status: "Immutable", ok: true },
    ];
  }

  static async getConnections(vin: string) {
    return [
      { type: "Owner", label: "Rajesh Kumar", risk: "3 vehicles in fraud cluster" },
      { type: "Service Center", label: "AutoFix Hub", risk: "Risk Score 94" },
      { type: "Insurance", label: "Policy #MH-2023-44821", risk: "" }
    ];
  }
}
