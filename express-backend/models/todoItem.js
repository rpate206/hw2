const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // ref to User collection
  author: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: { type: String },
  completed: { type: Boolean },
  dateCompleted: { type: String },
});

//Export model
module.exports = mongoose.model("TodoItem", TodoItemSchema);
