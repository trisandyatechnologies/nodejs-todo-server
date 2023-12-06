var express = require("express");
var router = express.Router();
const client = require("../db");
const { ObjectId } = require("mongodb");

/**
 * 1. Code duplication
 *  - Write a function and use it wherever needed
 * 2. Multiple connections
 *  - import connection directly created somewhere elese
 * 3. No schema restriction
 *  - Use ORM libraries
 */

/* GET users listing. */
router.get("/", function (req, res, next) {
  client
    .connect()
    .then((dbClient) => {
      const db = dbClient.db("todoapp");
      db.collection("todos")
        .find({})
        .toArray()
        .then((todos) => {
          res.send(todos);
        })
        .catch((err) => {
          res.send(err.message);
        });
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.post("/", function (req, res, next) {
  client
    .connect()
    .then((dbClient) => {
      const db = dbClient.db("todoapp");
      db.collection("todos")
        .insertOne(req.body)
        .then((todo) => {
          res.send(todo.insertedId);
        })
        .catch((err) => {
          res.send(err.message);
        });
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.delete("/:id", function (req, res, next) {
  client
    .connect()
    .then((dbClient) => {
      const db = dbClient.db("todoapp");
      db.collection("todos")
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then((todo) => {
          res.send("" + todo.deletedCount);
        })
        .catch((err) => {
          res.send(err.message);
        });
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.put("/:id", function (req, res, next) {
  client
    .connect()
    .then((dbClient) => {
      const db = dbClient.db("todoapp");
      db.collection("todos")
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
        .then((todo) => {
          res.send("" + todo.modifiedCount);
        })
        .catch((err) => {
          res.send(err.message);
        });
    })
    .catch((err) => {
      res.send(err.message);
    });
});

module.exports = router;
