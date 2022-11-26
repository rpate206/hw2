var express = require("express");

var app = express();

require("./setupMongo")();

// route definition
app.use(express.json()); // express.json() : parse request bodies containing json

// if express server gets any request on /auth --> redirect to routes/auth
app.use("/auth", require("./routes/auth"));

// if express server gets any request on /todo --> redirect to routes/todo
// could not use singular 'todo' -- kept returning 404 -- now using 'todos'
app.use("/todos", require("./routes/todo"));

module.exports = app;
