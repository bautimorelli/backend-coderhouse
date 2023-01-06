import express from "express"
import { faker } from '@faker-js/faker'

const {commerce, image, datatype} = faker
const productRoute = express.Router()

productRoute.get("/faker", async (req, res) => {
	const cantProductos = 5
	let arrayProductos = []
	for (let index = 0; index < cantProductos; index++) {
		const title = commerce.product()
		arrayProductos.push({
			id:datatype.uuid(),
			title: title,
			price: commerce.price(),
			thumbnail: image.imageUrl(100, 100, title, true)
		})
	}
	console.log(arrayProductos)
	res.render("products", { products: arrayProductos })
})

export {productRoute}
