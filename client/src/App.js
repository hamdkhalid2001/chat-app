import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./views/SignUp/SignUp";
import ChatPage from "./views/ChatPage/ChatPage";
import Login from "./views/Login/Login";
import { AuthProvider, AuthContext } from "./contexts/AuthProvider";
import React, { useContext, useEffect, useState } from "react";

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route exact path="/sign-up" element={<SignUp />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
