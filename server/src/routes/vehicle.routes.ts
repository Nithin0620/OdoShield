import { Router } from 'express';
import * as vehicleController from '../controllers/vehicle.controller';

const router = Router();

router.get('/search', vehicleController.searchVehicles);
router.get('/:vin/details', vehicleController.getDetails);
router.get('/:vin/fraud-probability', vehicleController.getFraudProbability);
router.get('/:vin/mileage', vehicleController.getMileageTimeline);
router.get('/:vin/data-sources', vehicleController.getDataSources);
router.get('/:vin/connections', vehicleController.getConnections);

export default router;
