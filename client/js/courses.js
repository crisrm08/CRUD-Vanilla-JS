import { objectsToRender, inputSearch, coursesButton, studentsButton, classButton} from "./common.js";


let htmlToRender = '';
coursesButton.addEventListener('click', coursesButtonClicked);
 
document.querySelector('.cancel-edit-save').addEventListener('click', () => {
    document.getElementById('modal-course').classList.remove('is-open');
})

function coursesButtonClicked() {
    let fetchedArray;
    fetch("http://localhost:5000/api/list-courses")
    .then(response => response.json())
    .then((data) => {
        fetchedArray = data.data;
        console.log(fetchedArray);

        fetchedArray.forEach(course => {
            htmlToRender += `
                <article class="card">
                    <div class="card__header">
                        <h3 class="card__title">${course.course_name}</h3>
                        <span class="badge">${course.course_type}</span>
                    </div>
                    <p class="card__desc">
                        ${course.course_description}
                        </p>
                    <footer class="card__footer">
                    <div class="meta">
                        <span class="meta__item">${course.course_hours} h</span>
                        <span class="meta__item">${course.students_enrolled} alumnos</span>
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
    });

    

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

    studentsButton.classList.remove('pressed');
    classButton.classList.remove('pressed');
    coursesButton.classList.add('pressed');
    inputSearch.placeholder = 'Buscar curso...';
}

coursesButtonClicked();

function handleNewCourse() { 
    document.getElementById('modal-course').classList.add('is-open');
}