import { Request, Response, NextFunction } from 'express';
import { SettingsService } from '../services/settings.service';

export const getHealth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await SettingsService.checkHealth();
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const updatePreferences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, preferences } = req.body;
    // Assuming a dummy userId for now, or extracted from auth middleware
    const actualUserId = userId || 'default_user';
    
    const data = await SettingsService.updatePreferences(actualUserId, preferences);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};
