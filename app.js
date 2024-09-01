const express = require('express')
const ejs = require('ejs')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')


//app
const app = express()

const server = http.createServer(app)

const io = socketio(server)

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "public")));


io.on("connection", function (socket) {
    socket.on("send_location", function (data) {
        io.emit("recevie_location", { id: socket.id, ...data })
    });

    socket.on("disconnect", function () {
        io.emit("user_disconnected", socket.id)
    })
})

app.get('/', function (req, res) {
    try {
        res.render("index");
    } catch (err) {
        console.error("Error rendering index:", err);
        res.status(500).send("Internal Server Error");
    }
});


server.listen(3000, () => {
    console.log(`Server started on 3000`);
});