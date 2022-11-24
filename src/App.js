import React, { useState } from "react";

import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import { getToDoList } from "./utils/storage";

export default function App() {
  const [auth, setAuth] = useState({
    token: "",
    user: {},
  });

  const onLoginSuccess = (token, user) => {
    const todoList = getToDoList() ?? [];
    setAuth({ token, user, todoList });
  };

  const onLogOut = () => {
    setAuth({
      token: "",
      user: {},
    });
  };

  return (
    <div className="container">
      {auth.token && (
        <div className="d-flex flex-row justify-content-end">
          <a
            href="/"
            className="btn btn-primary m-3 btn-hover"
            role="button"
            onClick={onLogOut}
          >
            Log out
          </a>
        </div>
      )}
      {auth.token ? (
        <Dashboard todoList={auth.todoList} />
      ) : (
        <LoginForm onLoginSuccess={onLoginSuccess} />
      )}
    </div>
  );
}
