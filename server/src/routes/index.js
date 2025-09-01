import { Router } from "express";
import healthRoutes from "../health/health.routes.js";
import courseRoutes from "./courses.routes.js";

const router = Router();

router.use(healthRoutes);
router.use(courseRoutes);

export default router;