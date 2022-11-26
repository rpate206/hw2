// importing mongoose library
const mongoose = require("mongoose");

// instantiating Schema
const ThemeSchema = new mongoose.Schema({
  // define validations for db to perform for us
  primaryColor: { type: String, required: true },
  secondaryColor: { type: String, required: true },
});

//Export model
module.exports = mongoose.model("Theme", ThemeSchema);
