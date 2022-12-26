import admin from "firebase-admin"
import serviceAccount from "../db/firebaseKey.json" assert { type: "json" }

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "htpps://coderhousebackend.firebase.io",
})

const db = admin.firestore()

class FirebaseContainer {
	constructor(nameCollection) {
		this.collection = db.collection(nameCollection)
	}

	async getAll() {
		try {
			const querySnapshot = await this.collection.get()
			let docs = querySnapshot.docs
			let objects = docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}))
			return objects
		} catch (error) {
			console.log("Error al conseguir los objetos de firebase", error)
		}
	}

	async save(object) {
		try {
			let doc = this.collection.doc()
			await doc.create(object)
		} catch (error) {
			console.log("Error al guardar", error)
		}
	}

	async getById(id) {
		try {
			const doc = this.collection.doc(id)
			const item = await doc.get()
			const response = item.data()
			return response
		} catch (error) {
			console.log("Error al conseguir por id", error)
		}
	}

	async deleteById(id) {
		try {
			const doc = this.collection.doc(id)
			const response = await doc.delete()
			return response
		} catch (error) {
			console.log("Error al borrar por id", error)
		}
	}

	async deleteAll() {
		try {
			const doc = this.collection.doc()
			const response = await doc.delete()
			return response
		} catch (error) {
			console.log("Error al borrar todos", error)
		}
	}

	async updateById(id, object) {
		try {
			const doc = this.collection.doc(id)
			const response = await doc.update(object)
			return response
		} catch (error) {
			console.log(error)
		}
	}
}

export { FirebaseContainer }
