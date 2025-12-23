import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getSocket, subscribeMessage } from "../services/wsClient";
import { register } from "../services/userApi";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const nhapSignup = (e: any) => {
        e.preventDefault();
        getSocket();

        // Xử lý đăng ký
        const unsubscribe = subscribeMessage((res) => {
            console.log("Server trả lời:", res);

            if (res?.event !== "REGISTER") return;

            if (res?.status === "success") {
                alert("Đăng ký thành công!");
                unsubscribe();
                navigate("/login");
            } else {
                alert("Đăng ký thất bại: " + res.mes);
                unsubscribe();
            }
        });

        // Đăng ký
        register(username, password);
    };

    return (
        <div className="wc-app">
            <div className="wc-gradient-bg"></div>

            <div className="wc-auth-wrapper">
                {/* Cột form đăng ký */}
                <section className="wc-auth-card">
                    <h2 className="wc-auth-title">Đăng ký tài khoản</h2>
                    <p className="wc-auth-desc">
                        Tạo tài khoản để bắt đầu chat.
                    </p>

                    <form className="wc-form" onSubmit={nhapSignup}>
                        <div className="wc-form-row">

                            <div className="wc-form-group">
                                <label htmlFor="username">Tên hiển thị</label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Nhập username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="wc-form-row">
                            <div className="wc-form-group">
                                <label htmlFor="password">Mật khẩu</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="wc-form-group">
                                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                />
                            </div>
                        </div>

                        <div className="wc-form-extra">
                            <label className="wc-checkbox">
                                <input type="checkbox" />
                                <span>
                  Tôi đồng ý với điều khoản sử dụng &amp; chính sách bảo mật
                </span>
                            </label>
                        </div>

                        <button type="submit" className="wc-btn-primary">
                            Đăng ký ngay
                        </button>


                        <div className="wc-divider">
                            <span>hoặc</span>
                        </div>

                        <p className="wc-auth-footer">
                            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                        </p>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Signup;
