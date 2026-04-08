"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_routes_1 = __importDefault(require("./dashboard.routes"));
const vehicle_routes_1 = __importDefault(require("./vehicle.routes"));
const fraudRing_routes_1 = __importDefault(require("./fraudRing.routes"));
const certificate_routes_1 = __importDefault(require("./certificate.routes"));
const settings_routes_1 = __importDefault(require("./settings.routes"));
const router = (0, express_1.Router)();
router.use('/dashboard', dashboard_routes_1.default);
router.use('/vehicles', vehicle_routes_1.default);
router.use('/fraud-rings', fraudRing_routes_1.default);
router.use('/certificate', certificate_routes_1.default);
router.use('/settings', settings_routes_1.default);
exports.default = router;
