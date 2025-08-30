import { objectsToRender, inputSearch, classButton, coursesButton, studentsButton} from "./common.js";

let htmlToRender = '';
classButton.addEventListener('click', classButtonClicked);

function classButtonClicked() {
    htmlToRender = '';
    htmlToRender = ` <article class="card">
        <div class="card__header">s
            <h3 class="card__title">Matrícula e_1a2</h3>
            <span class="badge">Matrícula</span>
        </div>
        <p class="card__desc">
            Estudiante: s_k92<br>
            Curso: c_x7a
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
    
    if (document.getElementById('add-course-button')) document.getElementById('add-course-button').remove();
    if (document.getElementById('add-student-button')) document.getElementById('add-student-button').remove();
    if (!document.getElementById('add-class-button')){
        const bodyElement = document.body;
        const addCourseButton = document.createElement('div');
        addCourseButton.innerHTML =  `
            <section class="toolbar" id="add-class-button">
                <div class="toolbar__actions">
                    <button class="btn add-btn" 
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
    }

    objectsToRender.innerHTML = '';
    objectsToRender.innerHTML = htmlToRender;
    studentsButton.classList.remove('pressed');
    classButton.classList.add('pressed');
    coursesButton.classList.remove('pressed');
    inputSearch.placeholder = 'Buscar matrícula...';
}
