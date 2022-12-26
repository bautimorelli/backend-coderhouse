import { options } from "../config/databaseConfig.js"

let ContainerDaoCarts
let ContainerDaoProducts

let databaseType = "mongoDb"

switch (databaseType) {
	case "archivo":
		const { FileDAOCarts } = await import("./carts/fileDaoCarts.js")
		const { FileDAOProducts } = await import(
			"./products/fileDaoProducts.js"
		)
		ContainerDaoCarts = new FileDAOCarts(options.archivo.pathCarts)
		ContainerDaoProducts = new FileDAOProducts(options.archivo.pathProducts)
		break

	case "memory":
		const { MemoryDAOCarts } = await import("./carts/memoryDaoCarts.js")
		const { MemoryDAOProducts } = await import(
			"./products/memoryDaoProducts.js"
		)
		ContainerDaoCarts = new MemoryDAOCarts()
		ContainerDaoProducts = new MemoryDAOProducts()
		break

	case "firebase":
		const { FirebaseDAOCarts } = await import("./carts/firebaseDaoCarts.js")
		const { FirebaseDAOProducts } = await import(
			"./products/firebaseDaoProducts.js"
		)
		ContainerDaoCarts = new FirebaseDAOCarts(
			options.firebase.cartsCollection
		)
		ContainerDaoProducts = new FirebaseDAOProducts(
			options.firebase.productsCollection
		)
		break

	case "mongoDb":
		const { MongoDAOCarts } = await import("./carts/mongoDaoCarts.js")
		const { MongoDAOProducts } = await import(
			"./products/mongoDaoProducts.js"
		)
		ContainerDaoCarts = new MongoDAOCarts(
			options.mongoDb.cartModel.cartCollecion,
			options.mongoDb.cartModel.cartSchema
		)
		ContainerDaoProducts = new MongoDAOProducts(
			options.mongoDb.productModel.productCollection,
			options.mongoDb.productModel.productSchema
		)
		break
}

export { ContainerDaoCarts, ContainerDaoProducts }
