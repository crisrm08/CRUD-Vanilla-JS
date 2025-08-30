import { objectsToRender, inputSearch, coursesButton, studentsButton, classButton} from "./common.js";

let htmlToRender = '';
coursesButton.addEventListener('click', coursesButtonClicked);

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

coursesButtonClicked();