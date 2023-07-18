import { MongoClient, ServerApiVersion } from "mongodb"
import { appConfig } from "../config/index.js"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(
	appConfig.localMongoDbUri || appConfig.mongoDbUri,
	{
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true
		}
	}
)

export const connectToDatabase = async function () {
	try {
		// Connect the client to the server (optional starting in v4.7)
		await client.connect()
		console.log(" You successfully connected to MongoDB!")

		// return the database object
		return client.db(appConfig.dbName)
	} catch (err) {
		console.error(err)
	}
}
