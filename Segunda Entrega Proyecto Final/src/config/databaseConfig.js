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
		databaseURL: "htpps://coderhousebackend.firebase.io"
	},
	mongoDb: {
		cartModel,
		productModel,
		databaseURL: "mongodb+srv://bautista:7991@backendcoderhouse.kuu8jnn.mongodb.net/ecommerce?retryWrites=true&w=majority"
	}
}
