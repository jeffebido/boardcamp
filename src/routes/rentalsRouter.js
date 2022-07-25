import { Router } from 'express';

import { getRentals, newRental } from '../controllers/rentalsController.js';

import { rentalsMiddleware } from '../middlewares/rentalsMiddleware.js';

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalsMiddleware, newRental);

export default router;