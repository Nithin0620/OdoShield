"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const tigergraph_service_1 = require("./tigergraph.service");
class SettingsService {
    static async checkHealth() {
        return tigergraph_service_1.tgService.checkHealth();
    }
    static async updatePreferences(userId, preferences) {
        // This could also be a TigerGraph update query, e.g. update_user_preferences
        // using runInstalledQuery
        return tigergraph_service_1.tgService.runInstalledQuery('update_user_preferences', {
            userId,
            preferences: JSON.stringify(preferences)
        });
    }
}
exports.SettingsService = SettingsService;
