import { pool } from "../config/db.js"

export const listAllEnrollments = async (req, res, next) => {
    try {
        const { rows } = await pool.query("SELECT id, student_id, course_id FROM enrollments ORDER BY id DESC");

        res.json({data: rows});
    } catch (error) {
        next(error);
    }
}

export const saveNewEnrollment = async (req, res, next) => {

}

export const saveEditEnrollment = async (req, res, next) => {

}

export const deletEnrollment = async (req, res, next) => {
    
}