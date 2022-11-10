class Api {
	constructor() {
		this.productos = []
	}

	getAll() {
		return this.productos
	}

	save(producto) {
		const id = this.productos.length + 1
		producto.id = id
		this.productos.push(producto)
	}

	getById(id) {
		let producto = this.productos.find((element) => element.id == id)
		if (producto == undefined) {
			producto = { error: "producto no encontrado" }
		}
		return producto
	}

	deleteById(id) {
		const result = this.productos.filter((element) => element.id != id)
		//Reordeno los id
		if (result.length > 0) {
			let count = 1
			result.forEach((element) => {
				element.id = count
				count++
			})
		}
		this.productos = result
	}

	replaceById(id, producto) {
		let index = this.productos.findIndex((element) => element.id == id)
		if (index == -1) {
			return { error: "producto no encontrado" }
		}
		producto.id = id
		this.productos[index] = producto
        return { msg: "producto reemplazado"}
	}
}

module.exports = Api
