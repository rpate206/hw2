// router for creating posts
const express = require("express");
const jwt = require("jsonwebtoken");

const TodoItem = require("../models/todoItem");

const privateKey = "";

// instantiate router
const router = express.Router();

router.use(function (req, res, next) {
  console.warn("test");
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// for post request for '/'
router.post("/", async function (req, res) {
  const todoItem = new TodoItem({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    dateCreated: req.body.dateCreated,
    completed: req.body.completed,
    dateCompleted: req.body.dateCompleted,
  });
  await todoItem
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        id: savedTodo._id,
        title: savedTodo.title,
        description: savedTodo.description,
        author: savedTodo.author,
        dateCreated: savedTodo.dateCreated,
        completed: savedTodo.completed,
        dateCompleted: savedTodo.dateCompleted,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

// for get request for '/'
router.get("/", async function (req, res, next) {
  // find all Todo items where author == req.payload.id
  const todoList = await TodoItem.find()
    .where("author")
    .equals(req.payload.id)
    .exec();
  return res.status(200).json({ todoList: todoList });
});

// export
module.exports = router;
