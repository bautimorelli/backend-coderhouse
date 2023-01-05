import mongoose from "mongoose"
import { options } from "./databaseConfig.js"

const initializeMongo = () => {
	mongoose.connect(
		options.mongoDb.databaseURL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(error) => {
			if (error) return console.log("hubo un error al conectarse")
			console.log("conexion exitosa")
		}
	)
}

export default initializeMongo
