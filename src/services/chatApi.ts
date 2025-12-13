import { sendJson } from "./wsClient";

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

// Lấy danh sách người dùng chat
export function getUserList() {
  sendJson({
    action: "onchat",
    data: {
      event: "GET_USER_LIST",
    },
  });
}

// Gửi tin nhắn đến 1 người (type = "people")
export function sendChatToPeople(to: string, mes: string) {
  sendJson({
    action: "onchat",
    data: {
      event: "SEND_CHAT",
      data: {
        type: "people",
        to,
        mes,
      },
    },
  });
}


