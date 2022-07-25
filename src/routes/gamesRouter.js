import { Router } from 'express';

import { getGames, newGame } from '../controllers/gamesController.js';

import { gamesMiddleware } from '../middlewares/gamesMiddleware.js';

const router = Router();

router.get("/games", getGames);
router.post("/games", gamesMiddleware, newGame);

export default router;