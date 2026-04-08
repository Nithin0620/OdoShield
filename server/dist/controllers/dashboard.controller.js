"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFraudCluster = exports.getRiskDistribution = exports.getRecentVehicles = exports.getSuspiciousCenters = exports.getStats = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const getStats = async (req, res, next) => {
    try {
        const data = await dashboard_service_1.DashboardService.getStats();
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getStats = getStats;
const getSuspiciousCenters = async (req, res, next) => {
    try {
        const data = await dashboard_service_1.DashboardService.getSuspiciousCenters();
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getSuspiciousCenters = getSuspiciousCenters;
const getRecentVehicles = async (req, res, next) => {
    try {
        const data = await dashboard_service_1.DashboardService.getRecentVehicles();
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getRecentVehicles = getRecentVehicles;
const getRiskDistribution = async (req, res, next) => {
    try {
        const data = await dashboard_service_1.DashboardService.getRiskDistribution();
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getRiskDistribution = getRiskDistribution;
const getFraudCluster = async (req, res, next) => {
    try {
        const { centerId } = req.query;
        const data = await dashboard_service_1.DashboardService.getFraudCluster(centerId);
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getFraudCluster = getFraudCluster;
