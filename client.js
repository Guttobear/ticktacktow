document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    let currentPlayer;
    let players;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    const boardDiv = document.getElementById('game-board');

    socket.on('startGame', (gamePlayers) => {
        players = gamePlayers;
        currentPlayer = players.find(player => player.id === socket.id);
        displayBoard();
    });

    socket.on('moveMade', (index) => {
        gameBoard[index] = currentPlayer.symbol;
        displayBoard();
    });

    socket.on('playerDisconnected', () => {
        alert('Opponent disconnected. Refresh the page to start a new game.');
    });

    function displayBoard() {
        boardDiv.innerHTML = '';
        gameBoard.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.textContent = cell || '';
            if (!cell) {
                cellDiv.addEventListener('click', () => {
                    if (currentPlayer && currentPlayer.symbol === 'X') {
                        socket.emit('makeMove', index);
                    }
                });
            }
            boardDiv.appendChild(cellDiv);
        });
    }

    const playerName = prompt('Enter your name:');
    socket.emit('joinGame', playerName);
});
