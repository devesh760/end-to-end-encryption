import React from "react";
import { useNavigate } from "react-router";
import styles from "./todoTile.module.css";

const TodoTile = ({ todo }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/todos/${todo.id}`);
  };
  return (
    <div className={styles.tile} onClick={handleClick}>
      <h2 className={styles.title}>{todo.title}</h2>
      <p className={styles.description}>{todo.description}</p>
      <span className={styles.creator}>
        <i>Created by: {todo.creator}</i>
      </span>
    </div>
  );
};

export default TodoTile;
