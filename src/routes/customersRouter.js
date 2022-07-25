import { Router } from 'express';

import { getCustomers, newCustomer, getCustomersById, updateCustomer } from '../controllers/customersController.js';

import { customersMiddleware } from '../middlewares/customersMiddleware.js';

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post("/customers", customersMiddleware, newCustomer);
router.put("/customers/:id", customersMiddleware, updateCustomer);

export default router;