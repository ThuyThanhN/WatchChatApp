import { useState } from "react";
import { Search, Paperclip, ImageIcon, Send, Menu } from "lucide-react";
import "../css/ChatApp.css";

export default function ChatApp() {
  const conversations = [
    {
      id: "1",
      name: "Nguyễn Minh Khang",
      avatar: "MK",
      lastMessage: "Mẫu Rolex đó còn hàng không vậy shop?",
      lastMessageTime: "2 phút",
      unread: 1,
      color: "#3B82F6",
      online: true,
    },
    {
      id: "2",
      name: "Lê Bảo Trân",
      avatar: "BT",
      lastMessage: "Mình cần tư vấn đồng hồ nữ sang trọng...",
      lastMessageTime: "12 phút",
      unread: 0,
      color: "#10B981",
      online: false,
    },
    {
      id: "3",
      name: "Vũ Hoàng Nam",
      avatar: "HN",
      lastMessage: "Có thể gửi mình bảng giá Seiko mới nhất?",
      lastMessageTime: "1 giờ",
      unread: 3,
      color: "#F97316",
      online: true,
    },
  ];

  const initialMessages = [
    {
      id: "1",
      sender: "other",
      content: "Chào bạn! Hôm nay bạn cần tư vấn mẫu đồng hồ nào ạ?",
      timestamp: "10:30",
      name: "Nguyễn Minh Khang",
    },
    {
      id: "2",
      sender: "user",
      content: "Mình đang quan tâm mẫu đồng hồ nam dây kim loại.",
      timestamp: "10:32",
    },
  ];

  const [selected, setSelected] = useState(conversations[0]);
  const [messages] = useState(initialMessages);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Gradient avatar dựa theo màu truyền vào
  const getAvatarGradient = (hex: string) => {
    return `linear-gradient(135deg, ${hex}, ${hex}CC)`;
  };

  return (
    <div className="chat-container">
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Danh sách người nhắn chat */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h1>Watch Chat</h1>
        </div>

        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm hội thoại..."
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button className="filter-btn active">Tất cả</button>
          <button className="filter-btn">Nhóm</button>
        </div>

        <div className="conversation-list">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setSelected(c);
                setSidebarOpen(false);
              }}
              className={`conversation-item ${
                selected.id === c.id ? "active" : ""
              }`}
            >
              <div className="avatar-wrapper">
                <div
                  className="avatar"
                  style={{ backgroundImage: getAvatarGradient(c.color) }}
                >
                  {c.avatar}
                </div>
                {c.online && <div className="online-indicator" />}
              </div>

              <div className="conversation-content">
                <div className="conversation-header">
                  <span className="conversation-name">{c.name}</span>
                  <span className="conversation-time">{c.lastMessageTime}</span>
                </div>
                <p className="conversation-message">{c.lastMessage}</p>
              </div>

              {c.unread > 0 && <div className="unread-badge">{c.unread}</div>}
            </div>
          ))}
        </div>
      </aside>

      {/* Khung chat */}
      <div className="main-content">
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
                {selected.avatar}
              </div>
              {selected.online && <div className="online-indicator-small" />}
            </div>

            <div className="header-info">
              <h2>{selected.name}</h2>
              <p className="status-text">
                {selected.online ? "Đang hoạt động" : "Không hoạt động"}
              </p>
            </div>
          </div>
        </header>

        {/* Khung chat */}
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

        {/* Nút đính kèm và gửi hình ảnh */}
        <div className="input-area">
          <button className="attachment-btn" title="Đính kèm tệp">
            <Paperclip size={20} />
          </button>

          <button className="attachment-btn" title="Gửi hình ảnh">
            <ImageIcon size={20} />
          </button>

          <textarea placeholder="Nhập tin nhắn..." className="message-input" />

          {/* Nút gửi tin nhắn*/}
          <button className="send-button" title="Gửi">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
