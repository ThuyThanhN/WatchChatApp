import { sendJson } from "./wsClient";

// Đăng ký
export function register(username: string, password: string) {
    sendJson({
        action: "onchat",
        data: {
            event: "REGISTER",
            data: {
                user: username,
                pass: password,
            },
        },
    });
}

// Đăng nhập
export function login(username: string, password: string) {
    sendJson({
        action: "onchat",
        data: {
            event: "LOGIN",
            data: {
                user: username,
                pass: password,
            },
        },
    });
}

// RE_LOGIN khi mất kết nối
export function reLogin(username: string, code: string) {
    sendJson({
        action: "onchat",
        data: {
            event: "RE_LOGIN",
            data: { user: username, code },
        },
    });
}
// Đăng xuất
export function logout() {
    sendJson({
        action: "onchat",
        data: {
            event: "LOGOUT"
        }
    });
}

// Kiểm tra trạng thái của người dùng
export function checkUser(username: string) {
    sendJson({
        action: "onchat",
        data: {
            event: "CHECK_USER_ONLINE",
            data: {
                user: username
            }
        }
    });
}

// Kiểm tra user có tồn tại không?
export function checkUserExist(username: string) {
    sendJson({
        action: "onchat",
        data: {
            event: "CHECK_USER_EXIST",
            data: {
                user: username
            }
        }
    });
}
