import { pool } from "../config/db.js";

export const listAllCourses = async (req, res, next) => {
    try {
        const { rows } = await pool.query(`SELECT id, course_name, course_type, course_description, course_hours, students_enrolled 
        FROM courses ORDER BY id DESC`);

        res.json({data: rows});
    } catch (error) {
        next(error);
    }
}

export const saveNewCourse = async (req, res, next) => {
    try {
        const { courseTitle, courseHours, courseType, courseDescription } = req.body;
        await pool.query(`INSERT INTO courses (course_name, course_hours, course_type, course_description) VALUES
            ($1, $2, $3, $4)`, [courseTitle, courseHours, courseType, courseDescription]);
        res.status(201);
        res.json({ok : true});
        
    } catch (error) {
        next(error);
    }
}

export const saveEditCourse = async (req, res, next) => {

}

export const deleteCourse = async (req, res, next) => {
    
}