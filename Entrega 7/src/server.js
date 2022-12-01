const express = require("express")
const { default: knex } = require("knex")
const { Server } = require("socket.io")
const { options } = require("./config/databaseConfig")
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

const SQLContainer = require("./managers/sqlContainer")
const productsApi = new SQLContainer(options.mariaDB, "productos")
const messagesApi = new SQLContainer(options.sqliteDB, "chat")

//....Socket.io
const io = new Server(server)
io.on("connection", async (socket) => {
	//enviamos la data al cliente
	socket.emit("products", await productsApi.getAll())
	socket.emit("messagesChat", await messagesApi.getAll())

	socket.on("newProduct", async (data) => {
		await productsApi.save(data)
		io.sockets.emit("products", await productsApi.getAll())
	})

	socket.on("newMsg", async(data) => {
		await messagesApi.save(data)
		//enviamos los mensajes a todos los sockets conectados
		io.sockets.emit("messagesChat", await messagesApi.getAll())
	})
})

//....Endpoints
app.get("/", async(req, res) => {
	res.render("home", { products: await productsApi.getAll() })
})
