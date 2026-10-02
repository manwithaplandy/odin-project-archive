import { Gameboard } from "./gameboard";
import { Player } from "./player";
import {
  attackCell,
  drawBoard,
  findCell,
  refreshTurn,
  setUpListener,
  teardownListener,
  gameSetup,
  declareWinner,
  cellAttacked,
} from "./dom";

const player = new Player("", true, new Gameboard());
const computer = new Player("Computer", false, new Gameboard());
let game_on = false;

gameSetup(player);

// // For testing
// document.addEventListener("click", () => {
//   game_on = true;
//   console.log(`Game on: ${game_on}`);
// });

interface legend extends Object {
  [key: string]: any;
  [value: number]: any;
}

// Ships legend:
// Size / Name
// 5 / Carrier
// 4 / Battleship
// 3 / Destroyer
// 3 / Submarine
// 2 / Patrol Boat

const shipLegend: legend = {
  Carrier: 5,
  Battleship: 4,
  Destroyer: 3,
  Submarine: 3,
  "Patrol Boat": 2,
};

export function computerTurn() {
  refreshTurn(computer);
  let coords: number[] = computer.randomAttack(player.playerboard) as number[];
  cellAttacked(
    findCell(coords[0], coords[1]),
    coords[2] > 2 ? true : false,
    computer
  );
  if (checkWin(player.playerboard, computer.playerboard)) {
    declareWinner(computer);
    playerTurn();
  } else {
    playerTurn();
  }
}

function playerTurn() {
  refreshTurn(player);
}

export function checkWin(playerBoard: Gameboard, computerBoard: Gameboard) {
  return playerBoard.checkAllSunk() || computerBoard.checkAllSunk();
}

export function gameOn() {
  drawBoard(player.playerboard, "Player");
  drawBoard(computer.playerboard, computer.name);
  setUpListener(computer, player);
  // Human player goes first because robots need to know their place

  // Place all ships for computer randomly
  computer.placeRandomShip(computer.playerboard, 5, "Carrier");
  computer.placeRandomShip(computer.playerboard, 4, "Battleship");
  computer.placeRandomShip(computer.playerboard, 3, "Destroyer");
  computer.placeRandomShip(computer.playerboard, 3, "Submarine");
  computer.placeRandomShip(computer.playerboard, 2, "Patrol Boat");

  // FOR TESTING - Set up all ships for player randomly
  player.placeRandomShip(player.playerboard, 5, "Carrier");
  player.placeRandomShip(player.playerboard, 4, "Battleship");
  player.placeRandomShip(player.playerboard, 3, "Destroyer");
  player.placeRandomShip(player.playerboard, 3, "Submarine");
  player.placeRandomShip(player.playerboard, 2, "Patrol Boat");

  playerTurn();
}
