import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Link, Route, Routes } from "react-router-dom";
import { getSocket } from "./services/wsClient";

import Signup from "./pages/Signup";
import ChatApp from "./pages/ChatApp";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);

  // Mở kết nối WebSocket khi App khởi động
  useEffect(() => {
    getSocket();
  }, []);

  return (
    <>
      {/* Navigation nhỏ để chuyển trang */}
      <nav className="d-flex gap-3">
        <Link to="/" className="nav-link">
          Home
        </Link>{" "}
        |{" "}
        <Link to="/signup" className="nav-link">
          Signup
        </Link>{" "}
        |{" "}
        <Link to="/login" className="nav-link">
          Login
        </Link>{" "}
        |{" "}
        <Link to="/chat" className="nav-link">
          ChatApp
        </Link>{" "}
        | {/* ⬅️ Link mới */}
      </nav>

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <h1 className="fw-bold text-primary">
                Welcome to Watch Chat App
              </h1>
            </>
          }
        />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* ChatApp (Trang Chat) */}
        <Route path="/chat" element={<ChatApp />} />
      </Routes>
    </>
  );
}

export default App;
