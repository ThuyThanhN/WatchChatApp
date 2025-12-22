import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getSocket, subscribeMessage } from "../services/wsClient";
import { login } from "../services/chatApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getSocket();

    // Đăng nhập
    login(username, password);

    subscribeMessage((res) => {
      console.log("Server trả lời:", res);

      if (res.status === "success") {
        alert("Đăng nhập thành công!");

        // Lưu RE_LOGIN_CODE vào localStorage để dùng sau
        if (res.data?.RE_LOGIN_CODE) {
          localStorage.setItem("relogin_code", res.data.RE_LOGIN_CODE);
          localStorage.setItem("username", username);
        }

        // Qua chat
        navigate("/chat");
      } else {
        alert("Đăng nhập thất bại: " + res.mes);
      }
    });
  };

  return (
    <div className="wc-app">
      <div className="wc-gradient-bg"></div>

      <div className="wc-auth-wrapper">

        {/* Cột form đăng nhập */}
        <section className="wc-auth-card">
          <h2 className="wc-auth-title">Đăng nhập</h2>
          <p className="wc-auth-desc">Đăng nhập để tiếp tục chat.</p>

          <form className="wc-form" onSubmit={handleLogin}>
            <div className="wc-form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                id="username"
                type="text"
                placeholder="Tên đăng nhập"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="wc-form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="wc-form-extra">
              <label className="wc-checkbox">
                <input type="checkbox" />
                <span>Nhớ mật khẩu</span>
              </label>
            </div>

            <button type="submit" className="wc-btn-primary">
              Đăng nhập
            </button>

            <p className="wc-auth-footer">
              Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
