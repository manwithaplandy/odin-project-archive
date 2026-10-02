export class Gameboard {
    constructor() {
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
        this.ships = [];
        this.board = this.buildBoard();
    }
    buildBoard() {
        let board = [];
        for (let i = 0; i < 10; i++) {
            board[i] = [];
            for (let j = 0; j < 10; j++) {
                board[i][j] = 0;
            }
        }
        return board;
        // return new Array(10).fill(new Array(10).fill(0));
    }
    checkSpaceForShip(size, horizontal, y, x) {
        let pass = true;
        if (horizontal) {
            for (let i = 0; i < size; i++) {
                if (!this.checkSingleSpace(x + i, y)) {
                    pass = false;
                    break;
                }
            }
        }
        else if (!horizontal) {
            for (let i = 0; i < size; i++) {
                if (!this.checkSingleSpace(x, y + i)) {
                    pass = false;
                    break;
                }
            }
        }
        return pass;
    }
    checkSingleSpace(x, y) {
        return !this.board[y][x];
    }
    placeShip(ship, horizontal, y, x) {
        // Check that a ship doesn't already exist in any of the spots
        // Sets value of cell to reference ship sitting on it, and which part of the ship it contains
        if (this.checkSpaceForShip(ship.length, horizontal, y, x)) {
            if (horizontal) {
                for (let i = 0; i < ship.length; i++) {
                    this.changeValue(x + i, y, [ship, i + 1]);
                }
            }
            else if (!horizontal) {
                for (let i = 0; i < ship.length; i++) {
                    this.changeValue(x, y + i, [ship, i + 1]);
                    // this.board[y + 1][x] = [ship, i + 1];
                }
            }
            // Append ship to the ships array for sunk checking
            this.ships.push(ship);
        }
    }
    sendHit(ship, spot) {
        ship.hit(spot);
    }
    changeValue(x, y, value) {
        this.board[y][x] = value;
    }
    receiveAttack(x, y) {
        // Take in coordinates, return number code for new space result
        if (typeof this.board[y][x] === "number") {
            // Space does not contain un-hit ship
            if (this.board[y][x] > 1) {
                // Space has already been attacked -> invalid move
                return 0;
            }
            else if (this.board[y][x] === 0) {
                // Space is empty -> miss
                this.changeValue(x, y, 2);
                return 2;
            }
        }
        else {
            // Space has a ship on it -> hit
            const theArr = this.board[y][x];
            this.sendHit(theArr[0], theArr[1]);
            this.changeValue(x, y, 3);
            return 3;
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
