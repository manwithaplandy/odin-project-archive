import { gameOn } from "./game";
// Draw game boards
// Draw ships on player's board
// Refresh board when turn is taken
// Display whose turn it is
// Display notification for "hits", "misses", and "WIN!"
const displayContainer = document.querySelector(".display-container");
const playerDisplay = document.querySelector(".display");
const hitDisplay = document.querySelector(".hit-display");
const boardContainer = document.querySelector(".board-container");
const playerBoard = document.querySelector(".player-board");
const computerBoard = document.querySelector(".computer-board");
export function drawBoard(board, player) {
    for (let i = 0; i < 10; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = j.toString();
            cell.dataset.y = i.toString();
            row.appendChild(cell);
        }
        if (player === "Player") {
            playerBoard.appendChild(row);
        }
        else {
            computerBoard.appendChild(row);
        }
    }
}
export function declareWinner(winner) {
    hitDisplay.textContent = `WINNER! ${winner} has sunk all of their opponent's battleships!`;
}
function cellAttacked(cell, hit) {
    cell.classList.add("attacked");
    if (hit) {
        cell.classList.add("hit");
        hitDisplay.textContent = "HIT!";
        setTimeout(() => (hitDisplay.textContent = ""), 5000);
    }
    else {
        cell.classList.add("miss");
        hitDisplay.textContent = "MISS!";
        setTimeout(() => (hitDisplay.textContent = ""), 5000);
    }
}
export function findCell(x, y) {
    return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
}
export function refreshTurn(player) {
    playerDisplay.textContent = `Current turn: player.name`;
}
function eventTarget(event) {
    return event.target;
}
export function attackCell(cell, player) {
    if (!cell.classList.contains("attacked")) {
        const result = player.playerboard.receiveAttack(parseInt(cell.dataset.x), parseInt(cell.dataset.y));
        if (result === 2) {
            cellAttacked(cell, false);
        }
        else if (result === 3) {
            cellAttacked(cell, true);
        }
    }
}
export function setUpListener(computer, player) {
    computerBoard === null || computerBoard === void 0 ? void 0 : computerBoard.addEventListener("click", (c) => {
        attackCell(eventTarget(c), computer);
        player.turn = !player.turn;
    });
}
export function teardownListener(computer, player) {
    computerBoard === null || computerBoard === void 0 ? void 0 : computerBoard.removeEventListener("click", (c) => {
        attackCell(eventTarget(c), computer);
        player.turn = !player.turn;
    });
}
// Initial game setup - Set event listeners for modal
const nameInput = document.querySelector("#name");
const modal = document.querySelector(".start-modal");
const background = document.querySelector(".start-modal-background");
const startButton = document.querySelector("#start-game");
export function gameSetup(player) {
    startButton.addEventListener("click", () => {
        if (nameInput.value) {
            player.name = nameInput.value;
            modal === null || modal === void 0 ? void 0 : modal.classList.add("hidden");
            background === null || background === void 0 ? void 0 : background.classList.add("hidden");
            gameOn();
        }
        else {
            player.name = "Player";
            modal === null || modal === void 0 ? void 0 : modal.classList.add("hidden");
            background === null || background === void 0 ? void 0 : background.classList.add("hidden");
            gameOn();
        }
    });
}
