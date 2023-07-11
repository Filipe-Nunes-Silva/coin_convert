import express from "express";
const router = express.Router();
import validations from "../middlewares/validations";

import controllers from '../controllers/index';
router.post('/convert', validations, controllers.getCurrencyQuotation);

export default router;