import express from "express"

const router = express.Router()

// get home route
export const homeRoute = router.get("/books", async (req, res) => {
	res.json({ msg: "Welcome to the api" })
})

// get all data frm db
export const readRoute = router.get("/read", async (req, res) => {
	// const doc = await myModel.find()
	res.send("Hello World!")
})

// Create
export const createRoute = router.post("/create", async (req, res) => {
	const { name, age } = req.body

	res.send("Created Data")
})

// ReadById
export const readByIdRoute = router.get("/read/:id", async (req, res) => {
	const { id } = req.params

	res.send("Read Data by Id")
})

// UpdateById
export const updateByIdRoute = router.put("/update/:id", async (req, res) => {
	const { id } = req.params
	const { name, age } = req.body
	res.send("Updated Data")
})

// DeleteById
export const deleteByIdRoute = router.delete(
	"/delete/:id",
	async (req, res) => {
		const { id } = req.params

		res.send({ message: "Document deleted" })
	}
)
