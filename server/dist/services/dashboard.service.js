"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const tigergraph_service_1 = require("./tigergraph.service");
class DashboardService {
    static async getStats() {
        return tigergraph_service_1.tgService.runInstalledQuery('dashboard_stats');
    }
    static async getSuspiciousCenters() {
        return tigergraph_service_1.tgService.runInstalledQuery('top_suspicious_centers', { limit: 3 });
    }
    static async getRecentVehicles() {
        return tigergraph_service_1.tgService.runInstalledQuery('recently_flagged', { limit: 3 });
    }
    static async getRiskDistribution() {
        return tigergraph_service_1.tgService.runInstalledQuery('risk_distribution');
    }
    static async getFraudCluster(centerId) {
        return tigergraph_service_1.tgService.runInstalledQuery('fraud_cluster_subgraph', { centerId });
    }
}
exports.DashboardService = DashboardService;
