const Config = require('./config');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const SocketIO = require('socket.io');
const model = require('./app/models/model');

let app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./app/router'));

let server = app.listen(Config.port, function() {
    console.log(`Listening on port ${Config.port}`);
});

let io = SocketIO(server);
io.on('connection', (client) => {
    console.log(`Client ${client.id} connected`);

    client.on('message', (data) => {
        // io.sockets.emit('message', data);
        model.forEach(element => {
            if(data.email == element.email) {
                io.to(element.socketId).emit('clientMessage', data);
            }
        });
    });
});