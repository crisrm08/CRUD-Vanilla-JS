import healthRoutes from "../health/health.routes.js";
import { Router } from "express";

const router = Router();

router.use(healthRoutes);
export default router;