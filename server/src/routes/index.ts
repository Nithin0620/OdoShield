import { Router } from 'express';
import dashboardRoutes from './dashboard.routes';
import vehicleRoutes from './vehicle.routes';
import fraudRingRoutes from './fraudRing.routes';
import certificateRoutes from './certificate.routes';
import settingsRoutes from './settings.routes';

const router = Router();

router.use('/dashboard', dashboardRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/fraud-rings', fraudRingRoutes);
router.use('/certificate', certificateRoutes);
router.use('/settings', settingsRoutes);

export default router;
