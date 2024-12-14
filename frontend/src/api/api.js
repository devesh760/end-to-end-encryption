import { generateAESKey, generateSalt } from "./crypto";

const BASE_ENDPOINT =
  process.env.REACT_APP_BASE_ENDPOINT || "http://localhost:3000";
const AUTH_KEY = process.env.REACT_APP_AUTH_KEY || "TODO_APP_AUTH";

export const getAuth = () => JSON.parse(localStorage.getItem(AUTH_KEY));

export const setAuth = (auth) =>
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));

export const removeAuth = () => localStorage.removeItem(AUTH_KEY);

const base = async (endpoint, method, data) => {
  const response = await fetch(`${BASE_ENDPOINT}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      sessionId: getAuth()?.sessionId,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
};

export const registerUser = async (username, password) => {
  const salt = await generateSalt();
  const hashedPassword = await generateAESKey(password, salt);
  console.log("🚀 ~ registerUser ~ hashedPassword:", hashedPassword);
  return await base("register", "POST", { username, hashedPassword, salt });
};

export const checkAuth = async () => {
  return await base("isAuthenticated", "GET");
};

export const loginUser = async (username, password) => {
  return await base("login", "POST", { username, password });
};

export const logoutUser = async () => {
  return await base("logout", "POST");
};

// TODO API functions

export const addTodo = async (iv, content, salt) => {
  return await base("add-todo", "POST", { iv, content, salt });
};

export const getTodos = async () => {
  return await base("get-todos", "GET");
};

export const getTodo = async (todoId) => {
  return await base(`get-todo?todoId=${todoId}`, "GET");
};
