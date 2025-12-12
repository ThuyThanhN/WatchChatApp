// Tạo phòng
import {sendJson} from "./wsClient.ts";

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