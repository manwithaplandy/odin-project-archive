const container = document.getElementById('container');
const startButton = document.getElementById('startButton');
const clearButton = document.getElementById('clearButton');

let gridSize = 10; // Default grid size of 10
buildGrid(); // Build initial Grid
addHoverListeners(); // Add listeners to initial grid

// Function => Create grid of divs using provided quantity
function buildGrid() {
        container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr`; // Set number of columns to grid size
        for (let i = 1; i <= (gridSize * gridSize); i++) { // Square grid size to get total number of squares
            const div = document.createElement('div');
            div.classList.add(i, 'square');
            container.appendChild(div);
    }
}

// Clean up old grid before building new grid
function removeGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

// Define function for adding listeners to squares
function addHoverListeners() {
    squares = Array.from(document.getElementsByClassName('square'));
    squares.forEach((square) => {
    square.addEventListener('mouseover', () => addBGColor(square))
    // square.addEventListener('mouseout', () => remBGColor(square))
    });
}
addHoverListeners();

// Change background color when mouse is over square
let addBGColor = (square) => {
    square.classList.add('hoverOver'); 
}

// Function to remove color from squares
let remBGColor = (square) => {
    setTimeout(square.classList.remove('hoverOver'), 2000);
}

// Start button prompts for grid size
startButton.addEventListener('click', () => setGrid());

// Get grid size from button prompt, then 
let setGrid = () => {
    gridSize = Math.min(prompt('How big would you like the grid?'), 100);
    gridSize = parseInt(gridSize); // Convert to int
    removeGrid();
    buildGrid();
    addHoverListeners();
}

// Remove all background colors from all squares
clearButton.addEventListener('click', () => {
    squares.forEach((square) => remBGColor(square));
}
)