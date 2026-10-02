import { Ship } from "./ship";
export class Player {
    constructor(name, turn, board) {
        this.name = name;
        this.turn = turn;
        this.playerboard = board;
    }
    attack(x, y, gameboard) {
        if (this.checkSpace(x, y, gameboard)) {
            gameboard.receiveAttack(x, y);
        }
    }
    checkSpace(x, y, gameboard) {
        return gameboard.board[y][x] === 0;
    }
    randomAttack(gameboard) {
        const x = Math.min(Math.round(Math.random() * 10), 9);
        const y = Math.min(Math.round(Math.random() * 10), 9);
        if (this.checkSpace(x, y, gameboard)) {
            this.attack(x, y, gameboard);
            return [x, y];
        }
        else {
            // If move is invalid, call function again
            this.randomAttack(gameboard);
        }
    }
    placeRandomShip(gameboard, size, name) {
        let x = Math.round(Math.random() * 10);
        // TO DO - Subtract x/y value based on size of ship so the ship cannot go past the end of the board (x-axis for horizontal, y-axis for vertical)
        let y = Math.round(Math.random() * 10);
        const horiz = !!Math.round(Math.random());
        if (x === 10) {
            x--;
        }
        if (y === 10) {
            y--;
        }
        if (horiz) {
            x = Math.abs(x - size);
        }
        else {
            y = Math.abs(y - size);
        }
        if (gameboard.checkSpaceForShip(size, horiz, y, x)) {
            const ship = new Ship(size, name);
            gameboard.placeShip(ship, true, y, x);
            console.log(`Placed at ${x}, ${y}`);
        }
        else {
            console.log(`${name} invalid placement at ${x}, ${y}, Horiz: ${horiz}`);
            return 0;
        }
    }
}
