import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { attackCell, drawBoard, findCell, refreshTurn, setUpListener, teardownListener, declareWinner, } from "./dom";
const player = new Player("", true, new Gameboard());
let game_on = false;
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
export function checkWin(playerBoard, computerBoard) {
    return playerBoard.checkAllSunk() || computerBoard.checkAllSunk();
}
export function gameOn() {
    game_on = true;
    while (game_on) {
        console.log("started");
        const computer = new Player("Computer", false, new Gameboard());
        drawBoard(player.playerboard, player.name);
        drawBoard(computer.playerboard, computer.name);
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
        while (player.turn) {
            // Set up event listener on computer's game board
            setUpListener(computer, player);
            refreshTurn(player);
            if (checkWin(player.playerboard, computer.playerboard)) {
                declareWinner(player);
            }
        }
        while (!player.turn) {
            teardownListener(computer, player);
            refreshTurn(computer);
            let coords = computer.randomAttack(player.playerboard);
            attackCell(findCell(coords[0], coords[1]), player);
            if (checkWin(player.playerboard, computer.playerboard)) {
                declareWinner(computer);
            }
            else {
                player.turn = true;
            }
        }
        break;
    }
}
