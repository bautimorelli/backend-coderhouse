const express = require("express")
const { Router } = require("express")
const Api = require("./api")
const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"));

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))

const route = Router()

const productosApi = new Api()

//....Endpoints
route.get("/", (req, res) => {
    const productos = productosApi.getAll()
	res.json({ productos })
})

route.post("/", (req, res) => {
    let producto = req.body
    productosApi.save(producto)
	res.json({ msg: 'se agrego el producto' })
})

route.get("/:id", (req, res) => {
    let producto = productosApi.getById(req.params.id)
	res.json({ producto })
})

route.put("/:id", (req, res) => {
    let result = productosApi.replaceById(req.params.id, req.body)
    res.json({result})
})

route.delete("/:id", (req, res) => {
    productosApi.deleteById(req.params.id)
	res.json({ msg: 'id eliminado' })
})

app.use("/api/productos", route)
