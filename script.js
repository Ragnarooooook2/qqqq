const cells = document.querySelectorAll('[data-cell]');
let currentTurn = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    cell.textContent = currentTurn;
    if (checkWin(currentTurn)) {
        alert(`${currentTurn} wins!`);
        resetGame();
    } else if (isDraw()) {
        alert('Draw!');
        resetGame();
    } else {
        swapTurns();
    }
}

function swapTurns() {
    currentTurn = currentTurn === 'X' ? 'O' : 'X';
}

function checkWin(currentTurn) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentTurn;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    currentTurn = 'X';
}
