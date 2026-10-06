import express from 'express';
import * as dashboardController from '../controllers/dashboard.js';

const router = express.Router();

router.get('/', dashboardController.dashboard);

export default router;