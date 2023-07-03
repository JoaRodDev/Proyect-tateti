let express = require("express");
let socket_io = require("socket.io");

const app = express();
let io = socket_io();

let figure = true

app.io = io;

io.on("connection", function(socket){
    console.log("Se conecto un nuevo cliente")

    socket.emit("init", {figure: figure})
    socket.figure = figure;
    figure = !figure

    socket.on("new_moviment", function(data){
        io.emit("moviment", { position: data.position, character: socket.character })
    });
})

module.exports = app;
