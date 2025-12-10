import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Link, Route, Routes } from "react-router-dom";

import Signup from "./component/Signup";
import ChatApp from "./component/ChatApp";
import Login from "./component/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Navigation nhỏ để chuyển trang */}
      <nav>
        <Link to="/" className="nav-link">Home</Link> |{" "}
        <Link to="/signup" className="nav-link">Signup</Link> |{" "}
        <Link to="/login" className="nav-link">Login</Link> |{" "}
        <Link to="/chat" className="nav-link">ChatApp</Link> | {/* ⬅️ Link mới */}
      </nav>

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <div>
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
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
