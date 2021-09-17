const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/project-2'

const DB = process.env.DB_REMOTE

mongoose
	.connect(DB)
	.then((x) => {
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`
		)
	})
	.catch((err) => {
		console.error('Error connecting to mongo: ', err)
	})
