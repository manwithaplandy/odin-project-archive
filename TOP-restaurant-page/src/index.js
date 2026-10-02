import './content.js';
import './style.css';
import {drawHomePage} from './home.js';
import {drawContactPage} from './contact.js';
import {drawMenuPage} from './menu.js';

const contentBox = document.getElementById("content");

function clearPage () {
    contentBox.innerHTML = '';
    console.log('Cleared page');
    console.log(contentBox);
}

const contact = document.getElementById('contact');
const menu = document.getElementById('menu');
const home = document.getElementById('home');

home.addEventListener('click', () => {
    clearPage();
    drawHomePage();
});

contact.addEventListener('click', () => {
    clearPage();
    drawContactPage();
});

menu.addEventListener('click', () => {
    clearPage();
    drawMenuPage();
});

drawHomePage();