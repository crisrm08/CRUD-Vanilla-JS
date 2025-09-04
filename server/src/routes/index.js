import { Router } from "express";
import healthRoutes from "../health/health.routes.js";
import courseRoutes from "./courses.routes.js";
import studentRoutes from "./students.routes.js";
import enrollmentRoutes from "./enrollments.routes.js";

const router = Router();

router.use(healthRoutes);
router.use(courseRoutes);
router.use(studentRoutes);
router.use(enrollmentRoutes);

export default router;