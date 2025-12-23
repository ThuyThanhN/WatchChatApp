import "../css/Signup.css";
import {Link} from "react-router-dom";
import {useState} from "react";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nhapSignup = (e) => {
        e.preventDefault();  // Quan trọng: Ngăn reload

        const ws = new WebSocket("wss://chat.longapp.site/chat/chat");
        // Nhận phản hồi
        ws.onmessage = (event) => {
            console.log("Server trả lời:", event.data);

            const res = JSON.parse(event.data);

            if (res.status === "success") {
                alert("Đăng ký thành công!");
            } else {
                alert("Đăng ký thất bại: " + res.mes);
            }
        };

        // Gửi đăng ký
        ws.onopen = () => {
            ws.send(JSON.stringify({
                action: "onchat",
                data: {
                    event: "REGISTER",
                    data: {
                        user: username,   // Tạm dùng cứng
                        pass: password
                    }
                }
            }));

            console.log("Đã gửi đăng ký!");
        };
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
                                <label htmlFor="fullName">Họ và tên</label>
                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Nhập họ tên"
                                />
                            </div>

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

                        <div className="wc-form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" placeholder="you@example.com" />
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
