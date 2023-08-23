const express = require("express")
const app = require("./utils/socket.express");
const http = require("http")
const router = require("./routes/index.router");
const hbs = require('express-handlebars')
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))
const path = require('path')
app.use(express.static(path.join(__dirname,'public')))
app.use(cors())
//handlebars
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main', 
    layoutDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//app.use("/static", express.static("src/public"))

app.use("/", router)

const server = http.createServer(app);

//conect attach
app.io.attach(server)

server.listen(PORT, (err)=> {
    if (err) console.log('Error en el servidor', err)
    console.log(`Escuchando en el puerto: ${PORT}`)
})