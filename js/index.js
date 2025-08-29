let htmlToRender = '';
const objectsToRender = document.querySelector('.objects-card-grid');
const inputSearch = document.querySelector('#search');

const coursesButton = document.querySelector("#courses-button");
coursesButton.addEventListener('click', coursesButtonClicked);

const studentsButton = document.querySelector("#students-button");
studentsButton.addEventListener('click', studentsButtonClicked);

const classButton = document.querySelector("#class-button");
classButton.addEventListener('click', classButtonClicked);

function coursesButtonClicked() {
    htmlToRender = `<article class="card">
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
    objectsToRender.innerHTML = '';
    objectsToRender.innerHTML = htmlToRender;
    studentsButton.classList.remove('pressed');
    classButton.classList.remove('pressed');
    coursesButton.classList.add('pressed');
    inputSearch.placeholder = 'Buscar curso...';
        
}

function studentsButtonClicked() {
    htmlToRender = '';
    htmlToRender = `   <article class="card">
        <div class="card__header">
            <h3 class="card__title">Ana Pérez</h3>
            <span class="badge">Estudiante</span>
        </div>
        <p class="card__desc">
            Email: ana@uni.edu<br>
            Tel: 809-000-0000
        </p>
        <footer class="card__footer">
            <div class="meta">
                <span class="meta__item">ID: s_k92</span>
            </div>
            <div>
                <button class="card__btn" type="button">Editar</button>
                <button class="card__btn" type="button">Borrar</button>
            </div>
        </footer>
    </article>`;
    objectsToRender.innerHTML = '';
    objectsToRender.innerHTML = htmlToRender;
    studentsButton.classList.add('pressed');
    classButton.classList.remove('pressed');
    coursesButton.classList.remove('pressed');
    inputSearch.placeholder = 'Buscar estudiante...';
}

function classButtonClicked() {
    htmlToRender = '';
    htmlToRender = ` <article class="card">
        <div class="card__header">
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
    objectsToRender.innerHTML = '';
    objectsToRender.innerHTML = htmlToRender;
    studentsButton.classList.remove('pressed');
    classButton.classList.add('pressed');
    coursesButton.classList.remove('pressed');
    inputSearch.placeholder = 'Buscar matrícula...';
}

coursesButtonClicked();