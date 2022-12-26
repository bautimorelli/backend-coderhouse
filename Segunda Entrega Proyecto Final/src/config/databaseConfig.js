import { cartModel } from "../models/cartModel.js"
import { productModel } from "../models/productModel.js"

export const options = {
	archivo: {
		pathProducts: "productos.json",
		pathCarts: "carritos.json",
	},
	firebase: {
		cartsCollection: "carts",
		productsCollection: "products",
	},
	mongoDb: {
		cartModel,
		productModel,
	},
}
