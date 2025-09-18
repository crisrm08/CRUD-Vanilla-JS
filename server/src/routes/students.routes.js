import { Router } from "express";
import { listAllStudents, saveNewStudent, saveEditStudent, deleteStudent } from "../controllers/students.controller.js";

const router = Router();

router.get("/list-students", listAllStudents);
router.post("/save-student", saveNewStudent);
router.put("/edit-student", saveEditStudent);
router.delete("/delete-student/:id", deleteStudent);

export default router;