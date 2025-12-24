import { sendJson } from "./wsClient";
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

// (tuỳ bạn dùng) gọi tay RE_LOGIN khi cần
export function reLogin(username: string, code: string) {
    sendJson({
        action: "onchat",
        data: {
            event: "RE_LOGIN",
            data: { user: username, code },
        },
    });
}
//logout
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
