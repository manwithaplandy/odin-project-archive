import { Gameboard } from "../src/gameboard";
import { Player } from "../src/player";

test("Player is created", () => {
  expect(new Player("Andy", true, new Gameboard())).toBeInstanceOf(Player);
});

test("attack is sent", () => {
  const board = new Gameboard();
  const andy = new Player("Andy", true, board);
  andy.attack(0, 0, board);
  expect(board.board[0][0]).toBe(2);
});

function checkEmptyBoard(gameboard: Gameboard) {
  let empty = true;
  gameboard.board.forEach((arr) => {
    arr.forEach((c) => {
      if (c != 0) {
        empty = false;
      }
    });
  });
  return empty;
}

test("Make sure checkEmptyBoard works", () => {
  const board = new Gameboard();
  expect(checkEmptyBoard(board)).toBe(true);
  const andy = new Player("Andy", true, board);
  andy.attack(0, 0, board);
  expect(checkEmptyBoard(board)).toBe(false);
});

test("ships randomly placed", () => {
  const board = new Gameboard();
  const computer = new Player("Computer", false, board);
  computer.placeRandomShip(board, 2, "Patrol Boat");
  computer.placeRandomShip(board, 3, "Submarine");
  computer.placeRandomShip(board, 4, "Cruiser");
  expect(checkEmptyBoard(board)).toBe(false);
});
