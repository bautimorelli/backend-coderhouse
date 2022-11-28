const express = require("express")
const { Router } = require("express")
const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))

const isAdmin = true

//....Api
const FileContainer = require("./managers/fileContainer")
const productosApi = new FileContainer("productos.txt")
const carritoApi = new FileContainer("carritos.txt")

//....Routes
const productRoute = Router()
app.use("/api/productos", productRoute)

const cartRoute = Router()
app.use("/api/carrito", cartRoute)

//....Middleware
function validarAdmin(req, res, next) {
	if (isAdmin == true) {
		next()
	} else {
		res.json({ error: "No tienes los permisos para realizar esta accion" })
	}
}

//....Endpoints

//Product Routes
productRoute.get("/", async (req, res) => {
	const productos = await productosApi.getAll()
	res.json({ productos })
})

productRoute.get("/:id", async (req, res) => {
	const producto = await productosApi.getById(req.params.id)
	if (producto == null) {
		res.json({ error: `producto con id ${req.params.id} no existe` })
		return
	}
	res.json({ producto })
})

productRoute.post("/", validarAdmin, async (req, res) => {
	const producto = req.body
	const id = await productosApi.save(producto)
	res.json({ msg: `se creó el producto con el id ${id}` })
})

productRoute.put("/:id", validarAdmin, async (req, res) => {
	const result = await productosApi.updateById(req.params.id, req.body)
	if (result == null) {
		res.json({ error: `producto con id ${req.params.id} no existe` })
		return
	}
	res.json({ msg: "se actualizó el producto", result })
})

productRoute.delete("/:id", validarAdmin, async (req, res) => {
	const result = await productosApi.deleteById(req.params.id)
	if (result == -1) {
		res.json({ error: `producto con id ${req.params.id} no existe` })
		return
	}
	res.json({ msg: `produco con id ${req.params.id} eliminado` })
})

//Cart Routes
cartRoute.post("/", async (req, res) => {
	const carrito = req.body
	const id = await carritoApi.save(carrito)
	res.json({ msg: `se creó el carrito con el id ${id}` })
})

cartRoute.delete("/:id", async (req, res) => {
	const result = await carritoApi.deleteById(req.params.id)
	if (result == -1) {
		res.json({ error: `carrito con id ${req.params.id} no existe` })
		return
	}
	res.json({ msg: `carrito con id ${req.params.id} eliminado` })
})

cartRoute.get("/:id/productos", async (req, res) => {
	const carrito = await carritoApi.getById(req.params.id)
	if (carrito == null) {
		res.json({ error: `carrito con id ${req.params.id} no existe` })
		return
	}
	const productos = carrito.productos
	res.json({ productos })
})

cartRoute.post("/:id/productos", async (req, res) => {
	const carrito = await carritoApi.getById(req.params.id)
	if (carrito == null) {
		res.json({ error: `carrito con id ${req.params.id} no existe` })
		return
	}
	const producto = await productosApi.getById(req.body.id)
	if (producto == null) {
		res.json({ error: `producto con id ${req.body.id} no existe` })
		return
	}
	carrito.productos.push(producto)
	await carritoApi.updateById(req.params.id, carrito)
	res.json({ msg: "se agrego el producto" })
})

cartRoute.delete("/:id/productos/:id_prod", async (req, res) => {
	let carrito = await carritoApi.getById(req.params.id)
	if (carrito == null) {
		res.json({ error: `carrito con id ${req.params.id} no existe` })
		return
	}
	const prodIndex = carrito.productos.findIndex(
		(element) => element.id == req.params.id_prod
	)
	if (prodIndex == -1) {
		res.json({
			error: `producto ${req.params.id_prod} no se encuentra en carrito`,
		})
		return
	}
	carrito.productos.splice(prodIndex, 1)
	await carritoApi.updateById(req.params.id, carrito)
	res.json({ msg: "se elimino el producto" })
})

// 404

app.get("*", (req, res) => {
	res.json({ error: "ruta no implementada" })
})