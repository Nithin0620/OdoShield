export class FraudRingService {
  static async getFraudRings() {
    return [
      {
        id: "FR-001",
        name: "Pune AutoFix Cluster",
        severity: "critical",
        vehicleCount: 4,
        centerCount: 1,
        ownerCount: 3,
        totalLoss: "₹18.4L",
        detectedDate: "2024-03-12",
        nodes: [
          { id: "AutoFix Hub, Pune", type: "center", x: 200, y: 150 },
          { id: "MH12AB1234", type: "car", suspicious: true, x: 80, y: 60 },
          { id: "MH14CD5678", type: "car", suspicious: true, x: 320, y: 60 },
          { id: "DL3CAF9021", type: "car", suspicious: true, x: 80, y: 240 },
          { id: "KA01MX4532", type: "car", suspicious: true, x: 320, y: 240 },
          { id: "Rajesh K.", type: "owner", x: 200, y: 300 },
        ],
        edges: [
          { from: "AutoFix Hub, Pune", to: "MH12AB1234" },
          { from: "AutoFix Hub, Pune", to: "MH14CD5678" },
          { from: "AutoFix Hub, Pune", to: "DL3CAF9021" },
          { from: "AutoFix Hub, Pune", to: "KA01MX4532" },
          { from: "Rajesh K.", to: "MH12AB1234" },
          { from: "Rajesh K.", to: "MH14CD5678" },
        ],
      },
      {
        id: "FR-002",
        name: "Delhi SpeedWheel Network",
        severity: "high",
        vehicleCount: 3,
        centerCount: 2,
        ownerCount: 2,
        totalLoss: "₹12.1L",
        detectedDate: "2024-03-10",
        nodes: [
          { id: "SpeedWheel Motors", type: "center", x: 150, y: 150 },
          { id: "QuickLube Garage", type: "center", x: 280, y: 150 },
          { id: "DL7XY9988", type: "car", suspicious: true, x: 80, y: 60 },
          { id: "DL9AB3344", type: "car", suspicious: true, x: 350, y: 60 },
          { id: "UP14KK5566", type: "car", suspicious: true, x: 215, y: 280 },
        ],
        edges: [
          { from: "SpeedWheel Motors", to: "DL7XY9988" },
          { from: "SpeedWheel Motors", to: "UP14KK5566" },
          { from: "QuickLube Garage", to: "DL9AB3344" },
          { from: "QuickLube Garage", to: "UP14KK5566" },
        ],
      },
      {
        id: "FR-003",
        name: "Mumbai Garage Ring",
        severity: "medium",
        vehicleCount: 2,
        centerCount: 1,
        ownerCount: 2,
        totalLoss: "₹5.8L",
        detectedDate: "2024-03-05",
        nodes: [
          { id: "FastTrack Autos", type: "center", x: 200, y: 150 },
          { id: "MH01ZZ7788", type: "car", suspicious: true, x: 100, y: 80 },
          { id: "MH04PP1122", type: "car", suspicious: false, x: 300, y: 80 },
        ],
        edges: [
          { from: "FastTrack Autos", to: "MH01ZZ7788" },
          { from: "FastTrack Autos", to: "MH04PP1122" },
        ],
      },
    ];
  }
}
