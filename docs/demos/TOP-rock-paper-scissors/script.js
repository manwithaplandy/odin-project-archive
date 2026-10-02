let scoreBoard = document.getElementById('scoreBoard');
let resultsBoard1 = document.getElementById('resultsBoard1');
let resultsBoard2 = document.getElementById('resultsBoard2');
let playerScore = document.getElementById('playerScore');
let computerScore = document.getElementById('computerScore');
let startButton = document.getElementById('play');
let winnerBoard = document.getElementById('winnerBoard');

let roundCount = 0;
let playerWins = 0;
let computerWins = 0;

// Start the game()
startButton.addEventListener('click', () => {
    rock.style.display = 'inline-block';
    scissors.style.display = 'inline-block';
    paper.style.display = 'inline-block';
    startButton.style.display = 'none';
    //game()
});

// Initialize global variables for last winner and last computer selection
let lastComputerSelection;
let lastWinner;

// Add event listeners for buttons to playRound(<button pressed>)
let rock = document.getElementById('rock');
let paper = document.getElementById('paper');
let scissors = document.getElementById('scissors');

rock.addEventListener('click', () => playRound('rock', computerPlay()));
paper.addEventListener('click', () => playRound('paper', computerPlay()));
scissors.addEventListener('click', () => playRound('scissors', computerPlay()));

// Add div/logic to show what the computer selected and who won each round
resultsBoard1.innerText = 'Make a selection to play!';
// Modify DOM elements in scoreboard div to show current score

// Add pizzaz

function computerPlay() {
    // Function to generate random numbers within a range, which for this script will be 1-3.
    const randomNumbers = (min, max) => {
        return Math.round(Math.random() * (max - min)) + min;
    }

    // Generate a random number between 10 and 40

    const choice = randomNumbers(10,40);

    // Associate the random number choice with a r/p/s value
    // Divide num between 10 and 40 by 10 and rounding down gives us a number between 1 and 3
    // I found that if I only used random numbers between 1 and 3, Paper was 2x as likely as Rock or Scissors
    // Using a larger number range allowed for more randomness

    switch (Math.floor(choice/10)) {
        case 1:
            return 'Rock';
            break;
        case 2:
            return 'Paper';
            break;
        case 3:
            return 'Scissors';
            break;
    }


}

let updateStuff = (computerSelection) => {
    lastComputerSelection = computerSelection;
    roundCount++;
    resultsBoard1.textContent = `Computer chose ${lastComputerSelection}`;
    if (lastWinner === 'Computer') {
        computerWins++;
        resultsBoard2.textContent = `${lastWinner} wins!`
    } else if (lastWinner === 'Player') {
        playerWins++;
        resultsBoard2.textContent = `${lastWinner} wins!`
    } else {
        resultsBoard2.textContent = `It's a tie!`
    }
    playerScore.innerText = playerWins;
    computerScore.innerText = computerWins;
    if (roundCount >= 5) {
        let finalWinner;
        if (computerWins > playerWins) {
            finalWinner = 'Computer';
        } else {
            finalWinner = 'Player';
        }
        winnerBoard.textContent = `And the winner after ${roundCount} rounds is.....${finalWinner}!`;
    }
}

function playRound(playerSelection, computerSelection) {
    // Set inputs to lowercase to make answers case insensitive
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    // Determine who wins with series of if statements
    // Go through various computer selection scenarios
    // for each player selection
    if (playerSelection === 'rock') { 
        if (computerSelection === 'paper') { 
            console.log('You lose! Paper beats Rock');
            lastWinner = 'Computer';
            updateStuff(computerSelection);
            return 'computer';
        } else if (computerSelection === 'scissors') {
            console.log('You win! Rock beats Scissors');
            lastWinner = 'Player';
            updateStuff(computerSelection);
            return 'player';
        } else if (computerSelection === 'rock') {
            console.log('Tie between Rock and Rock!');
            lastWinner = 'Tie';
            updateStuff(computerSelection);
            return 'tie';
        }
    } else if (playerSelection === 'paper') {
        if (computerSelection === 'paper') { 
            console.log('Tie between Paper and Paper!');
            lastWinner = 'Tie';
            updateStuff(computerSelection);
            return 'tie';
        } else if (computerSelection === 'scissors') {
            console.log('You lose! Scissors beats Paper');
            lastWinner = 'Computer';
            updateStuff(computerSelection);
            return 'computer';
        } else if (computerSelection === 'rock') {
            console.log('You win! Paper beats Rock');
            lastWinner = 'Player';
            updateStuff(computerSelection);
            return 'player';
        }
    } else if (playerSelection === 'scissors') {
        if (computerSelection === 'paper') { 
            console.log('You win! Scissors beats Paper');
            lastWinner = 'Player';
            updateStuff(computerSelection);
            return 'player';
        } else if (computerSelection === 'scissors') {
            console.log('Tie between Scissors and Scissors!');
            lastWinner = 'Tie';
            updateStuff(computerSelection);
            return 'tie';
        } else if (computerSelection === 'rock') {
            console.log('You lose! Rock beats Scissors');
            lastWinner = 'Computer';
            updateStuff(computerSelection);
            return 'computer';
        }
    }
    // Return the winner in a string
}

// Code needs to be refactored completely for UI-driven game
// function game() {
//     let playerWins = 0;
//     let computerWins = 0;
//     let ties = 0;
//     let roundCount = 0;
//     let playing = true;
//     while(playing) {
//         playerSelection = window.prompt('Rock, paper, or scissors?', 'rock');
//         computerSelection = computerPlay();
//         winner = playRound(playerSelection, computerSelection);
//         switch(winner) {
//             case 'player':
//                 playerWins++;
//                 roundCount++;
//                 break;
//             case 'computer':
//                 computerWins++;
//                 roundCount++;
//                 break;
//             case 'tie':
//                 ties++;
//                 roundCount++;
//                 break;
//         }
//         if (roundCount >= 5) {declareWinner} // Declare a winner after 5 rounds
//     }
//     if (playerWins > computerWins) {
//         alert(`You win! Final score: Player - ${playerWins} / Computer: ${computerWins} / Ties: ${ties}`);
//     } else {
//         alert(`You lose! Final score: Player - ${playerWins} / Computer: ${computerWins} / Ties: ${ties}`)
//     }
// }

// function testPlay() { // Test that the computerPlay function is truly random
//     let x = 0;
//     let rock = 0;
//     let paper = 0
//     let scissors = 0;
//     while (x < 100) {
//         switch (computerPlay()) {
//             case 'Rock':
//                 rock++;
//                 x++;
//                 break
//             case 'Paper':
//                 paper++;
//                 x++;
//                 break;
//             case 'Scissors':
//                 scissors++;
//                 x++;
//                 break;
//         }
//     }
//     console.log(`Rock: ${rock}`);
//     console.log(`Paper: ${paper}`);
//     console.log(`Scissors: ${scissors}`);
// }

