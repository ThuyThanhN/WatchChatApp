import "../css/Signup.css";

const Signup = () => {
    return (
        <div className="wc-app">
            <div className="wc-gradient-bg"></div>

            <div className="wc-auth-wrapper">
                {/* Cột giới thiệu */}
                <section className="wc-hero">
                    <div className="wc-brand">
                        <div className="wc-logo">W</div>
                        <div>
                            <h1 className="wc-title">WatchChatApp</h1>
                            <p className="wc-subtitle">Chat &amp; Chill with your watches</p>
                        </div>
                    </div>

                    <p className="wc-hero-text">
                        Kết nối nhanh với người bán, hỏi đáp về đồng hồ, chốt đơn ngay trong
                        khung chat. Tất cả hội thoại cho từng chiếc đồng hồ đều được lưu lại
                        gọn gàng.
                    </p>

                    <div className="wc-hero-tags">
                        <span>#LuxuryWatch</span>
                        <span>#ChatToBuy</span>
                        <span>#RealTimeSupport</span>
                    </div>

                    {/* Mô phỏng khung chat mini */}
                    <div className="wc-chat-preview">
                        <div className="wc-chat-header">
                            <div className="wc-chat-avatar">S</div>
                            <div>
                                <p className="wc-chat-name">Shop Premium Watch</p>
                                <p className="wc-chat-status">Đang hoạt động</p>
                            </div>
                        </div>

                        <div className="wc-chat-bubbles">
                            <div className="wc-bubble wc-bubble-left">
                                Chiếc Omega Seamaster này còn bản mặt xanh không ạ?
                            </div>
                            <div className="wc-bubble wc-bubble-right">
                                Dạ còn 2 chiếc, tặng kèm dây da. Bạn đăng ký tài khoản để mình
                                gửi giá ưu đãi nhé!
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cột form đăng ký */}
                <section className="wc-auth-card">
                    <h2 className="wc-auth-title">Đăng ký tài khoản</h2>
                    <p className="wc-auth-desc">
                        Tạo tài khoản để bắt đầu chat, theo dõi đơn và săn deal đồng hồ xịn mịn.
                    </p>

                    <form className="wc-form">
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
                                    placeholder="Tối thiểu 8 ký tự"
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

                        <div className="wc-form-group">
                            <label htmlFor="role">Bạn là</label>
                            <select id="role" defaultValue="buyer">
                                <option value="buyer">Người mua đồng hồ</option>
                                <option value="seller">Người bán / chủ shop</option>
                            </select>
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

                        <button type="button" className="wc-btn-ghost">
                            Đăng ký nhanh với Google
                        </button>

                        <p className="wc-auth-footer">
                            Đã có tài khoản? <a href="#">Đăng nhập</a>
                        </p>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Signup;
