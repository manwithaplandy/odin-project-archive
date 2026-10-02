import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { gameOn, checkWin, computerTurn } from "./game";
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
const compDisplay = document.querySelector(".comp-display");
const sunkDisplay = document.querySelector(".sunk-display");

export function drawBoard(board: Gameboard, player: string) {
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
      playerBoard!.appendChild(row);
    } else {
      computerBoard!.appendChild(row);
    }
  }
}

export function declareWinner(winner: Player) {
  hitDisplay!.textContent = `WINNER! ${winner.name} has sunk all of their opponent's battleships!`;
}

export function cellAttacked(
  cell: HTMLDivElement,
  hit: boolean,
  player: Player
) {
  cell.classList.add("attacked");
  if (hit) {
    cell.classList.add("hit");
    if (player.name === "Computer") {
      compDisplay!.textContent = `${player.name}'s attack was a HIT!`;
    } else {
      hitDisplay!.textContent = `${player.name}'s attack was a HIT!`;
    }
  } else {
    cell.classList.add("miss");
    if (player.name === "Computer") {
      compDisplay!.textContent = `${player.name}'s attack missed`;
    } else {
      hitDisplay!.textContent = `${player.name}'s attack missed`;
    }
  }
}

export function findCell(x: number, y: number) {
  return document.querySelector(
    `[data-x="${x}"][data-y="${y}"]`
  ) as HTMLDivElement;
}

export function refreshTurn(player: Player) {
  playerDisplay!.textContent = `Current turn: ${player.name}`;
}

function eventTarget(event: Event) {
  return event.target as HTMLDivElement;
}

export function attackCell(
  cell: HTMLDivElement,
  player: Player,
  attacker: Player
) {
  if (!cell.classList.contains("attacked")) {
    const result = player.playerboard.receiveAttack(
      parseInt(cell.dataset.x!),
      parseInt(cell.dataset.y!)
    );
    if (result === 2) {
      cellAttacked(cell, false, attacker);
    } else if (result === 3) {
      cellAttacked(cell, true, attacker);
    } else if (result === 4) {
      cellAttacked(cell, true, attacker);
      sunkDisplay!.textContent = `${attacker.name} sunk ${player.name}'s battleship!`;
      setTimeout(() => {
        sunkDisplay!.textContent = "";
      }, 5000);
    }
    return true;
  }
  return false;
}

export function setUpListener(computer: Player, player: Player) {
  computerBoard?.addEventListener("click", (c) => {
    const result = attackCell(eventTarget(c), computer, player);
    if (checkWin(player.playerboard, computer.playerboard)) {
      declareWinner(player);
    }
    if (result) {
      computerTurn();
    }
  });
}

export function teardownListener(computer: Player, player: Player) {
  computerBoard?.removeEventListener("click", (c) => {
    const result = attackCell(eventTarget(c), computer, player);
    if (checkWin(player.playerboard, computer.playerboard)) {
      declareWinner(player);
    }
    if (result) {
      computerTurn();
    }
  });
}

// Initial game setup - Set event listeners for modal
const nameInput = document.querySelector("#name") as HTMLInputElement;
const modal = document.querySelector(".start-modal");
const background = document.querySelector(".start-modal-background");
const startButton = document.querySelector("#start-game");

export function gameSetup(player: Player) {
  startButton!.addEventListener("click", () => {
    if (nameInput!.value) {
      player.name = nameInput!.value as string;
      modal?.classList.add("hidden");
      background?.classList.add("hidden");
      gameOn();
    } else {
      player.name = "Player";
      modal?.classList.add("hidden");
      background?.classList.add("hidden");
      gameOn();
    }
  });
}
