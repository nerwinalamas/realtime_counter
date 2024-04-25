const express = require("express")
const http = require("http")
const cors = require("cors")

const app = express()
const PORT = 5000;

// app.use(cors())

const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
})

let count = 0;

io.on("connection", (socket) => {
    console.log("user connected: ", socket.id)

    socket.emit("count", count)
    socket.on("count", () => {
        count++;

        io.emit("count", count)
        console.log("count sa be: ", count)
    })
})

app.get("/", (req, res) => {
    res.send("hello")
})

server.listen(PORT, console.log(`Server running on port ${PORT}`))
