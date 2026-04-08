import { Router } from 'express';
import * as certificateController from '../controllers/certificate.controller';

const router = Router();

router.get('/:vin/status', certificateController.getStatus);
router.get('/:vin/verification', certificateController.getVerification);

export default router;
