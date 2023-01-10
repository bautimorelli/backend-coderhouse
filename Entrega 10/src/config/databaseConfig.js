const options = {
	mariaDB: {
		client: "mysql",
		connection: {
			host: "127.0.0.1",
			user: "root",
			password: "",
			database: "chatdb",
		},
	},
	mongoAtlas: {
		urlDatabase: "mongodb+srv://bautista:7991@backendcoderhouse.kuu8jnn.mongodb.net/sessionsDB?retryWrites=true&w=majority",
	}
}

export { options }
