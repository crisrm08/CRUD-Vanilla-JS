import { objectsToRender, inputSearch, studentsButton, coursesButton, classButton} from "./common.js";

let htmlToRender = '';
studentsButton.addEventListener('click', studentsButtonClicked);

document.querySelector('.cancel-edit-save-2').addEventListener('click', () => {
    document.getElementById('modal-student').classList.remove('is-open');
})

async function getStudents() {
    const response = await fetch('http://localhost:5000/api/list-students');
    const fetchedArray = await response.json();

    return fetchedArray.data;
}

async function studentsButtonClicked() {

    const studentsArray = await getStudents();
    htmlToRender = '';

    console.log(studentsArray);

    studentsArray.forEach(student => {
        htmlToRender += `
            <article class="card">
                <div class="card__header">
                    <h3 class="card__title">${student.student_name}</h3>
                    <span class="badge">Estudiante</span>
                </div>
                <p class="card__desc">
                    Email: ${student.student_email}<br>
                    Tel: ${student.student_tel}
                </p>
                <footer class="card__footer">
                    <div class="meta">
                        <span class="meta__item">${student.student_id}</span>
                    </div>
                    <div>
                        <button class="card__btn" type="button">Editar</button>
                        <button class="card__btn" type="button">Borrar</button>
                    </div>
                </footer>
            </article>
        `;
    });

    objectsToRender.innerHTML = '';
    objectsToRender.innerHTML = htmlToRender;

    if (document.getElementById('add-course-button')) document.getElementById('add-course-button').remove();
    if (document.getElementById('add-class-button')) document.getElementById('add-class-button').remove();
    if (!document.getElementById('add-student-button')){
        const bodyElement = document.body;
        const addCourseButton = document.createElement('div');
        addCourseButton.innerHTML =  `
        <section class="toolbar" id="add-student-button">
                <div class="toolbar__actions">
                    <button class="btn add-student-button" 
                        type="button" 
                        data-modal-open="card-modal" 
                        data-modal-mode="create">
                        + Crear nuevo estudiante
                    </button>
                </div>
            </section>
            `;
        const referenceElement = document.querySelector('.objects-card-grid');
        bodyElement.insertBefore(addCourseButton, referenceElement);

        const addButton = document.querySelector('.add-student-button');
        addButton.addEventListener('click', handleNewStudent);
    }
    
    objectsToRender.innerHTML = htmlToRender;
    studentsButton.classList.add('pressed');
    classButton.classList.remove('pressed');
    coursesButton.classList.remove('pressed');
    inputSearch.placeholder = 'Buscar estudiante...';
}

function handleNewStudent() { 
    document.getElementById('modal-student').classList.add('is-open');
}
