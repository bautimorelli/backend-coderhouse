class Usuario {
	constructor(nombre, apellido, libros, mascotas) {
		this.nombre = nombre
		this.apellido = apellido
		this.libros = libros
		this.mascotas = mascotas
	}

	getFullName() {
		return `${this.nombre} ${this.apellido}`
	}

	addMascota(mascota) {
		this.mascotas.push(mascota)
	}

	countMascotas() {
		return this.mascotas.length
	}

	addBook(nombre, autor) {
		this.libros.push({ nombre: nombre, autor: autor })
	}

	getBookNames() {
		const nombres = []
		this.libros.forEach((element) => {
			nombres.push(element.nombre)
		})
		return nombres
	}
}

const libros = [
	{ nombre: "El señor de las moscas", autor: "William Golding" },
	{ nombre: "Fundacion", autor: "Isaac Asimov" },
]
const mascotas = ["perro", "gato"]
const prueba = new Usuario("Elon", "Musk", libros, mascotas)
console.log("Nombre: " + prueba.getFullName())
console.log("Mascotas: " + prueba.countMascotas())
prueba.addMascota("hamster")
console.log("Mascota agregada")
console.log("Mascotas: " + prueba.countMascotas())
console.log("Libros: " + prueba.getBookNames().toString())
prueba.addBook((nombre = "La Brujula Dorada"), (autor = "Philip Pullman"))
console.log("Libro agregado")
console.log("Libros: " + prueba.getBookNames().toString())
