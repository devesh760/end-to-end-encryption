import React from "react";
import TodoTile from "../components/todoTile/todoTile";
import styles from "./main.module.css";

const TodoList = ({ todos }) => {
  return (
    <div className={styles.container}>
      {todos.map((todo, index) => (
        <TodoTile key={index} todo={todo} />
      ))}
    </div>
  );
};

const todos = [
  {
    title: "Todo 1",
    description: "This is the first todo",
    creator: "John Doe",
    id: 1,
  },
  {
    title: "Todo 2",
    description: "This is the second todo",
    creator: "Jane Doe",
    id: 2,
  },
  {
    title: "Todo 3",
    description: "This is the third todo",
    creator: "John Doe",
    id: 3,
  },
];
const MainPage = () => {
  return (
    <main>
      <TodoList todos={todos} />
    </main>
  );
};

export default MainPage;
