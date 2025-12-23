// Biến socket có thể là WebSocket hoặc có thể là null
let socket: WebSocket | null = null;

type message = (data: any) => void;
let subscriber: message | null = null;
// Load khi socket chưa mở
let loadingListener: ((loading: boolean) => void) | null = null;

export function subscribeSocketLoading(cb: (loading: boolean) => void) {
  loadingListener = cb;
}

function setLoading(v: boolean) {
  if (loadingListener) loadingListener(v);
}

function onOpen() {
  console.log("WebSocket opened");
  // Ko load nưa
  setLoading(false);
  tryReLogin();
}

function onClose() {
  console.log("WebSocket closed");

  // const user = localStorage.getItem("username");
  // const code = localStorage.getItem("relogin_code");
  //
  // // Chưa đăng nhập thì không reconnect
  // if (!user || !code) return;

  setTimeout(() => {
    socket = null;
    getSocket();
  }, 300);
}

function onError(event: Event) {
  console.error("WebSocket error:", event);
  setLoading(false);
}

function onMessage(event: MessageEvent) {
  try {
    const data = JSON.parse(event.data);
    if (subscriber) subscriber(data);
  } catch (e) {
    console.error("Lỗi:", e);
  }
}

//try Relogin
function tryReLogin() {
  const path = window.location.pathname;
  if (path === "/login" || path === "/signup") return;

  const user = localStorage.getItem("username");
  const code = localStorage.getItem("relogin_code");
  if (!user || !code) return;

  sendJson({
    action: "onchat",
    data: {
      event: "RE_LOGIN",
      data: { user, code },
    },
  });
}

// Hàm tạo socket duy nhất
export function getSocket() {
  if (socket) return socket;

  setLoading(true);

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

  return () => {
    if (subscriber === handler) subscriber = null;
  };
}

// Gửi dữ liệu JSON qua WebSocket, tự chờ khi socket chưa mở

export function sendJson(obj: any) {
  const ws = getSocket();
  const payload = JSON.stringify(obj);

  console.log("WS send:", obj);

  if (ws.readyState === WebSocket.OPEN) {
    ws.send(payload);
    return;
  }
  if(ws.readyState === WebSocket.CONNECTING) {
    ws.addEventListener(
        "open",
        () => {
          ws.send(payload);
        },
        { once: true }
    );
    return;
  }
    console.warn("Socket chưa OPEN, trạng thái:", ws.readyState);
}
// Đóng socket
export function closeSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
  subscriber = null;
}


