const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const modal = document.getElementById('gameModal');
const closeModal = document.getElementsByClassName('close')[0];
const playAgainButton = document.getElementById('playAgain');
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle the cell click event
function handleCellClick() {
    const cellIndex = parseInt(this.id);
    if (gameState[cellIndex] !== "" || !gameActive) {
        return;
    }
    gameState[cellIndex] = currentPlayer;
    this.innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check for winner or draw
function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        result.innerText = `Player ${currentPlayer} Wins!`;
        showModal(`${currentPlayer} Wins!`);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        result.innerText = "It's a Draw!";
        showModal("It's a Draw!");
        gameActive = false;
        return;
    }
}

// Show modal for "Play Again" option
function showModal(message) {
    document.getElementById('modalMessage').innerText = message;
    modal.style.display = 'block';
}

// Close modal on click of 'X'
closeModal.onclick = function() {
    modal.style.display = 'none';
}

// Reset game on click of "Play Again"
playAgainButton.onclick = function() {
    resetGame();
    modal.style.display = 'none';
}

// Reset game
function resetGame() {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    result.innerText = "";
    cells.forEach(cell => cell.innerText = "");
}

// Cell event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
