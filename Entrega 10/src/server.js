import express from "express"
import { Server } from "socket.io"
import { options } from "./config/databaseConfig.js"
import { productRoute } from "./routes/productRouter.js"
import { authRoute } from "./routes/authRouter.js"
import path from "path"
import { fileURLToPath } from "url"
import { normalize, schema } from "normalizr"
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { authLogin } from "./middleware/authLogin.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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

import { SQLContainer } from "./containers/sqlContainer.js"
import { FileContainer } from "./containers/fileContainer.js"


const productsApi = new SQLContainer(options.mariaDB, "productos")
const messagesApi = new FileContainer("messages.json")

//Normalizacion
const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" })
const messageSchema = new schema.Entity("messages", {
	author: authorSchema,
})
const chatSchema = new schema.Entity("chats", {
	messages: [messageSchema],
})

const normalizeData = (data) => {
	const normalizedData = normalize(
		{ id: "chatHistory", messages: data },
		chatSchema
	)
	return normalizedData
}

const normalizeMessages = async () => {
	const messages = await messagesApi.getAll()
	const normalizedMessages = normalizeData(messages)
	return normalizedMessages
}

//....Socket.io
const io = new Server(server)
io.on("connection", async (socket) => {
	//enviamos la data al cliente
	socket.emit("products", await productsApi.getAll())
	socket.emit("messagesChat", await normalizeMessages())

	socket.on("newProduct", async (data) => {
		await productsApi.save(data)
		io.sockets.emit("products", await productsApi.getAll())
	})

	socket.on("newMsg", async (data) => {
		await messagesApi.save(data)
		//enviamos los mensajes a todos los sockets conectados
		io.sockets.emit("messagesChat", await normalizeMessages())
	})
})

app.use(cookieParser())
app.use(session({
	store: MongoStore.create({
		mongoUrl: options.mongoAtlas.urlDatabase,
		ttl:60,
	}),
	secret:"claveSuperHyperUltraMegaSuperSecreta",
	resave: false,
	saveUninitialized: false,
}))

//....Endpoints
app.get("/home",authLogin, (req, res) => {
	res.render("home", {user: req.session.user})
})

app.get("/", (req, res) => {
	res.redirect("/home")
})

app.use("/api/productos", productRoute)
app.use("", authRoute)
