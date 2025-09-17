import { objectsToRender, inputSearch, classButton, coursesButton, studentsButton} from "./common.js";

let htmlToRender = '';
classButton.addEventListener('click', classButtonClicked);

document.querySelector('.cancel-edit-save-3').addEventListener('click', () => {
    document.getElementById('modal-enrollment').classList.remove('is-open');
})

async function classButtonClicked() {
    const response = await fetch('http://localhost:5000/api/list-enrollments');
    const fetchedArray = await response.json();
    const enrollmentsArray = fetchedArray.data;
    
    enrollmentsArray.forEach(enrollment => {
         htmlToRender += `
            <article class="card">
                <div class="card__header">
                    <h3 class="card__title">${enrollment.id}</h3>
                    <span class="badge">Matrícula</span>
                </div>
                <p class="card__desc">
                    Estudiante: ${enrollment.student_id}<br>
                    Curso: ${enrollment.course_id}
                </p>
                <footer class="card__footer">
                    <div class="meta">
                        <span class="meta__item">Estado: activo</span>
                    </div>
                    <div>
                        <button class="card__btn" type="button">Editar</button>
                        <button class="card__btn" type="button">Borrar</button>
                    </div>
                </footer>
            </article>`;
    });
    
    
    if (document.getElementById('add-course-button')) document.getElementById('add-course-button').remove();
    if (document.getElementById('add-student-button')) document.getElementById('add-student-button').remove();
    if (!document.getElementById('add-class-button')){
        const bodyElement = document.body;
        const addCourseButton = document.createElement('div');
        addCourseButton.innerHTML =  `
            <section class="toolbar" id="add-class-button">
                <div class="toolbar__actions">
                    <button class="btn add-class-button" 
                        type="button" 
                        data-modal-open="card-modal" 
                        data-modal-mode="create">
                        + Crear nueva clase
                    </button>
                </div>
            </section>
        `;
        const referenceElement = document.querySelector('.objects-card-grid');
        bodyElement.insertBefore(addCourseButton, referenceElement);

        const addButton = document.querySelector('.add-class-button');
        addButton.addEventListener('click', handleNewClass);
    }

    objectsToRender.innerHTML = '';
    objectsToRender.innerHTML = htmlToRender;
    studentsButton.classList.remove('pressed');
    classButton.classList.add('pressed');
    coursesButton.classList.remove('pressed');
    inputSearch.placeholder = 'Buscar matrícula...';
}

async function handleNewClass() { 
    document.getElementById('modal-enrollment').classList.add('is-open');
    const Response = await fetch('http://localhost:5000/api/list-enrollments');
    const fetchedEnrollments = await Response.json();
    const fetchedEnrollmentsArray = fetchedEnrollments.data;

    const studentIds = fetchedEnrollmentsArray.map(enrollmentObject => enrollmentObject.student_id);
    const coursesIds = fetchedEnrollmentsArray.map(enrollmentObject => enrollmentObject.course_id);

    const studentSelect = document.getElementById("enr-student");
    const courseSelect = document.getElementById("enr-course");

    studentSelect.innerHTML = "";
    courseSelect.innerHTML = "";

    studentIds.forEach((studentId) => {
        const newOption = document.createElement('option');
        newOption.value = studentId;
        newOption.textContent = studentId;
        studentSelect.appendChild(newOption);
    })

    coursesIds.forEach((courseId) => {
        const newOption = document.createElement('option');
        newOption.value = courseId;
        newOption.textContent = courseId;
        courseSelect.appendChild(newOption);
    });
}
