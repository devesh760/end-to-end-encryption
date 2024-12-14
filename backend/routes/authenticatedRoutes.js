const express = require("express");
const { Session, todos } = require("../models");

const router = express.Router();

// Middleware for session authentication
const authenticateSession = (req, res, next) => {
  const { sessionId } = req.headers;
  if (!Session.authenticate(sessionId)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.user = Session.findUser(sessionId); // Attach the user to the request
  if (!req.user) {
    return res.status(401).json({ error: "Invalid session" });
  }
  next();
};

// Apply middleware to all routes in this file
router.use(authenticateSession);

// Logout route
router.post("/logout", (req, res) => {
  const { sessionId } = req.headers;
  Session.deleteSession(sessionId);
  res.json({ message: "Logged out successfully" });
});

// Add a todo
router.post("/add-todo", (req, res) => {
  const { iv, content, salt } = req.body;
  if (!iv || !content || !salt) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const todo = req.user.addTodo({ iv, content, salt });
  res.json(todo);
});

// Get all todos
router.get("/get-todos", (req, res) => {
  const todos = req.user.getAllMyTodos();
  res.json(todos);
});

// Get a specific todo
router.get("/get-todo", (req, res) => {
  const { todoId } = req.query;
  if (!todoId) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const todo = todos.find((todo) => todo.id === todoId);
  if (!todo || !req.user.todoIds.includes(todo.id)) {
    return res.status(404).json({ error: "Todo not found" });
  }
  res.json(todo);
});

module.exports = router;
