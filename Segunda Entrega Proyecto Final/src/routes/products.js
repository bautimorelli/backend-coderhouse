import express from "express"
import { ContainerDaoProducts } from "../daos/index.js"
import { validateAdmin } from "../middlewares/checkRole.js"

const productosApi = ContainerDaoProducts

//Route Products
const productRoute = express.Router()

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

productRoute.post("/", validateAdmin, async (req, res) => {
	const producto = req.body
	const id = await productosApi.save(producto)
	res.json({ msg: `se creó el producto con el id ${id}` })
})

productRoute.put("/:id", validateAdmin, async (req, res) => {
	const result = await productosApi.updateById(req.params.id, req.body)
	if (result == null) {
		res.json({ error: `producto con id ${req.params.id} no existe` })
		return
	}
	res.json({ msg: "se actualizó el producto", result })
})

productRoute.delete("/:id", validateAdmin, async (req, res) => {
	const result = await productosApi.deleteById(req.params.id)
	if (result == -1) {
		res.json({ error: `producto con id ${req.params.id} no existe` })
		return
	}
	res.json({ msg: `produco con id ${req.params.id} eliminado` })
})

export { productRoute }
