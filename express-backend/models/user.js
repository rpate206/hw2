// importing mongoose library
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// instantiating Schema
const UserSchema = new mongoose.Schema({
  // define validations for db to perform for us
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todoList: [{ type: Schema.Types.ObjectId, ref: "todoItem" }],
});

//Export model
module.exports = mongoose.model("User", UserSchema);
