import { Gameboard, shipSpot } from "../src/gameboard";
import { Ship } from "../src/ship";

test("Builds board", () => {
  const board = new Gameboard();
  expect(board.board).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("places horizontal ship", () => {
  const board = new Gameboard();
  expect(board.board[0][0]).not.toBeTruthy();
  board.placeShip(new Ship(2, "Patrol Boat"), true, 0, 0);
  expect(board.board[0][0]).toBeTruthy();
  expect(board.board[0][1]).toBeTruthy();
});

test("places vertical ship", () => {
  const board = new Gameboard();
  expect(board.board[0][0]).not.toBeTruthy();
  board.placeShip(new Ship(2, "Patrol Boat"), false, 0, 0);
  expect(board.board[0][0]).toBeTruthy();
  expect(board.board[1][0]).toBeTruthy();
});

test("Attack misses", () => {
  const board = new Gameboard();
  expect(board.receiveAttack(0, 0)).toBe(2);
});

test("Attack hits", () => {
  const board = new Gameboard();
  board.placeShip(new Ship(2, "Patrol Boat"), false, 0, 0);
  expect(typeof board.board[0][0]).toBe("object");
  expect(board.receiveAttack(0, 0)).toBe(3);
});

test("Attack invalid", () => {
  const board = new Gameboard();
  board.placeShip(new Ship(2, "Patrol Boat"), false, 0, 0);
  board.receiveAttack(0, 0);
  expect(board.receiveAttack(0, 0)).toBe(0);
});

test("Ship is placed on board", () => {
  const board = new Gameboard();
  expect(board.board[0][0]).toBe(0);
  board.placeShip(new Ship(2, "Patrol Boat"), false, 0, 0);
  expect(board.board[0][0]).toBeTruthy();
});

test("All ships not sunk", () => {
  const board = new Gameboard();
  board.placeShip(new Ship(2, "Patrol Boat"), false, 0, 0);
  expect(board.checkAllSunk()).toBe(false);
});

test("All ships sunk", () => {
  const board = new Gameboard();
  board.placeShip(new Ship(2, "Patrol Boat"), true, 0, 0);
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  expect(board.board[0][0]).toBe(3);
  expect(board.checkAllSunk()).toBe(true);
});
