import { Request, Response, NextFunction } from 'express';
import { CertificateService } from '../services/certificate.service';

export const getStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vin } = req.params;
    const data = await CertificateService.getStatus(vin as string);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vin } = req.params;
    const data = await CertificateService.getVerification(vin as string);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};
