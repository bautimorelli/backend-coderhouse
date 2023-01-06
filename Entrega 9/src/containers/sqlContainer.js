import knex from "knex"

class SQLContainer {
	constructor(options, tableName) {
		this.database = knex(options)
		this.table = tableName
	}

	async getAll() {
		try {
			const response = await this.database.from(this.table).select("*")
			return response
		} catch (error) {
			return `Hubo un error ${error}`
		}
	}

	async save(object) {
		try {
			const [id] = await this.database.from(this.table).insert(object)
			return `save successfully with id ${id}`
		} catch (error) {
			return `Hubo un error ${error}`
		}
	}
}

export { SQLContainer }
