import { Router } from "express";

import { listAllCourses, saveNewCourse } from "../controllers/courses.controller.js";

const router = Router();

router.get("/list-courses", listAllCourses);
router.post("/new-course", saveNewCourse);
//router.put("edit-course", saveEditCourse);
//router.delete("delete-course", deleteCourse);

export default router; 