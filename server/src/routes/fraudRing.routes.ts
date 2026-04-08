import { Router } from 'express';
import * as fraudRingController from '../controllers/fraudRing.controller';

const router = Router();

router.get('/', fraudRingController.getFraudRings);

export default router;
