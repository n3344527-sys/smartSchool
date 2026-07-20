import express from "express";

import {
    getDashboardStats,
} from "../controller/dashboardController.js";

const router = express.Router();

router.get(
    "/dashboard",
    getDashboardStats
);

export default router;