import { useEffect, useState } from "react";
import { getSocket, subscribeMessage } from "../services/wsClient";
import { sendChatToPeople, getUserList } from "../services/chatApi";
import { createRoom, sendChatToRoom, joinRoom } from "../services/roomApi";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import type { Message } from "../types/Message";
import type { Conversation } from "../types/Conversation";

const ChatApp = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Tạo màu từ tên người dùng
  const colorFromName = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 55%)`;
  };

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

    if (selected.type === 1) {
      // Gửi tin nhắn phòng
      sendChatToRoom(selected.name, inputText);
    } else {
      // Gửi tin nhắn cá nhân
      sendChatToPeople(selected.name, inputText);
    }

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

  useEffect(() => {
    getSocket();

    // Lấy danh sách người dùng
    getUserList();

    subscribeMessage((msg) => {
      console.log("WS message:", msg);

      // GET_USER_LIST
      if (msg.event === "GET_USER_LIST") {
        const users = msg.data.map((u: any) => ({
          name: u.name,
          type: u.type,
          color: colorFromName(u.name),
        }));

        setConversations(users);

        setSelected((prev) => {
          // nếu chọn hội thoại nào đó thì giữ nguyên lựa chọn
          if (prev) {
            const existed = users.find((u: any) => u.name === prev.name);
            if (existed) return existed;
          }

          // nếu chưa có chọn hội thoại nào thì chọn room/user đầu tiên
          return users.length > 0 ? users[0] : null;
        });
      }

      // JOIN_ROOM thành công
      if (msg.event === "JOIN_ROOM" && msg.status === "success") {
        getUserList();
      }

      // JOIN_ROOM thất bại
      if (msg.event === "JOIN_ROOM" && msg.status === "error") {
        alert(msg.mes);
      }
    });
  }, []);

  // Tạo phòng
  const handleCreateRoom = (name: string) => {
    createRoom(name);

    const newRoom = {
      name,
      type: 1,
      color: "#6ca0dc",
    };

    setConversations((prev) => [...prev, newRoom]);

    // chọn phòng vừa tạo
    setSelected(newRoom);

    console.log("Đã gửi yêu cầu tạo phòng:", name);
  };

  const handleJoinRoom = (name: string) => {
    joinRoom(name);

    console.log("Đã gửi yêu cầu tham gia phòng:", name);
  };

  return (
    <div className="chat-container">
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        selected={selected}
        setSelected={setSelected}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        getAvatarGradient={getAvatarGradient}
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
      />

      {/* Khu vực chat */}
      <ChatArea
        selected={selected}
        messages={messages}
        inputText={inputText}
        setInputText={setInputText}
        handleSend={handleSend}
        handleKeyDown={handleKeyDown}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        getAvatarGradient={getAvatarGradient}
      />
    </div>
  );
};

export default ChatApp;
