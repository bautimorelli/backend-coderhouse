const express = require("express")
const Container = require("./container")
const app = express()
const PORT = 8080

app.listen(PORT, ()=>console.log(`server listening on port ${PORT}`))

const productContainer = new Container("productos.txt") 

//....Endpoints
app.get("/productos",async(request, response) => {
    const products = await productContainer.getAll()
    response.send(products)
})

app.get("/productoRandom",async(request, response) => {
    const products = await productContainer.getAll()
    const randomId = Math.floor(Math.random() * products.length)
    const product = products[randomId]
    response.send(product)
})