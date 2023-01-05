import { MongoDbContainer } from "../../containers/mongoDbContainer.js"

class MongoDAOCarts extends MongoDbContainer {
	constructor(model) {
		super(model)
	}
}

export { MongoDAOCarts }
