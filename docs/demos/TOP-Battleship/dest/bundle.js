/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.ts":
/*!********************!*\
  !*** ./src/dom.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attackCell": () => (/* binding */ attackCell),
/* harmony export */   "cellAttacked": () => (/* binding */ cellAttacked),
/* harmony export */   "declareWinner": () => (/* binding */ declareWinner),
/* harmony export */   "drawBoard": () => (/* binding */ drawBoard),
/* harmony export */   "findCell": () => (/* binding */ findCell),
/* harmony export */   "gameSetup": () => (/* binding */ gameSetup),
/* harmony export */   "refreshTurn": () => (/* binding */ refreshTurn),
/* harmony export */   "setUpListener": () => (/* binding */ setUpListener),
/* harmony export */   "teardownListener": () => (/* binding */ teardownListener)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.ts");

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
function drawBoard(board, player) {
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
function declareWinner(winner) {
    hitDisplay.textContent = `WINNER! ${winner.name} has sunk all of their opponent's battleships!`;
}
function cellAttacked(cell, hit, player) {
    cell.classList.add("attacked");
    if (hit) {
        cell.classList.add("hit");
        if (player.name === "Computer") {
            compDisplay.textContent = `${player.name}'s attack was a HIT!`;
        }
        else {
            hitDisplay.textContent = `${player.name}'s attack was a HIT!`;
        }
    }
    else {
        cell.classList.add("miss");
        if (player.name === "Computer") {
            compDisplay.textContent = `${player.name}'s attack missed`;
        }
        else {
            hitDisplay.textContent = `${player.name}'s attack missed`;
        }
    }
}
function findCell(x, y) {
    return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
}
function refreshTurn(player) {
    playerDisplay.textContent = `Current turn: ${player.name}`;
}
function eventTarget(event) {
    return event.target;
}
function attackCell(cell, player, attacker) {
    if (!cell.classList.contains("attacked")) {
        const result = player.playerboard.receiveAttack(parseInt(cell.dataset.x), parseInt(cell.dataset.y));
        if (result === 2) {
            cellAttacked(cell, false, attacker);
        }
        else if (result === 3) {
            cellAttacked(cell, true, attacker);
        }
        else if (result === 4) {
            cellAttacked(cell, true, attacker);
            sunkDisplay.textContent = `${attacker.name} sunk ${player.name}'s battleship!`;
            setTimeout(() => {
                sunkDisplay.textContent = "";
            }, 5000);
        }
        return true;
    }
    return false;
}
function setUpListener(computer, player) {
    computerBoard === null || computerBoard === void 0 ? void 0 : computerBoard.addEventListener("click", (c) => {
        const result = attackCell(eventTarget(c), computer, player);
        if ((0,_game__WEBPACK_IMPORTED_MODULE_0__.checkWin)(player.playerboard, computer.playerboard)) {
            declareWinner(player);
        }
        if (result) {
            (0,_game__WEBPACK_IMPORTED_MODULE_0__.computerTurn)();
        }
    });
}
function teardownListener(computer, player) {
    computerBoard === null || computerBoard === void 0 ? void 0 : computerBoard.removeEventListener("click", (c) => {
        const result = attackCell(eventTarget(c), computer, player);
        if ((0,_game__WEBPACK_IMPORTED_MODULE_0__.checkWin)(player.playerboard, computer.playerboard)) {
            declareWinner(player);
        }
        if (result) {
            (0,_game__WEBPACK_IMPORTED_MODULE_0__.computerTurn)();
        }
    });
}
// Initial game setup - Set event listeners for modal
const nameInput = document.querySelector("#name");
const modal = document.querySelector(".start-modal");
const background = document.querySelector(".start-modal-background");
const startButton = document.querySelector("#start-game");
function gameSetup(player) {
    startButton.addEventListener("click", () => {
        if (nameInput.value) {
            player.name = nameInput.value;
            modal === null || modal === void 0 ? void 0 : modal.classList.add("hidden");
            background === null || background === void 0 ? void 0 : background.classList.add("hidden");
            (0,_game__WEBPACK_IMPORTED_MODULE_0__.gameOn)();
        }
        else {
            player.name = "Player";
            modal === null || modal === void 0 ? void 0 : modal.classList.add("hidden");
            background === null || background === void 0 ? void 0 : background.classList.add("hidden");
            (0,_game__WEBPACK_IMPORTED_MODULE_0__.gameOn)();
        }
    });
}


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkWin": () => (/* binding */ checkWin),
/* harmony export */   "computerTurn": () => (/* binding */ computerTurn),
/* harmony export */   "gameOn": () => (/* binding */ gameOn)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.ts");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.ts");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/dom.ts");



