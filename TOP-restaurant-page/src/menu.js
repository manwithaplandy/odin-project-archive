export function drawMenuPage() {
    const contentBox = document.getElementById('content');

    const header = document.createElement('h1');
    header.textContent = 'Menu';

    const main = document.createElement('div');
    main.id = 'menu';

    const steak = document.createElement('div');
    steak.classList.add('menu-item');
    steak.textContent = 'Steak. Medium-rare. That is it. Shut up.';

    const hamburger = document.createElement('div');
    hamburger.classList.add('menu-item');
    hamburger.textContent = 'Ground beef on a plain bun. Ketchup on the side. Quit complaining.';

    main.append(hamburger, steak);
    contentBox.append(main);
}