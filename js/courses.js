import { objectsToRender, inputSearch, coursesButton, studentsButton, classButton} from "./common.js";


let htmlToRender = '';
coursesButton.addEventListener('click', coursesButtonClicked);
 
document.querySelector('.cancel-edit-save').addEventListener('click', () => {
    document.getElementById('modal-course').classList.remove('is-open');
})

function coursesButtonClicked() {
    htmlToRender = `
    <article class="card">
        <div class="card__header">
            <h3 class="card__title">Programación 101</h3>
            <span class="badge">Curso</span>
        </div>
        <p class="card__desc">
            Introducción a fundamentos: variables, funciones, estructuras de control y buenas prácticas.
            </p>
        <footer class="card__footer">
        <div class="meta">
            <span class="meta__item">30 h</span>
            <span class="meta__item">10 alumnos</span>
        </div>
        <div>
            <button class="card__btn" type="button">Editar</button>
            <button class="card__btn" type="button">Borrar</button>
        </div>
        </footer>
    </article>`;

    if (document.getElementById('add-student-button')) document.getElementById('add-student-button').remove();
    if (document.getElementById('add-class-button')) document.getElementById('add-class-button').remove();
    if (!document.getElementById('add-course-button')) {
        const bodyElement = document.body;
        const addCourseButton = document.createElement('div');
        addCourseButton.innerHTML =  `
        <section class="toolbar" id="add-course-button">
                <div class="toolbar__actions">
                    <button class="btn add-course-button" 
                        type="button" 
                        data-modal-open="card-modal" 
                        data-modal-mode="create">
                        + Crear nuevo curso
                    </button>
                </div>
            </section>
            `;
        const referenceElement = document.querySelector('.objects-card-grid');
        bodyElement.insertBefore(addCourseButton, referenceElement);

        const addButton = document.querySelector('.add-course-button');
        addButton.addEventListener('click', handleNewCourse);

    }

    objectsToRender.innerHTML = '';
    objectsToRender.innerHTML = htmlToRender;
    studentsButton.classList.remove('pressed');
    classButton.classList.remove('pressed');
    coursesButton.classList.add('pressed');
    inputSearch.placeholder = 'Buscar curso...';
}

coursesButtonClicked();

function handleNewCourse() { 
    document.getElementById('modal-course').classList.add('is-open');
}