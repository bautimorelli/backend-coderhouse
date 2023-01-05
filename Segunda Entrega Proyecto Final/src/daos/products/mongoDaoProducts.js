import { MongoDbContainer } from "../../containers/mongoDbContainer.js"

class MongoDAOProducts extends MongoDbContainer {
	constructor(model) {
		super(model)
	}
}

export { MongoDAOProducts }
