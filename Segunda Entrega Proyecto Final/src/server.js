import express from "express"
import { cartRoute } from "./routes/carts.js"
import { productRoute } from "./routes/products.js"

//Express Instance
const app = express()

//Server Config
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

//Server Execution
const PORT = 8080
const server = app.listen(PORT, () =>
	console.log(`server listening on port ${PORT}`)
)
server.on("error", (error) => console.log(`Error in server ${error}`))

//....Routes
app.use("/api/productos", productRoute)
app.use("/api/carrito", cartRoute)

app.get("*", (req, res) => {
	res.json({ error: "ruta no implementada" })
})
