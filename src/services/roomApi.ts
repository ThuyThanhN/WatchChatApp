import {sendJson} from "./wsClient.ts";

//Tạo phòng
export function createRoom(name: string){
    sendJson({
        "action": "onchat",
        "data": {
            "event": "CREATE_ROOM",
            "data": {
                name
            }
        }
    })
}
// Gửi tin nhắn vào phòng
export function sendChatToRoom(to: string, mes: string) {
    sendJson({
        action: "onchat",
        data: {
            event: "SEND_CHAT",
            data: {
                type: "room",
                to,
                mes,
            },
        },
    });
}

// Tham gia phòng chat (type = "room")
export function joinRoom(name: string) {
  sendJson({
    action: "onchat",
    data: {
      event: "JOIN_ROOM",
      data: {
        name
      }
    }
  });
}
