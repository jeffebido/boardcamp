import { Router } from 'express';

import { getCategories, newCategorie } from '../controllers/categoriesController.js';

import { categoriesMiddleware } from '../middlewares/categoriesMiddleware.js';

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", categoriesMiddleware, newCategorie);

export default router;