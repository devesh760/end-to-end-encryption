const express = require("express");
const cors = require("cors"); // Import CORS
const { User, Session, users } = require("./models");
const authenticatedRoutes = require("./routes/authenticatedRoutes");
const { checkPassword } = require("./util/crypto");

const app = express();
const port = 3000;

// Enable CORS for all routes and origins
app.use(cors());

app.use(express.json());

// Public routes
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/register", (req, res) => {
  const { username, hashedPassword, salt } = req.body;
  console.log(req.body);
  if (!username || !hashedPassword) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const userExists = users.find((user) => user.name === username);
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }
  const user = new User(username, hashedPassword, salt);
  users.push(user);
  const session = Session.createSession(user.userId);
  res.json(session);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const user = users.find((user) => user.name === username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const isValidPassword = await checkPassword(
    password,
    user.salt,
    user.hashedPassword
  );

  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const session = Session.createSession(user.userId);
  res.json(session);
});

app.get("/isAuthenticated", (req, res) => {
  const sessionId = req.headers.sessionid;

  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const session = Session.findSession(sessionId);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = users.find((user) => user.userId === session.userId);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json(session);
});

// Use authenticated routes
app.use(authenticatedRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
