const { v4 } = require("uuid");

class Todo {
  constructor(iv, content, salt) {
    this.iv = iv;
    this.content = content;
    this.id = v4();
    this.salt = salt;
  }
}

class User {
  constructor(name, hashedPassword, salt) {
    this.name = name;
    this.userId = v4();
    this.todoIds = [];
    this.hashedPassword = hashedPassword;
    this.salt = salt;
  }

  addTodo = ({ iv, content, salt }) => {
    const todo = new Todo(iv, content, salt);
    todos.push(todo);
    this.todoIds.push(todo.id);
    return todo;
  };

  getAllMyTodos = () => {
    return todos.filter((todo) => this.todoIds.includes(todo.id));
  };
}

class Session {
  constructor(userId) {
    this.userId = userId;
    this.sessionId = v4();
    this.expiry = Date.now() + 30 * 60 * 1000; // 30-minute session expiry
  }

  static sessions = [];

  static createSession = (userId) => {
    Session.sessions = Session.sessions.filter(
      (session) => session.userId !== userId || session.isExpired()
    );
    const session = new Session(userId);
    Session.sessions.push(session);
    return session;
  };

  static findSession = (sessionId) => {
    const session = Session.sessions.find(
      (session) => session.sessionId === sessionId
    );
    if (session && !session.isExpired()) {
      return session;
    }
    Session.sessions = Session.sessions.filter((s) => s.id !== sessionId);
    return null;
  };

  static findUser = (sessionId) => {
    const session = Session.findSession(sessionId);
    if (!session) {
      return null;
    }
    return users.find((user) => user.userId === session.userId);
  };

  static deleteSession = (sessionId) => {
    Session.sessions = Session.sessions.filter(
      (session) => session.sessionId !== sessionId
    );
  };

  static authenticate = (sessionId) => {
    return !!Session.findSession(sessionId);
  };

  isExpired = () => {
    return Date.now() > this.expiry;
  };
}

const todos = [];
const users = [];

module.exports = { Todo, User, Session, todos, users };
