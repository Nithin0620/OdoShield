import { Request, Response, NextFunction } from 'express';
import { VehicleService } from '../services/vehicle.service';

export const searchVehicles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { searchTerm } = req.query;
    const data = await VehicleService.search((searchTerm as string) || '');
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vin } = req.params;
    const data = await VehicleService.getDetails(vin as string);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getFraudProbability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vin } = req.params;
    const data = await VehicleService.getFraudProbability(vin as string);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getMileageTimeline = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vin } = req.params;
    const data = await VehicleService.getMileageTimeline(vin as string);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getDataSources = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vin } = req.params;
    const data = await VehicleService.getDataSources(vin as string);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getConnections = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vin } = req.params;
    const data = await VehicleService.getConnections(vin as string);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};
