import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard.controller';

const router = Router();

router.get('/stats', dashboardController.getStats);
router.get('/suspicious-centers', dashboardController.getSuspiciousCenters);
router.get('/recent-vehicles', dashboardController.getRecentVehicles);
router.get('/risk-distribution', dashboardController.getRiskDistribution);
router.get('/fraud-cluster', dashboardController.getFraudCluster);

export default router;
