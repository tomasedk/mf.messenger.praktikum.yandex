import {logForm} from '../log.js';

const formNode = document.querySelector('.registration-page');

formNode?.addEventListener('submit', (e) => {
    logForm(e.target);

    window.location.href = "../webchat/unselected.html";
    e.preventDefault();
});
