"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateService = void 0;
const tigergraph_service_1 = require("./tigergraph.service");
class CertificateService {
    static async getStatus(vin) {
        return tigergraph_service_1.tgService.runInstalledQuery('trust_status', { vin });
    }
    static async getVerification(vin) {
        return tigergraph_service_1.tgService.runInstalledQuery('verification_schedule', { vin });
    }
}
exports.CertificateService = CertificateService;
