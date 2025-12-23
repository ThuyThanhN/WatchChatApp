import { sendJson } from "./wsClient";

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

// gửi ảnh
export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", "upload_image");
  form.append("cloud_name", "dhfjendel");

  const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhfjendel/image/upload",
      {
        method: "POST",
        body: form,
      }
  );

  const data = await res.json();

  return data.secure_url;
}



