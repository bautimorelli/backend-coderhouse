const express = require("express")
const { Server } = require("socket.io")
const PORT = 8080

const app = express()
const server = app.listen(PORT, () =>
	console.log(`server listening on port ${PORT}`)
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + "/public"))

//....Template engine
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

const ArrayContainer = require("./managers/arrayContainer")
const FileContainer = require("./managers/fileContainer")
const productsApi = new FileContainer("productos.txt")
const messagesApi = new ArrayContainer()

//....Socket.io
const io = new Server(server)
io.on("connection", async (socket) => {
	//enviamos la data al cliente
	socket.emit("products", await productsApi.getAll())
	socket.emit("messagesChat", messagesApi.getAll())

	socket.on("newProduct", async (data) => {
		await productsApi.save(data)
		io.sockets.emit("products", await productsApi.getAll())
	})

	socket.on("newMsg", (data) => {
		messagesApi.save(data)
		//enviamos los mensajes a todos los sockets conectados
		io.sockets.emit("messagesChat", messagesApi.getAll())
	})
})

//....Endpoints
app.get("/", (req, res) => {
	res.render("home", { products: productsApi.getAll() })
})
