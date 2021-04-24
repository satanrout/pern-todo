const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Todo = require("./models/todoSchema");
const mongoose = require("mongoose");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

mongoose.set("useFindAndModify", false);

//database connection
connectDB();

//ROUTES

//test

app.get("/", async (req, res) => {
  try {
    res.send("is it working?");
  } catch (error) {
    res.status(404).json(error);
  }
});

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { todo } = await req.body;
    const newTodo = await new Todo({
      todo: todo,
    });
    await newTodo.save();
    res.status(200).json({ status: "success", data: "added task successfuly" });
  } catch (err) {
    res.status(404).json({ status: "failed", data: err });
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await Todo.find({});
    res.status(200).json({ status: "success", data: allTodos });
  } catch (error) {
    res.status(404).json({ status: "failed", data: err });
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res
      .status(200)
      .json({ status: "success", data: "fetched task succesfuly" });
  } catch (err) {
    res.status(404).json({ status: "failed", data: err });
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ status: "success", data: "updated successfuly" });
  } catch (err) {
    res.status(404).json({ status: "failed", data: err });
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: "success", data: "task deleted succesfuly" });
  } catch (err) {
    res.status(404).json({ status: "failed", data: err });
  }
});

const port = process.env.PORT || 5001;

app.listen(port, (req, res) => {
  console.log(`Server running  on ${port}`);
});
