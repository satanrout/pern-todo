const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
//ROUTES

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE tid = $1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE tid = $2",
      [description, id]
    );
    res.json("todo was updated");
  } catch (err) {
    console.log(err);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE tid = $1", [
      id,
    ]);
    res.json("todo was deleted");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, (req, res) => {
  console.log(`Server running  on ${port}`);
});
