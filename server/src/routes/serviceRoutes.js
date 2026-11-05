import express from 'express';
import { serviceController } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', serviceController.getServices);
router.get('/districts', serviceController.getDistricts);

export default router;
