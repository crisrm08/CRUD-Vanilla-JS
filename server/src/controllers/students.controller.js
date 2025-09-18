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
    try {
        const { studentID, studentName, studentEmail, studentTel } = req.body;
        await pool.query(`INSERT INTO students (student_id, student_name, student_email, student_tel) VALUES
            ($1, $2, $3, $4)`,[studentID, studentName, studentEmail, studentTel]);

        res.status(201);
        res.send({ok: true})
    } catch (error) {
        next(error); 
    }
}

export const saveEditStudent = async (req, res, next) => {
    try {
        const { id, studentID, studentName, studentEmail, studentTel } = req.body;
        await pool.query(`UPDATE students SET student_id = ($1), student_name = ($2), student_email = ($3), student_tel = ($4)
            WHERE id = ($5)`, [studentID, studentName, studentEmail, studentTel, id]
        );
        res.status(200).send({success: "Estudiante actualizado"});
    } catch (error) {
        next(error);
    }
}

export const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        await pool.query(`DELETE FROM students WHERE id = ($1)`, [id]);
        res.status(204).send({success: "Curso borrado"});;
    } catch (error) {
        next(error);
    }
}