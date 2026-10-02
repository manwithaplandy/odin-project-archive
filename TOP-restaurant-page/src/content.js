const content = document.getElementById('content');
const body = document.querySelector('body');

const navBar = document.createElement('div');
navBar.id = 'navbar';

const homeLink = document.createElement('div');
homeLink.textContent = 'Home';
homeLink.id = 'home';

const contactLink = document.createElement('div');
contactLink.textContent = 'Contact';
contactLink.id = 'contact';

const menuLink = document.createElement('div');
menuLink.textContent = 'Menu';
menuLink.id = 'menu';

navBar.append(homeLink, menuLink, contactLink);

body.insertBefore(navBar, content);