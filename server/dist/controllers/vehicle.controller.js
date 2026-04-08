"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnections = exports.getDataSources = exports.getMileageTimeline = exports.getFraudProbability = exports.getDetails = exports.searchVehicles = void 0;
const vehicle_service_1 = require("../services/vehicle.service");
const searchVehicles = async (req, res, next) => {
    try {
        const { searchTerm } = req.query;
        const data = await vehicle_service_1.VehicleService.search(searchTerm || '');
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.searchVehicles = searchVehicles;
const getDetails = async (req, res, next) => {
    try {
        const { vin } = req.params;
        const data = await vehicle_service_1.VehicleService.getDetails(vin);
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getDetails = getDetails;
const getFraudProbability = async (req, res, next) => {
    try {
        const { vin } = req.params;
        const data = await vehicle_service_1.VehicleService.getFraudProbability(vin);
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getFraudProbability = getFraudProbability;
const getMileageTimeline = async (req, res, next) => {
    try {
        const { vin } = req.params;
        const data = await vehicle_service_1.VehicleService.getMileageTimeline(vin);
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getMileageTimeline = getMileageTimeline;
const getDataSources = async (req, res, next) => {
    try {
        const { vin } = req.params;
        const data = await vehicle_service_1.VehicleService.getDataSources(vin);
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getDataSources = getDataSources;
const getConnections = async (req, res, next) => {
    try {
        const { vin } = req.params;
        const data = await vehicle_service_1.VehicleService.getConnections(vin);
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getConnections = getConnections;
