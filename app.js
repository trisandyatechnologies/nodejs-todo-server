const express = require("express");
const app = express();
const port = 8080;

/**
 * Frontend - Client
 * ||
 * \/
 * HTTP Request
 * ||
 * \/
 * Backend (Server) - API: Application Programming Interface
 */

/**
 * Request
 * CREATE: (C)
 * READ: (R)
 * UPDATE: (U)
 * DELETE: (D)
 *
 * REST API - Respresentational State Transfer Protocol
 * (Twitter API Standards)
 * GET    https://www.trisandya.com/api/todos
 * GET    https://www.trisandya.com/api/todos/:todoId
 * PUT    https://www.trisandya.com/api/todos/:todoId
 * DELETE https://www.trisandya.com/api/todos/:todoId
 * POST   https://www.trisandya.com/api/todos
 *
 * Request.Body
 */

/**
 * (Twitter API Standards)
 * GET      /users/:userId/tweets/:tweetId/comments/:commentId/likes/:likeId
 * POST     /users/:userId/tweets
 * DELETE   /users/:userId/tweets/:tweetId
 */

/**
 * MVC - Model - View - Controller
 */

/**
 * TODO - App
 */

class TodoService {
  todos;
  constructor() {
    this.todos = [];
  }

  createTodo(todoObj) {
    const id = this.todos.length;
    const newTodo = { id, ...todoObj };
    this.todos.push(newTodo);
    return newTodo;
  }

  getTodo(todoId) {
    return this.todos[todoId];
  }

  getTodos() {
    return this.todos;
  }

  updateTodo(id, body) {
    const updatedTodo = { ...this.todos[id], ...body };
    this.todos[id] = updatedTodo;
    return updatedTodo;
  }

  deleteTodo(id) {
    this.todos.splice(id, 1);
  }
}

const service = new TodoService();

app.use(express.json());

/**
 * READ
 */
app.get("/todos", (req, res) => {
  res.send(service.getTodos());
});

/**
 * CREATE
 */
app.post("/todos", (req, res) => {
  const newTodo = service.createTodo(req.body);
  res.send(newTodo);
});

/**
 * READ
 */
app.get("/todos/:todoId", (req, res) => {
  res.send(service.getTodo(req.params.todoId));
});

/**
 * UPDATE
 */
app.put("/todos/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  res.send(service.updateTodo(todoId, req.body));
});

/**
 * DELETE
 */
app.delete("/todos/:todoId", (req, res) => {
  res.send(service.deleteTodo(req.params.todoId));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/:name", (req, res) => {
  res.send("Hello World!" + "<h1>" + req.params.name + "</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
