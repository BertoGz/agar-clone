const { PORT } = require("./Constants");
// server.js is going to create the socket-io server and express server
const express = require("express");
const app = express();
app.use(express.static(__dirname + "/client"));
const socketio = require("socket.io");
const expressServer = app.listen(PORT);
const io = socketio(expressServer);
const helmet = require("helmet");

app.use(helmet());
console.log(`Express and socketio are listening on port ${PORT}`);

module.exports = { app, io };
