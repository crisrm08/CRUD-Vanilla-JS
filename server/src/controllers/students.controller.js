import { pool } from "../config/db.js"

export const listAllStudents = async (req, res, next) => {
    try {
        const { rows } = await pool.query("SELECT id, student_name, student_email, student_tel, student_id FROM students ORDER BY id DESC");

        res.json({data: rows});
    } catch (error) {
        next(error);
    }
}

export const saveNewStudent = async (req, res, next) => {

}

export const saveEditStudent = async (req, res, next) => {

}

export const deleteStudent = async (req, res, next) => {
    
}