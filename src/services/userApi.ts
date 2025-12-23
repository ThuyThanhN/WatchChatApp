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
