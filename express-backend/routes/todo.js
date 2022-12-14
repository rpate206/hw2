// router for creating posts
const express = require("express");
const jwt = require("jsonwebtoken");

const TodoItem = require("../models/todoItem");

const privateKey = "";

// instantiate router
const router = express.Router();

router.use(function (req, res, next) {
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
        _id: savedTodo._id,
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

// for delete request for '/'
router.delete("/:id", async function (req, res, next) {
  const todoID = req.params.id;
  await TodoItem.findByIdAndDelete(todoID).exec();
  return res.status(200);
});

// for put or patch request for '/'
router.patch("/:id", async function (req, res, next) {
  const todoID = req.params.id;
  const newCompleted = req.body.completed;
  const newDateCompleted = req.body.dateCompleted;
  await TodoItem.findByIdAndUpdate(todoID, {
    completed: newCompleted,
    dateCompleted: newDateCompleted,
  }).exec();
  return res.status(200);
});

// export
module.exports = router;
