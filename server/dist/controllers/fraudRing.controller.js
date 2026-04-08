"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFraudRings = void 0;
const fraudRing_service_1 = require("../services/fraudRing.service");
const getFraudRings = async (req, res, next) => {
    try {
        const data = await fraudRing_service_1.FraudRingService.getFraudRings();
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getFraudRings = getFraudRings;
