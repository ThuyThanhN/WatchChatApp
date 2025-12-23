import { useEffect, useState } from "react";
import {  Route, Routes, Navigate } from "react-router-dom";
import { getSocket, subscribeSocketLoading } from "./services/wsClient";
import SocketLoading from "./components/SocketLoading";

import Signup from "./pages/Signup";
import ChatApp from "./pages/ChatApp";
import Login from "./pages/Login";

function App() {
  const [loading, setLoading] = useState(false);

  // Mở socket ngay khi app load
  useEffect(() => {
    subscribeSocketLoading(setLoading);
    getSocket();
  }, []);

  return (
      <div>
        {loading && <SocketLoading />}
        <Routes>
          // Trang login
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Signup */}
          <Route path="/signup" element={<Signup />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Chat */}
          <Route path="/chat" element={<ChatApp />} />
        </Routes>
      </div>
  );
}

export default App;
