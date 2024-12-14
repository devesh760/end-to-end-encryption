import React from "react";
import { createPortal } from "react-dom";
import { addTodo } from "../../api/api";

import styles from "./newTodoModal.module.css";

const Portal = ({ children }) =>
  createPortal(children, document.getElementById("root"));

const NewTodoModal = ({ show, onClose }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    addTodo({
      title,
      description,
    });
    onClose();
  };

  return (
    <Portal>
      {show && (
        <div className={styles.modal}>
          <div className={styles.backdrop} onClick={onClose} />
          <div className={styles["modal-content"]}>
            <button className={styles["close-btn"]} onClick={onClose}>
              ×
            </button>
            <h2>Add New Todo</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" required />

              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" rows="4" required />

              <button type="submit" className={styles["submit-btn"]}>
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default NewTodoModal;
