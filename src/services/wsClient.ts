// Biến socket có thể là WebSocket hoặc có thể là null
let socket: WebSocket | null = null;

type message = (data: any) => void;
let subscriber: message | null = null;

function onOpen() {
  console.log("WebSocket opened");
}

function onClose() {
  console.log("WebSocket closed");
}

function onError(event: Event) {
  console.error("WebSocket error:", event);
}

function onMessage(event: MessageEvent) {
  try {
    const data = JSON.parse(event.data);
    if (subscriber) subscriber(data);
  } catch (e) {
    console.error("Lỗi:", e);
  }
}

// Hàm tạo socket duy nhất
export function getSocket() {
  if (socket) return socket;

  socket = new WebSocket("wss://chat.longapp.site/chat/chat");

  socket.onopen = onOpen;
  socket.onclose = onClose;
  socket.onerror = onError;
  socket.onmessage = onMessage;

  return socket;
}

// Hàm theo dõi tin nhắn từ server
export function subscribeMessage(handler: message) {
  subscriber = handler;
}

// Nếu WebSocket đang mở, gửi dữ liệu dạng JSON
// ngược lại thì in cảnh báo
export function sendJson(obj: any) {
  const ws = getSocket();
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(obj));
  } else {
    console.warn("Socket chưa OPEN, trạng thái:", ws.readyState);
  }
}

