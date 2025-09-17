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
    try {
        const { studentId, courseId } = req.body;
        const existingAlready = await pool.query(`SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2`,
            [studentId, courseId]
        )
        if (existingAlready.rows.length > 0) {
            console.log("Enrollment already exists");
            res.status(409).send({ error: "Matricula ya existe" }); 
            return; 
        }
        else{
            await pool.query(`INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2)`,
                [studentId, courseId]);
        }
        res.status(201).send({success: "Matrícula creada"});
    } catch (error) {
        next(error);
    }
}

export const saveEditEnrollment = async (req, res, next) => {

}

export const deletEnrollment = async (req, res, next) => {
    
}