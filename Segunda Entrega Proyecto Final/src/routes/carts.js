import express from "express"
import { ContainerDaoCarts, ContainerDaoProducts } from "../daos/index.js"

const carritoApi = ContainerDaoCarts
const productosApi = ContainerDaoProducts

//Route Cart
const cartRoute = express.Router()

cartRoute.get("/", async (req, res) => {
	const carrito = await carritosApi.getAll()
	res.json(carrito)
})

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

export { cartRoute }
