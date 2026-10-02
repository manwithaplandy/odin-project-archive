import { Ship } from "./ship";

export type shipSpot = [ship: Ship, number: number];

export class Gameboard {
  board: number[][] | shipSpot[][];

  constructor() {
    this.board = this.buildBoard();
  }

  // Game board value legend
  // 0 = empty space
  // Ship Object array = un-hit ship
  // 2 = miss
  // 3 = hit

  // Ships legend:
  // Size / Name
  // 5 / Carrier
  // 4 / Battleship
  // 3 / Destroyer
  // 3 / Submarine
  // 2 / Patrol Boat

  private ships: Ship[] = [];

  private buildBoard() {
    let board: any[][] = [];
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i][j] = 0;
      }
    }
    return board;
    // return new Array(10).fill(new Array(10).fill(0));
  }

  checkSpaceForShip(size: number, horizontal: boolean, y: number, x: number) {
    let pass = true;
    if (horizontal) {
      for (let i = 0; i < size; i++) {
        if (!this.checkSingleSpace(x + i, y)) {
          pass = false;
          break;
        }
      }
    } else if (!horizontal) {
      for (let i = 0; i < size; i++) {
        if (!this.checkSingleSpace(x, y + i)) {
          pass = false;
          break;
        }
      }
    }
    return pass;
  }

  checkSingleSpace(x: number, y: number) {
    return !this.board[y][x];
  }

  placeShip(ship: Ship, horizontal: boolean, y: number, x: number) {
    // Check that a ship doesn't already exist in any of the spots
    // Sets value of cell to reference ship sitting on it, and which part of the ship it contains
    if (this.checkSpaceForShip(ship.size, horizontal, y, x)) {
      if (horizontal) {
        for (let i = 0; i < ship.size; i++) {
          this.changeValue(x + i, y, [ship, i]);
        }
      } else if (!horizontal) {
        for (let i = 0; i < ship.size; i++) {
          this.changeValue(x, y + i, [ship, i]);
          // this.board[y + 1][x] = [ship, i + 1];
        }
      }
      // Append ship to the ships array for sunk checking
      this.ships.push(ship);
    }
  }

  private sendHit(ship: Ship, spot: number) {
    ship.hit(spot);
  }

  private changeValue(x: number, y: number, value: number | shipSpot) {
    this.board[y][x] = value;
  }

  receiveAttack(x: number, y: number) {
    // Take in coordinates, return number code for new space result
    if (typeof this.board[y][x] === "number") {
      // Space does not contain un-hit ship
      if (this.board[y][x] > 1) {
        // Space has already been attacked -> invalid move
        return 0;
      } else if (this.board[y][x] === 0) {
        // Space is empty -> miss
        this.changeValue(x, y, 2);
        return 2;
      }
    } else {
      // Space has a ship on it -> hit
      const theArr: shipSpot = this.board[y][x] as shipSpot;
      this.sendHit(theArr[0], theArr[1]);
      this.changeValue(x, y, 3);
      console.log(theArr[0].hitMarker);
      if (theArr[0].isSunk()) {
        console.log(this.board);
        return 4;
      } else {
        return 3;
      }
    }
  }

  checkAllSunk() {
    // Checks all ships are sunk
    // To check all sunk, iterate through array running Ship.isSunk(); on each
    let allSunk = true;
    this.board.forEach((arr) => {
      arr.forEach((cell) => {
        if (typeof cell != "number") {
          allSunk = false;
        }
      });
    });
    return allSunk;
  }
}
