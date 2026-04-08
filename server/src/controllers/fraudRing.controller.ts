import { Request, Response, NextFunction } from 'express';
import { FraudRingService } from '../services/fraudRing.service';

export const getFraudRings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await FraudRingService.getFraudRings();
    res.json({ success: true, data });
  } catch (error) { next(error); }
};
