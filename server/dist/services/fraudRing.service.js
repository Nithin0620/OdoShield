"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FraudRingService = void 0;
const tigergraph_service_1 = require("./tigergraph.service");
class FraudRingService {
    static async getFraudRings() {
        return tigergraph_service_1.tgService.runInstalledQuery('detect_fraud_rings');
    }
}
exports.FraudRingService = FraudRingService;
