import { sendJson } from "./wsClient";

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
      event: "CHECK_USER",
      data: {
      user: username
      }
    }
  });
}
