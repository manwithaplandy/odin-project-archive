import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

export class Player {
  name: string;
  turn: boolean;
  playerboard: Gameboard;

  constructor(name: string, turn: boolean, board: Gameboard) {
    this.name = name;
    this.turn = turn;
    this.playerboard = board;
  }

  attack(x: number, y: number, gameboard: Gameboard) {
    if (this.checkSpace(x, y, gameboard)) {
      return gameboard.receiveAttack(x, y);
    }
  }

  private checkSpace(x: number, y: number, gameboard: Gameboard) {
    return (
      gameboard.board[y][x] === 0 || typeof gameboard.board[y][x] === "object"
    );
  }

  randomAttack(gameboard: Gameboard): number[] {
    const x = Math.min(Math.round(Math.random() * 10), 9);
    const y = Math.min(Math.round(Math.random() * 10), 9);
    if (this.checkSpace(x, y, gameboard)) {
      const result = this.attack(x, y, gameboard);
      return [x, y, result!];
    } else {
      // If move is invalid, call function again
      return this.randomAttack(gameboard);
    }
  }

  placeRandomShip(gameboard: Gameboard, size: number, name: string) {
    let x: number = Math.round(Math.random() * 10);
    // TO DO - Subtract x/y value based on size of ship so the ship cannot go past the end of the board (x-axis for horizontal, y-axis for vertical)
    let y: number = Math.round(Math.random() * 10);
    const horiz: boolean = !!Math.round(Math.random());
    if (x === 10) {
      x--;
    }
    if (y === 10) {
      y--;
    }
    if (horiz) {
      x = Math.abs(x - size);
    } else {
      y = Math.abs(y - size);
    }
    if (gameboard.checkSpaceForShip(size, horiz, y, x)) {
      const ship: Ship = new Ship(size, name);
      gameboard.placeShip(ship, true, y, x);
    } else {
      return 0;
    }
  }
}
