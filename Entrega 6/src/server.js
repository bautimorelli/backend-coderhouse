const express = require("express")
const { Server } = require("socket.io")
const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + "/public"))
const server = app.listen(PORT, () =>
	console.log(`server listening on port ${PORT}`)
)

//....Template engine
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

const Api = require("./api")
const productsApi = new Api()
const messagesApi = new Api()

//....Socket.io
const io = new Server(server)
io.on("connection", (socket) => {
	//enviamos la data al cliente
	socket.emit("products", productsApi.getAll())
	socket.emit("messagesChat", messagesApi.getAll())

	socket.on("newProduct", (data) => {
		productsApi.save(data)
		io.sockets.emit("products", productsApi.getAll())
	})

	socket.on("newMsg", (data) => {
		messagesApi.save(data)
		//enviamos los mensajes a todos los sockets conectados
		io.sockets.emit("messagesChat", messagesApi.getAll())
	})
})

//....Endpoints
app.get("/", (req, res) => {
	res.render("home", {products: productsApi.getAll()})
})
