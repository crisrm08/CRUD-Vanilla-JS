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
    try {
        const { id, courseTitle, courseHours, courseType, courseDescription } = req.body;
        await pool.query(`UPDATE courses SET course_name = ($1), course_type = ($2), course_hours = ($3), course_description = ($4)
            WHERE id = ($5)`,[courseTitle, courseType, courseHours, courseDescription, id] 
        );

        res.status(200).send({success: "Curso actualizado"});
    } catch (error) {
        next(error);
    }
}

export const deleteCourse = async (req, res, next) => {
    
}