import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service';

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await DashboardService.getStats();
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getSuspiciousCenters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await DashboardService.getSuspiciousCenters();
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getRecentVehicles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await DashboardService.getRecentVehicles();
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getRiskDistribution = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await DashboardService.getRiskDistribution();
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getFraudCluster = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { centerId } = req.query;
    const data = await DashboardService.getFraudCluster(centerId as string);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};
