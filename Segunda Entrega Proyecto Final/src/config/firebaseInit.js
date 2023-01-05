import admin from "firebase-admin"
import { options } from "./databaseConfig.js"
import serviceAccount from "../db/firebaseKey.json" assert { type: "json" }

const firebaseInit = () => {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: options.firebase.databaseURL,
	})
}

export default firebaseInit
