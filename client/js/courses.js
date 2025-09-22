import { objectsToRender, inputSearch, coursesButton, studentsButton, classButton} from "./common.js";

let htmlToRender = '';
let fetchedArray;

coursesButton.addEventListener('click', coursesButtonClicked);
document.querySelector('.cancel-edit-save').addEventListener('click', () => {
    document.getElementById('modal-course').classList.remove('is-open');
})

function coursesButtonClicked() {
    htmlToRender = '';
    fetchedArray = '';
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
                        <button class="card__btn edit-course-button" type="button" data-id="${course.id}">Editar</button>
                        <button class="card__btn delete-course-button" type="button" data-id="${course.id}">Borrar</button>
                    </div>
                    </footer>
                </article>
            `;
        });

        objectsToRender.innerHTML = '';
        objectsToRender.innerHTML = htmlToRender;
        document.querySelectorAll(".edit-course-button").forEach(btn => {
            btn.addEventListener("click", openEditModal);
        });

        document.querySelectorAll(".delete-course-button").forEach(btn => {
            btn.addEventListener("click", deleteCourse);
        })
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
        </section>`;
        
        const referenceElement = document.querySelector('.objects-card-grid');
        bodyElement.insertBefore(addCourseButton, referenceElement);

        const addButton = document.querySelector('.add-course-button');
        addButton.addEventListener('click', openSaveModal);
    }

    studentsButton.classList.remove('pressed');
    classButton.classList.remove('pressed');
    coursesButton.classList.add('pressed');
    inputSearch.placeholder = 'Buscar curso...';
}

coursesButtonClicked();

function openEditModal(e) {  
    document.getElementById('modal-course').classList.add('is-open');
    document.querySelector('.modal__title').textContent = 'Editar curso';

    const btn = e.currentTarget;            
    const clickedCourseId = btn.dataset.id;
    document.getElementById("course-form").dataset.mode = "edit";
    document.getElementById("course-form").dataset.id = clickedCourseId;
     
    const courseToEdit = fetchedArray.find((course) => course.id == clickedCourseId);
    
    document.getElementById('course-title').value = courseToEdit.course_name;
    document.getElementById('course-hours').value = courseToEdit.course_hours;
    document.getElementById('course-type').value = courseToEdit.course_type;
    document.getElementById('course-desc').value = courseToEdit.course_description;
}

function openSaveModal() {
    document.getElementById('modal-course').classList.add('is-open');
    document.querySelector('.modal__title').textContent = 'Nuevo Curso';
    document.getElementById("course-form").dataset.mode = "create";
    document.getElementById('course-title').value = "";
    document.getElementById('course-hours').value = "";
    document.getElementById('course-type').value = "";
    document.getElementById('course-desc').value = "";
}

const newCourseForm = document.getElementById('course-form');
newCourseForm.addEventListener("submit", handleCourseForm);

async function handleCourseForm(e) {
    e.preventDefault();

    const mode = document.getElementById("course-form").dataset.mode;
    const id = document.getElementById("course-form").dataset.id;
    
    if (mode === "create") {
        const data = Object.fromEntries(new FormData(e.target));

        await fetch("http://localhost:5000/api/save-course", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

    } else {
        const data = Object.fromEntries(new FormData(e.target));
        data.id = id;
             
        await fetch("http://localhost:5000/api/edit-course", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
    }
        
    newCourseForm.reset();
    document.getElementById('modal-course').classList.remove('is-open');
    coursesButtonClicked();
};

function deleteCourse(e) {
    e.preventDefault();

    const pressedBtn = e.currentTarget;
    const courseIdToBeDeleted = pressedBtn.dataset.id;

    fetch(`http://localhost:5000/api/delete-course/${courseIdToBeDeleted}`,{
            method: "DELETE"
        }
    )
    .then(() => coursesButtonClicked());
}