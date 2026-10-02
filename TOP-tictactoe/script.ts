/* Create Types here */
type PlayerID = 1 | 2;
type Space = 'X' | 'O' | '-';
type PlayerSymbol = 'X' | 'O';
interface Player {
    id: PlayerID, 
    symbol: PlayerSymbol
    wins: number
}

/* 
Set event listener for the Game Board
*/
const gameBoard = document.querySelector('#gameboard');
gameBoard!.addEventListener('click', function(event: Event) {
    // Determine where the click was based on if statements
    // Check game is active before firing
    if (Game.isPlaying()) {
        const clicked = event.target as HTMLElement;
        let _player = Game.whoseTurn();
        Game.playTurn(_player, parseInt(clicked.id));
    }
});


/*
Set event listener for StartGame function
*/
const startButton = document.querySelector('#start-game');
startButton!.addEventListener('click', function() {
    if (!Game.isPlaying()) {
        Game.startGame();
        startButton!.textContent = 'Restart';
    } else if (Game.isPlaying()) {
        Game.startGame();
    }
})


const GameBoard = (function () {
    /* 
    Object for containing the game board itself
    Game board will consist of an array to represent the spaces on the board
    */

    let _GBArray: Space[] = []; // Gameboard Array

    const setBoard = function () {
        const gameBoard = document.getElementById('gameboard');

        //Create the gameboard
        for (let i = 0; i < 9; i++) {
            _GBArray[i] = '-';
        }
        displayController.refresh();
    }

    const checkSpace = function(space: number) {
        // Return true if space has not been played yet
        return (_GBArray[space] != "X" && _GBArray[space] != "O");

    }

    const updateBoard = function(player: Player, space: number) {
        // Update board with player move - done
        // Inputs are player (X/O) and square (1-9) (index position 0-8) - validated in playTurn function
        // Square value will be updated with player symbol - done
        // Refresh the board - done
        _GBArray[space] = player.symbol;
        displayController.refresh();
        if (checkWinner()) {
            Game.winner(player);
        }
    }

    const checkWinner = function() {
        //Series of if statements to determine - return bool
        //Initial placeholder values are throwing false positives, check array item is not '-'
        return ((_GBArray[0] === _GBArray[1] && _GBArray[1] === _GBArray[2] && _GBArray[1] != '-') ||
            (_GBArray[3] === _GBArray[4] && _GBArray[4] === _GBArray[5] && _GBArray[4] != '-') ||
            (_GBArray[6] === _GBArray[7] && _GBArray[7] === _GBArray[8] && _GBArray[7] != '-') || // Rows
            (_GBArray[0] === _GBArray[3] && _GBArray[3] === _GBArray[6] && _GBArray[3] != '-') ||
            (_GBArray[1] === _GBArray[4] && _GBArray[4] === _GBArray[7] && _GBArray[4] != '-') ||
            (_GBArray[2] === _GBArray[5] && _GBArray[5] === _GBArray[8] && _GBArray[5] != '-') || // Columns
            (_GBArray[0] === _GBArray[4] && _GBArray[4] === _GBArray[8] && _GBArray[4] != '-') ||
            (_GBArray[2] === _GBArray[4] && _GBArray[4] === _GBArray[6] && _GBArray[4] != '-') // Diagonals
        );
    }

    const getSpace = function (space: number) {
        return _GBArray[space];
    }

    return {updateBoard, setBoard, checkSpace, getSpace};
})();

const Game = (function () {
    /* Module for containing game logic */

    let _playing: boolean = false; // Switch for game on
    let _playerTurn: Player;

    const startGame = function() {
        // Player 1 is X, player 2 is O
        // Set the turn to player 1
        _playerTurn = player1;
        // Set up the game board
        GameBoard.setBoard();
        // Set _playing variable to true
        _playing = true;
    }

    const nextTurn = function () {
        // set _playerTurn to next
        if (_playerTurn === player1) {
            _playerTurn = player2;
        } else {
            _playerTurn = player1;
        }
    }

    const playTurn = function (player: Player, space: number) {
        if (GameBoard.checkSpace(space) && _playing) {
            nextTurn();
            GameBoard.updateBoard(player, space);
        }
    }

    const whoseTurn = function () {
        //Get whose turn it is
        return _playerTurn;
    }

    const isPlaying = function () {
        return _playing;
    }

    const winner = function (player: Player) {
        player.wins++;
        _playing = false;
        console.log(`Player ${player.id} wins!`)
        displayController.refresh();
    }

    return {whoseTurn, playTurn, startGame, isPlaying, winner};

})();

const displayController = (function() {
        
    
    const refresh = function () {
        for (let i = 0; i < 9; i++) {
            const _square = document.querySelector(`.S${i}`);
            _square!.textContent = GameBoard.getSpace(i);
        }
        document.querySelector('#p1score')!.textContent = player1.wins.toString();
        document.querySelector('#p2score')!.textContent = player2.wins.toString();
        document.querySelector('#player-turn')!.textContent = "Player " + Game.whoseTurn().id.toString();
    }

    return {refresh};

})();

const Player = function (id: PlayerID, symbol: PlayerSymbol) {
    return {
        id,
        symbol,
        wins: 0
    }
}

// Initialize player1 and player2
let player1 = Player(1, "X");
let player2 = Player(2, "O");