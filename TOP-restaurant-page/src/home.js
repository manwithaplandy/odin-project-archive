export function drawHomePage () {
    const contentBox = document.getElementById('content');

    const header = document.createElement('h1');
    header.textContent = 'Welcome to our restaurant, FOOLS!';

    const mainImage = document.createElement('img');
    mainImage.src = './images/elevate.jpg';
    // mainImage.width = '1000';

    const blurb = document.createElement('p');
    blurb.textContent = "This restaurant is so sick we don't even use plates, we just throw a bunch of shit we found on the ground onto a piece of wood.";

    contentBox.append(header, mainImage, blurb);
}
