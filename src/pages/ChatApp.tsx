import { useEffect, useState, useRef } from "react";
import { getSocket, subscribeMessage } from "../services/wsClient";
import { sendChatToPeople, getUserList } from "../services/chatApi";
import {
  createRoom,
  sendChatToRoom,
  joinRoom,
  getRoomChatMes,
} from "../services/roomApi";
import { checkUser } from "../services/userApi";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import type { Message } from "../types/Message";
import type { Conversation } from "../types/Conversation";

const CURRENT_USER = localStorage.getItem("username") || "";

const ChatApp = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userStatus, setUserStatus] = useState<boolean | null>(null);

  const selectedRef = useRef<Conversation | null>(null);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

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
    if (!selected) return;

    // Online/offline cho chat cá nhân
    if (selected.type === 0) {
      checkUser(selected.name);
    } else {
      setUserStatus(null); // room thì không có status
    }
  }, [selected]);

  useEffect(() => {
    getSocket();

    // Lấy danh sách người dùng
    getUserList();

    subscribeMessage((msg) => {
      console.log("WS message:", msg);

      // RE_LOGIN
      if (msg?.event === "RE_LOGIN") {
        if (msg?.status === "success") {
          console.log("RE_LOGIN thành công");

          // ReLogin thành công, load lại dsach
          getUserList();
          return;
        }

        console.log("RE_LOGIN thất bại:", msg?.mes);
        localStorage.removeItem("relogin_code");
        localStorage.removeItem("username");
        window.location.href = "/login";
        return;
      }
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
        if (!selectedRef.current && users.length > 0) {
          setSelected(users[0]);
        }
      }

      // CREATE_ROOM
      if (msg.event === "CREATE_ROOM") {
        if (msg.status === "success") {
          alert("Tạo phòng thành công!");
          getUserList(); // reload danh sách phòng
        } else {
          alert(msg.mes || "Phòng đã tồn tại");
        }
      }

      // JOIN_ROOM thành công
      if (msg.event === "JOIN_ROOM" && msg.status === "success") {
        getUserList();
      }

      // JOIN_ROOM thất bại
      if (msg.event === "JOIN_ROOM" && msg.status === "error") {
        alert(msg.mes);
      }
      // Lịch sủ phòng
      if (msg.event === "GET_ROOM_CHAT_MES") {
        const current = selectedRef.current;
        if (!current) return;
        if (msg.data?.name !== current.name) return;

        const history = msg.data.chatData;
        if (!Array.isArray(history)) return;

        const mapped: Message[] = history.map((m: any, index: number) => {
          return {
            id: `${index}`,
            sender: m.name === CURRENT_USER ? "user" : "other",
            name: m.name,
            content: m.mes,
            timestamp: m.createAt,
          };
        });
        mapped.sort((a: any, b: any) => b.id - a.id);

        mapped.forEach((m: any) => delete m.id);
        setMessages(mapped);
      }

      /* Tin nhan realtime */
      if (msg.event === "SEND_CHAT") {
        const current = selectedRef.current;
        if (!current) return;
        if (msg.data.to !== current.name) return;

        const time = Number(msg.data.time);

        setMessages((prev) => [
          ...prev,
          {
            id: `${time}-${Math.random()}`,
            sender: msg.data.from === CURRENT_USER ? "user" : "other",
            name: msg.data.from,
            content: msg.data.mes,
            timestamp: msg.createAt,
          },
        ]);
      }

      if (msg.event === "CHECK_USER") {
        const isOnline = msg.data.status;
        setUserStatus(isOnline);
      }
    });
  }, []);
  //load lịch sử khi chọn phòng
  useEffect(() => {
    if (!selected) return;

    setMessages([]); // clear UI cũ

    if (selected.type === 1) {
      // CHỈ LOAD KHI LÀ PHÒNG
      getRoomChatMes(selected.name, 1);
    }
  }, [selected]);

  // Tạo phòng
  const handleCreateRoom = (name: string) => {
    createRoom(name);
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
        userStatus={userStatus}
      />
    </div>
  );
};

export default ChatApp;
