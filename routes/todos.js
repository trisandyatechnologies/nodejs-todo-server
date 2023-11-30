var express = require("express");
var router = express.Router();
const client = require("../db");

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

module.exports = router;
