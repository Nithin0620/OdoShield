"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const tigergraph_service_1 = require("./tigergraph.service");
class VehicleService {
    static async search(searchTerm) {
        return tigergraph_service_1.tgService.runInstalledQuery('vehicle_search', { searchTerm });
    }
    static async getDetails(vin) {
        return tigergraph_service_1.tgService.runInstalledQuery('vehicle_details', { vin });
    }
    static async getFraudProbability(vin) {
        return tigergraph_service_1.tgService.runInstalledQuery('fraud_probability', { vin });
    }
    static async getMileageTimeline(vin) {
        return tigergraph_service_1.tgService.runInstalledQuery('mileage_timeline', { vin });
    }
    static async getDataSources(vin) {
        return tigergraph_service_1.tgService.runInstalledQuery('data_sources', { vin });
    }
    static async getConnections(vin) {
        return tigergraph_service_1.tgService.runInstalledQuery('vehicle_connections', { vin });
    }
}
exports.VehicleService = VehicleService;
