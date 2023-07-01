let express = require("express");
let socket_io = require("socket.io");

const app = express();

let io = socket_io();

app.io = io;

module.exports = app;
