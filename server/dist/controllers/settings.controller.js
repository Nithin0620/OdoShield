"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePreferences = exports.getHealth = void 0;
const settings_service_1 = require("../services/settings.service");
const getHealth = async (req, res, next) => {
    try {
        const data = await settings_service_1.SettingsService.checkHealth();
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.getHealth = getHealth;
const updatePreferences = async (req, res, next) => {
    try {
        const { userId, preferences } = req.body;
        // Assuming a dummy userId for now, or extracted from auth middleware
        const actualUserId = userId || 'default_user';
        const data = await settings_service_1.SettingsService.updatePreferences(actualUserId, preferences);
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePreferences = updatePreferences;
