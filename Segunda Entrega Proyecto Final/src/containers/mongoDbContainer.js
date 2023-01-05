class MongoDbContainer {
	constructor(model) {
		this.model = model
	}

	async getAll() {
		try {
			let objects = await this.model.find()
			return objects
		} catch (error) {
			console.log("Error al conseguir los objetos de firebase", error)
		}
	}

	async save(object) {
		try {
			const response = await this.model.create(object)
			return response.id
		} catch (error) {
			console.log("Error al guardar", error)
		}
	}

	async getById(id) {
		try {
			const response = await this.model.findById(id)
			return response
		} catch (error) {
			console.log("Error al conseguir por id", error)
		}
	}

	async deleteById(id) {
		try {
			const response = await this.model.findByIdAndDelete(id)
			return response
		} catch (error) {
			console.log("Error al borrar por id", error)
		}
	}

	async deleteAll() {
		try {
			const response = await this.model.remove()
			return response
		} catch (error) {
			console.log("Error al borrar todos", error)
		}
	}

	async updateById(id, object) {
		try {
			const response = await this.model.findByIdAndUpdate(id, object, {
				new: true,
			})
			return response
		} catch (error) {
			console.log(error)
		}
	}
}

export { MongoDbContainer }
