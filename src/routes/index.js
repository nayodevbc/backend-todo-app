const { Router } = require("express")
const router = Router()
const { get,run } = require("./../services/db.js")

router.get("/", async (req,res,next) => {
    try {
        const query = "SELECT * FROM todos"
        const listTodos = await get(query)
        res.status(200).json({ message: "To-dos retrieved successfully!", data: listTodos})
    } catch (error) {
        res.status(500).json({ message: "Error de servidor!", error })
    }
})

router.post("/", async (req,res,next) => {
    try {
        const { title, description } = req.body
        const query = "INSERT INTO todos (title,description) VALUES (?,?)"
        const result = await run(query,[title,description])
        res.status(200).json({message: "To-do created successfully",
        toDo: {
          id: result.lastID,
          title,
          description,
          isDone: false
        }})
    } catch (error) {
        res.status(500).json({ message: "Error de servidor!", error })
    }
})

router.delete("/:id", async (req,res,next) => {
    try {
        const id = req.params["id"]
        const query = "DELETE FROM todos WHERE id = ?"
        const result = await run(query,[id])
        res.status(200).json({message: "To-do deleted successfully",
        toDo: result[0]})
    } catch (error) {
        res.status(500).json({ message: "Error de servidor!", error })
    }
})

router.patch("/:id", async (req,res,next) => {
    try {
        const id = req.params["id"]
        const { isDone,description,title } = req.body
        const query = "UPDATE todos SET title = ?, isDone = ?, description = ? WHERE id = ?"
        const result = await run(query,[title,isDone,description,id])
        res.status(200).json({message: "To-do deleted successfully",
        toDo: result[0]})
    } catch (error) {
        res.status(500).json({ message: "Error de servidor!", error })
    }
})

module.exports = router;