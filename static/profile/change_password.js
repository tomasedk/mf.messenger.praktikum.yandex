import {logForm} from '../log.js';

const formNode = document.querySelector('.profile-page__form');

formNode?.addEventListener('submit', (e) => {
    logForm(e.target);

    window.location.href = "details.html";
    e.preventDefault();
});

