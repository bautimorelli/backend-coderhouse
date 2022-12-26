import { MongoDbContainer } from "../../containers/mongoDbContainer.js"

class MongoDAOCarts extends MongoDbContainer {
	constructor(name, schema) {
		super(name, schema)
	}
}

export { MongoDAOCarts }
