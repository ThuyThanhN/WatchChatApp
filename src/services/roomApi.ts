import { sendJson } from "./wsClient.ts";

// Tạo phòng
export function createRoom(name: string) {
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
// Lấy lịch sử tin nhắn phòng
export function getRoomChatMes(name: string, page: number = 1) {
    sendJson({
        action: "onchat",
        data: {
            event: "GET_ROOM_CHAT_MES",
            data: {
                name,
                page,
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
