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
    

}

export const saveEditCourse = async (req, res, next) => {

}

export const deleteCourse = async (req, res, next) => {
    
}