import express from "express"
import bodyParser from "body-parser"
import { appConfig } from "./config/index.js"
import { homeRoute } from "./routes/index.js"

import { connectToDatabase } from "./services/dbConnector.js"

const app = express()
app.use(bodyParser.json())
const PORT = appConfig.port

//  connect to the database
const getDb = async () => {
	const connection = await connectToDatabase()
	// start the server only if the database is connected
	if (connection) {
		app.listen(PORT, () => {
			console.log(`Server is listening on ${PORT}`)
		})
	}
	return connection
}

//  define a simple route with middleware
app.use("/", homeRoute)
app.get("/books", async (req, res) => {
	let allBooks = []

	const db = await getDb()
	const books = await db
		.collection("books")
		.find()
		.sort({ author: 1 })
		.toArray()
		.then(() => {
			res.status(200).json(allBooks)
		})
		.catch((err) => {
			res.status(500).json({ message: err.message })
		})
	// .forEach((book) => allBooks.push(book))

	res.json({
		message:
			"Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
		body: books
	})
})
