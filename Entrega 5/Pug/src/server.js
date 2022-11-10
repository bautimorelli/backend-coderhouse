const express = require("express")
const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.listen(PORT, () => console.log(`server listening on port ${PORT}`))

const path = require("path")
const viewsFolder = path.join(__dirname, "views")

//las views en mi proyecto
app.set("views", viewsFolder)
//motor de plantillas voy a usar
app.set("view engine", "pug")

const Api = require("./api")
const productosApi = new Api()

//....Endpoints
app.get("/", (req, res) => {
	res.render('formulario')
})

app.post("/productos", (req, res) => {
	let producto = req.body
	productosApi.save(producto)
	res.redirect('/')
})

app.get("/productos", (req, res) => {
	const productos = productosApi.getAll()
	res.render('productos', {products: productos})
})

