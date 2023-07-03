const express = require("express");
const socket_io = require("socket.io");
const evaluator = require("./evaluator");


const app = express();
let io = socket_io();

let busy_position = {};
let turn = true;

let character = true

app.io = io;

io.on("connection", function(socket){
    console.log("Se conecto un nuevo cliente")
    //Guardar en un arreglo dentro de socket la lista de usuarios 
    //conectados y elegir con quien jugar

    //console.log(evaluator([2,4,7]))
    busy_position = {};
    socket.broadcast.emit("reset",{})

    socket.emit("init", {character: character})
    socket.character = character;
    character = !character

    socket.user_board = [];

    socket.on("new_motion", function(data){
        //console.log(socket.character)

        if (!busy_position[data.position]) {

            //Turns Algorithm
            if(turn === socket.character){
                //evaluator busy position & send motion
                socket.user_board.push(parseInt(data.position))
                busy_position[data.position] = true;
                io.emit("motion", { position: data.position, character: socket.character });
                
                //Evaluator user won
                const evaluator_table = evaluator(socket.user_board)
                if(evaluator_table){
                    console.log("Alguien ganó");
                    io.emit("won", {character: socket.character} )
                }
                turn = !turn
            } else {
                socket.emit("!turn", {});
            }
        } else {
            console.log("Alguien tiro en una posicion ocupada")
        }
    });
})

module.exports = app;
