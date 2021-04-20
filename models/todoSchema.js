const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    todo: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
