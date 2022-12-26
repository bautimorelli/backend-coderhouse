import { MongoDbContainer } from "../../containers/mongoDbContainer.js"

class MongoDAOProducts extends MongoDbContainer {
	constructor(name, schema) {
		super(name, schema)
	}
}

export { MongoDAOProducts }
