"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerification = exports.getStatus = void 0;
const certificate_service_1 = require("../services/certificate.service");
const getStatus = async (req, res, next) => {
    try {
        const { vin } = req.params;
        const data = await certificate_service_1.CertificateService.getStatus(vin);
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getStatus = getStatus;
const getVerification = async (req, res, next) => {
    try {
        const { vin } = req.params;
        const data = await certificate_service_1.CertificateService.getVerification(vin);
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getVerification = getVerification;