const player = new _player__WEBPACK_IMPORTED_MODULE_1__.Player("", true, new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard());
const computer = new _player__WEBPACK_IMPORTED_MODULE_1__.Player("Computer", false, new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard());
let game_on = false;
(0,_dom__WEBPACK_IMPORTED_MODULE_2__.gameSetup)(player);
// Ships legend:
// Size / Name
// 5 / Carrier
// 4 / Battleship
// 3 / Destroyer
// 3 / Submarine
// 2 / Patrol Boat
const shipLegend = {
    Carrier: 5,
    Battleship: 4,
    Destroyer: 3,
    Submarine: 3,
    "Patrol Boat": 2,
};
function computerTurn() {
    (0,_dom__WEBPACK_IMPORTED_MODULE_2__.refreshTurn)(computer);
    let coords = computer.randomAttack(player.playerboard);
    (0,_dom__WEBPACK_IMPORTED_MODULE_2__.cellAttacked)((0,_dom__WEBPACK_IMPORTED_MODULE_2__.findCell)(coords[0], coords[1]), coords[2] > 2 ? true : false, computer);
    if (checkWin(player.playerboard, computer.playerboard)) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_2__.declareWinner)(computer);
        playerTurn();
    }
    else {
        playerTurn();
    }
}
function playerTurn() {
    (0,_dom__WEBPACK_IMPORTED_MODULE_2__.refreshTurn)(player);
}
function checkWin(playerBoard, computerBoard) {
    return playerBoard.checkAllSunk() || computerBoard.checkAllSunk();
}
function gameOn() {
    (0,_dom__WEBPACK_IMPORTED_MODULE_2__.drawBoard)(player.playerboard, "Player");
    (0,_dom__WEBPACK_IMPORTED_MODULE_2__.drawBoard)(computer.playerboard, computer.name);
    (0,_dom__WEBPACK_IMPORTED_MODULE_2__.setUpListener)(computer, player);
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


/***/ }),

/***/ "./src/gameboard.ts":
/*!**************************!*\
  !*** ./src/gameboard.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
class Gameboard {
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
        if (this.checkSpaceForShip(ship.size, horizontal, y, x)) {
            if (horizontal) {
                for (let i = 0; i < ship.size; i++) {
                    this.changeValue(x + i, y, [ship, i]);
                }
            }
            else if (!horizontal) {
                for (let i = 0; i < ship.size; i++) {
                    this.changeValue(x, y + i, [ship, i]);
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
            console.log(theArr[0].hitMarker);
            if (theArr[0].isSunk()) {
                console.log(this.board);
                return 4;
            }
            else {
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


/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.ts");

class Player {
    constructor(name, turn, board) {
        this.name = name;
        this.turn = turn;
        this.playerboard = board;
    }
    attack(x, y, gameboard) {
        if (this.checkSpace(x, y, gameboard)) {
            return gameboard.receiveAttack(x, y);
        }
    }
    checkSpace(x, y, gameboard) {
        return (gameboard.board[y][x] === 0 || typeof gameboard.board[y][x] === "object");
    }
    randomAttack(gameboard) {
        const x = Math.min(Math.round(Math.random() * 10), 9);
        const y = Math.min(Math.round(Math.random() * 10), 9);
        if (this.checkSpace(x, y, gameboard)) {
            const result = this.attack(x, y, gameboard);
            return [x, y, result];
        }
        else {
            // If move is invalid, call function again
            return this.randomAttack(gameboard);
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
            const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(size, name);
            gameboard.placeShip(ship, true, y, x);
        }
        else {
            return 0;
        }
    }
}


/***/ }),

/***/ "./src/ship.ts":
/*!*********************!*\
  !*** ./src/ship.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
    constructor(length, name) {
        this.name = name;
        this.size = length;
        this.hitMarker = new Array(length).fill(false);
        this.sunk = false;
    }
    hit(number) {
        this.hitMarker[number] = true;
    }
    isSunk() {
        return this.checkArrayTruth(this.hitMarker);
    }
    isTrue(element) {
        return element.valueOf();
    }
    checkArrayTruth(array) {
        return array.every(this.isTrue);
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/game.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map