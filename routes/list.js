var express = require("express");
var router = express.Router();
const client = require("../db");
const { ObjectId } = require("mongodb");
const prisma = require("../prisma");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const todos = await prisma.todo.findMany({});
  res.send(todos);
});

router.post("/", async function (req, res, next) {
  try {
    const todo = await prisma.todo.create({ data: req.body });
    res.send(todo);
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/:id", async function (req, res, next) {
  const todo = await prisma.todo.delete({
    where: {
      id: req.params.id,
    },
  });
  res.send(todo);
});

router.put("/:id", async function (req, res, next) {
  const todo = await prisma.todo.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.send(todo);
});

module.exports = router;
