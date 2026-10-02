export function drawContactPage() {
    const contentBox = document.getElementById('content');

    const header = document.createElement('h1');
    header.textContent = 'Contact Us';

    const main = document.createElement('p');
    main.textContent = 'We literally dont want you to contact us. Please send all complaints to comments@whitehouse.gov. You will be more likely to get in touch with someone who cares.';

    contentBox.append(header, main);
}