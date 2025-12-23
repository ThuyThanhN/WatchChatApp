import { sendJson } from "./wsClient";

export class UserApi {
  static register(username: string, password: string) {
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

  static login(username: string, password: string) {
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
  static reLogin(username: string, code: string) {
    sendJson({
      action: "onchat",
      data: {
        event: "RE_LOGIN",
        data: { user: username, code },
      },
    });
  }

  static logout() {
    sendJson({
      action: "onchat",
      data: { event: "LOGOUT" },
    });
  }
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
