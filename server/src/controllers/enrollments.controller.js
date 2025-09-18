import { pool } from "../config/db.js"

export const listAllEnrollments = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT id, student_id, course_id FROM enrollments ORDER BY id DESC");

        res.json({data: rows});
    } catch (error) {
        console.log(error);
    }
}

export const saveNewEnrollment = async (req, res) => {
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
        console.log(error);
    }
}

export const saveEditEnrollment = async (req, res) => {
    try {
        const {id, studentId, courseId} = req.body;
        await pool.query(`UPDATE enrollments SET student_id = ($1), course_id = ($2) WHERE id = ($3)`, [studentId, courseId, id]);
        res.status(200).send({success: "Matrícula actualizada"});
    } catch (error) {
        console.log(error);
    }
}

export const deletEnrollment = async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query(`DELETE FROM enrollments WHERE id = ($1)`, [id]);
        res.status(204).send({success: "Matricula elimindad"});
    } catch (error) {
        console.log(error);
    }
}