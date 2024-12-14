import React, { useState } from "react";
import { createPortal } from "react-dom";

import styles from "./authModal.module.css";

const Portal = ({ children }) =>
  createPortal(children, document.getElementById("root"));

const LoginRegisterModal = ({ show, onSubmit }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "register" && password !== confirmPassword) {
      setConfirmPassword("");
      alert("Passwords do not match");
      return;
    }
    onSubmit({
      username,
      password,
      confirmPassword,
      isLogin: activeTab === "login",
    });
  };
  console.log("Rendered");
  if (!show) return null;

  return (
    <Portal>
      <div className={styles.modal}>
        <div className={styles["modal-content"]}>
          <div className={styles.tabs}>
            <button
              className={activeTab === "login" ? styles.active : ""}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={activeTab === "register" ? styles.active : ""}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* Tab content with animation */}
          {activeTab === "login" && (
            <div className={`${styles.tabContent}`}>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={styles.btnSubmit}>
                  Login
                </button>
              </form>
            </div>
          )}

          {activeTab === "register" && (
            <div className={`${styles.tabContent}`}>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit" className={styles.btnSubmit}>
                  Register
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default LoginRegisterModal;
