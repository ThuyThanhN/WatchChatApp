import { useEffect, useState } from "react";
import { Search, Paperclip, ImageIcon, Send, Menu } from "lucide-react";
import { getSocket, subscribeMessage } from "../services/wsClient";
import { sendChatToPeople, getUserList } from "../services/chatApi";
import "../css/ChatApp.css";

type Message = {
  id: string;
  sender: "user" | "other";
  content: string;
  timestamp: string;
  name?: string;
};

type Conversation = {
  name: string;
  type: number;
  color: string;
};

export default function ChatApp() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Tạo màu từ tên người dùng
  function colorFromName(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;

    const saturation = 70;
    const lightness = 55;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  const getAvatarGradient = (hsl: string) =>
    `linear-gradient(135deg, ${hsl}, ${hsl.replace("55%", "80%")})`;

  // Xử lý nhấn Enter để gửi tin nhắn
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

   // Hàm xử lý gửi tin nhắn
  const handleSend = () => {
    if (!inputText.trim() || !selected) return;

    sendChatToPeople(selected.name, inputText);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "user",
        content: inputText,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setInputText("");
  };

  // Đăng nhập để test send_chat
  useEffect(() => {
    const socket = getSocket();

    socket.onopen = () => {
      console.log("WebSocket connected");

      socket.send(
        JSON.stringify({
          action: "onchat",
          data: {
            event: "LOGIN",
            data: {
              user: "long",
              pass: "12345",
            },
          },
        })
      );

      getUserList();
    };

    subscribeMessage((msg: any) => {
      console.log("WS message:", msg);

      const event = msg.event;
      const data = msg.data;

      // Lấy danh sách người dùng chat
      if (event === "GET_USER_LIST") {
        const users = (data || []).map((u: any) => ({
          name: u.name,
          type: u.type,
          color: colorFromName(u.name),
        }));

        setConversations(users);

        if (!selected && users.length > 0) {
          setSelected(users[0]);
        }
      }
    });
  }, []);

  return (
    <div className="chat-container">
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Cột danh sách người dùng chat */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h1>Watch Chat</h1>
        </div>

        {/* Ô tìm kiếm  */}
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Tên người dùng hoặc phòng"
            className="search-input"
          />
        </div>

        <div className="conversation-list">
          {conversations.map((c) => (
            <div
              key={c.name}
              onClick={() => {
                setSelected(c);
                setMessages([]);
                setSidebarOpen(false);
              }}
              className={`conversation-item ${
                selected?.name === c.name ? "active" : ""
              }`}
            >
              <div className="avatar-wrapper">
                <div
                  className="avatar"
                  style={{ backgroundImage: getAvatarGradient(c.color) }}
                >
                  {c.type === 1 ? (
                    <i className="fa-solid fa-users"></i>
                  ) : (
                    c.name.charAt(0).toUpperCase()
                  )}
                </div>
              </div>

              <div className="conversation-content">
                <span className="conversation-name">{c.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cột khung chat */}
      <div className="main-content">
        {selected && (
          <header className="chat-header">
            <div className="header-left">
              <button
                className="menu-button"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={20} />
              </button>

              <div className="header-user">
                <div
                  className="avatar-small"
                  style={{ backgroundImage: getAvatarGradient(selected.color) }}
                >
                  {selected.type === 1 ? (
                    <i className="fa-solid fa-users"></i>
                  ) : (
                    selected.name.charAt(0).toUpperCase()
                  )}
                </div>
              </div>

              <div className="header-info">
                <h2>{selected.name}</h2>
              </div>
            </div>
          </header>
        )}

        <div className="messages-area">
          {messages.map((m) => (
            <div key={m.id} className={`message-row ${m.sender}`}>
              <div className="message-content">
                {m.sender === "other" && (
                  <p className="sender-name">{m.name}</p>
                )}

                <div className={`message-bubble ${m.sender}`}>
                  <p>{m.content}</p>
                  <span className="message-time">{m.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="input-area">
          <button className="attachment-btn">
            <Paperclip size={20} />
          </button>

          <button className="attachment-btn">
            <ImageIcon size={20} />
          </button>

          {/* Ô nhập tin nhắn */}
          <textarea
            placeholder="Nhập tin nhắn..."
            className="message-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Nút gửi */}
          <button className="send-button" onClick={handleSend}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}


