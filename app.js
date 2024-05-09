const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

let players = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinGame', (playerName) => {
        players.push({
            id: socket.id,
            name: playerName,
            symbol: players.length === 0 ? 'X' : 'O'
        });

        if (players.length === 2) {
            io.emit('startGame', players);
        }
    });

    socket.on('makeMove', (index) => {
        io.emit('moveMade', index);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        players = players.filter(player => player.id !== socket.id);
        io.emit('playerDisconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
