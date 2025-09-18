import { Router } from "express";
import { listAllEnrollments, saveNewEnrollment, saveEditEnrollment } from "../controllers/enrollments.controller.js";

const router = Router();

router.get("/list-enrollments", listAllEnrollments);
router.post("/new-enrollment", saveNewEnrollment);
router.put("/edit-enrollment", saveEditEnrollment)
//router.delete("delete-enrollment", deletEnrollment);

export default router;;