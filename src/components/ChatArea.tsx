import "../css/ChatArea.css";
import { Paperclip, ImageIcon, Send, Menu, MoreVertical, LogOut } from "lucide-react";
import type { Message } from "../types/Message";
import type { Conversation } from "../types/Conversation";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/userApi";
import { closeSocket } from "../services/wsClient";
import { useState } from "react";

type Props = {
  selected: Conversation | null;
  messages: Message[];
  inputText: string;
  setInputText: (v: string) => void;
  handleSend: () => void;
  handleKeyDown: (e: any) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  getAvatarGradient: (color: string) => string;
};

const ChatArea = ({
  selected,
  messages,
  inputText,
  setInputText,
  handleSend,
  handleKeyDown,
  setSidebarOpen,
  getAvatarGradient,
}: Props) => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);

    const handleLogout = () => {
        // 1. Gửi logout lên server
        logout();

        // 2. Clear localStorage
        localStorage.removeItem("username");
        localStorage.removeItem("relogin_code");

        // 3. Đóng socket
        closeSocket();

        // 4. Quay về trang login
        navigate("/login");
    };
  return (
    <div className="main-content">

      {/* Header */}
      {selected && (
          <header className="chat-header">
              <div className="header-left">
                  <button className="menu-button" onClick={() => setSidebarOpen(true)}>
                      <Menu size={20}/>
                  </button>

                  <div className="header-user">
                      <div
                          className="avatar-small"
                          style={{backgroundImage: getAvatarGradient(selected.color)}}
                      >
                          {selected.type === 1 ? (
                              <i className="fa-solid fa-users"></i>
                          ) : (
                              selected.name[0].toUpperCase()
                          )}
                      </div>
                  </div>

                  <div className="header-info">
                      <h2>{selected.name}</h2>
                  </div>
              </div>
              <div className="header-right">
                  <button
                      className="menu-button"
                      onClick={() => setOpenMenu(!openMenu)}
                  >
                      <MoreVertical size={20}/>
                  </button>

                  {openMenu && (
                      <div className="header-dropdown">
                          <button onClick={handleLogout}>
                              <LogOut size={16}/>
                              <span>Đăng xuất</span>
                          </button>
                      </div>
                  )}
              </div>
          </header>
      )}

        {/* Messages */}
        <div className="messages-area">
            {messages.map((m) => (
                <div key={m.id} className={`message-row ${m.sender}`}>

                    <div className="message-content">
                        <p className="sender-name">
                            {m.sender === "user" ? "Bạn" : m.name}
                        </p>

                        <div className={`message-bubble ${m.sender}`}>
                  <p>{m.content}</p>
                  <span className="message-time">{m.timestamp}</span>
                </div>
              </div>
            </div>
        ))}
      </div>

        {/* Input */}
          <div className="input-area">
          <button className="attachment-btn">
          <Paperclip size={20} />
    </button>

  <button className="attachment-btn">
          <ImageIcon size={20} />
        </button>

        <textarea
          placeholder="Nhập tin nhắn..."
          className="message-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button className="send-button" onClick={handleSend}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
