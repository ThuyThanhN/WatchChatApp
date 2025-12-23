import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getSocket, subscribeMessage } from "../services/wsClient";
import { UserApi} from "../services/chatApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getSocket();

    // Xử lý Login và Re_Login
    const unsubscribe = subscribeMessage((res) => {
      console.log("Server trả lời:", res);

      if (res?.event !== "RE_LOGIN" && res?.event !== "LOGIN") return;

      // Thành công
      if (res?.status === "success") {
        alert("Đăng nhập thành công!");

        const code = res?.data?.["RE_LOGIN_CODE"];
        if (code) {
          localStorage.setItem("relogin_code", code);
        }
        localStorage.setItem("username", username);

        unsubscribe();
        navigate("/chat");
      } else {
        alert("Đăng nhập thất bại: " + res.mes);
        unsubscribe();
      }
    });
    // Đăng nhập
    UserApi.login(username, password);
  };

  return (
      <div className="wc-app">
        <div className="wc-gradient-bg"></div>
        <div className="wc-auth-wrapper">
          <section className="wc-auth-card">
            <h2 className="wc-auth-title">Đăng nhập</h2>
            <p className="wc-auth-desc">Đăng nhập để tiếp tục chat</p>

            <form className="wc-form" onSubmit={handleLogin}>
              <div className="wc-form-group">
                <label htmlFor="username">Tên đăng nhập</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
              </div>

              <div className="wc-form-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
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
