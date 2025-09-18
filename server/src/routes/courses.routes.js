import { Router } from "express";

import { listAllCourses, saveNewCourse, saveEditCourse, deleteCourse } from "../controllers/courses.controller.js";

const router = Router();

router.get("/list-courses", listAllCourses);
router.post("/new-course", saveNewCourse);
router.put("/edit-course", saveEditCourse);
router.delete("/delete-course/:id", deleteCourse);

export default router; 