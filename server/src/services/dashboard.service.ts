export class DashboardService {
  static async getStats() {
    return [
      { label: "Vehicles Scanned", value: "1,24,847", sub: "+2.3% this week", icon: 'Activity', glow: "glow-primary", accent: "text-primary" },
      { label: "Fraud Rings Detected", value: "312", sub: "14 new this month", icon: 'AlertTriangle', glow: "glow-fraud", accent: "text-destructive" },
      { label: "Avg Loss Prevented", value: "₹1.24L", sub: "per flagged vehicle", icon: 'TrendingUp', glow: "", accent: "text-odo-warning" },
      { label: "Trust Certificates", value: "89,241", sub: "Active", icon: 'BadgeCheck', glow: "glow-verified", accent: "text-odo-verified" },
    ];
  }

  static async getSuspiciousCenters() {
    return [
      { name: "AutoFix Hub, Pune", score: 94, level: "high" },
      { name: "SpeedWheel Motors, Delhi", score: 81, level: "medium" },
      { name: "QuickLube Garage, Mumbai", score: 67, level: "medium" },
    ];
  }

  static async getRecentVehicles() {
    return [
      { vin: "MH12AB1234", owner: "Rajesh K.", score: 91 },
      { vin: "DL3CAF9021", owner: "Anil S.", score: 87 },
      { vin: "KA01MX4532", owner: "Meera P.", score: 79 },
    ];
  }

  static async getRiskDistribution() {
    return [
      { label: "High Risk", pct: 18, color: "bg-destructive" },
      { label: "Medium", pct: 34, color: "bg-odo-warning" },
      { label: "Low", pct: 48, color: "bg-odo-verified" },
    ];
  }

  static async getFraudCluster(centerId?: string) {
    return [
      { id: 'center', label: "AutoFix Hub, Pune" },
      { id: "MH12AB1234", suspicious: true },
      { id: "MH14CD5678", suspicious: true },
      { id: "DL3CAF9021", suspicious: true },
      { id: "KA01MX4532", suspicious: true },
      { id: "MH02XY3344", suspicious: false },
      { id: "PB10EE9988", suspicious: false },
    ];
  }
}
