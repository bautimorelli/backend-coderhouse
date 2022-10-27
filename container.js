const fs = require("fs")

class Container {
	constructor(archivo) {
		this.ruta = "./" + archivo
	}

	async readFile() {
		try {
			const contenido = await fs.promises.readFile(this.ruta, "utf-8")
			return JSON.parse(contenido)
		} catch (error) {
			console.log("Error de lectura", error)
		}
	}

	async writeFile(content) {
		try {
			await fs.promises.writeFile(this.ruta, content)
		} catch (error) {
			console.log("Error de escritura", error)
		}
	}

	async getAll() {
		try {
			if (fs.existsSync(this.ruta)) {
				const archivos = await this.readFile()
				console.log("Archivo: ")
				console.log(archivos)
				return archivos
			} else {
				console.log("El archivo no existe")
				return []
			}
		} catch (error) {
			console.log("Error al conseguir los objetos del archivo", error)
		}
	}

	async save(object) {
		try {
			if (fs.existsSync(this.ruta)) {
				const objects = await this.readFile()
				const id = objects.length + 1
				object.id = id
				objects.push(object)
				await this.writeFile(JSON.stringify(objects, null, 2))
				console.log(`Objeto Guardado con id ${id}`)
				return id
			} else {
				object.id = 1
				await this.writeFile(JSON.stringify([object], null, 2))
				console.log("Objeto Guardado con id 1")
			}
		} catch (error) {
			console.log("Error al guardar", error)
		}
	}

	async getById(number) {
		try {
			if (fs.existsSync(this.ruta)) {
				const objects = await this.readFile()
				let object = objects.find((element) => element.id == number)
				if (object == undefined) {
					object = null
				}
				console.log(`Objeto cuyo id es ${number}: `)
				console.log(object)
				return object
			} else {
				console.log("El archivo no existe")
				return null
			}
		} catch (error) {
			console.log("Error al conseguir por id", error)
		}
	}

	async deleteById(number) {
		try {
			if (fs.existsSync(this.ruta)) {
				const objects = await this.readFile()
				const result = objects.filter((element) => element.id != number)
				//Reordeno los id
				if (result.length > 0) {
					let count = 1
					result.forEach((element) => {
						element.id = count
						count++
					})
				}
				await this.writeFile(JSON.stringify(result, null, 2))
				console.log(`El objeto con el id ${number} ha sido eliminado`)
			} else {
				console.log("El archivo no existe")
			}
		} catch (error) {
			console.log("Error al borrar por id", error)
		}
	}

	async deleteAll() {
		try {
			await this.writeFile("[]", null, 2)
			console.log("Archivo vaciado")
		} catch (error) {
			console.log("Error al borrar todos", error)
		}
	}
}

module.exports = Container