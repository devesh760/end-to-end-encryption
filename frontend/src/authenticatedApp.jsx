import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main";
import NewTodoModal from "./components/newTodoModal/newTodoModal";
import styles from "./App.module.css";

const AuthenticatedApp = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div>
      <header className={styles.header}>
        <h1>Todo App</h1>
        <button className={styles.btn} onClick={() => setShowModal(true)}>
          Add New +
        </button>
      </header>
      <NewTodoModal show={showModal} onClose={() => setShowModal(false)} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/todos/:id" element={<SingleTodoPage />} />
        <Route path="/todos/shared/:id" element={<SingleTodoPageShared />} /> */}
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
