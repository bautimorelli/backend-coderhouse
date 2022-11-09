const express = require("express")
const Api = require("./api")
const app = express()
const PORT = 8080

const handlebars = require("express-handlebars")
const path = require("path")
const viewsFolder = path.join(__dirname, "views")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

//inicializar el motor de plantillas
app.engine("handlebars", handlebars.engine())
//las views en mi proyecto
app.set("views", viewsFolder)
//motor de plantillas voy a usar
app.set("view engine", "handlebars")

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))

const productosApi = new Api()

//....Endpoints
app.get("/", (req, res) => {
	res.render('formulario')
})

app.post("/productos", (req, res) => {
	let producto = req.body
	productosApi.save(producto)
	res.render('formulario')
})

app.get("/productos", (req, res) => {
	const productos = productosApi.getAll()
	if (productos.length > 0) {
		res.render('productos', {products: productos})
	} else {
		res.render('productosEmpty')
	}
	
})

