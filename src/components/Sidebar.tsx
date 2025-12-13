import "../css/Sidebar.css";
import { Search } from "lucide-react";
import type { Conversation } from "../types/Conversation";
import { useState } from "react";

type Props = {
  conversations: Conversation[];
  selected: Conversation | null;
  setSelected: (c: Conversation) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  getAvatarGradient: (hsl: string) => string;
  onCreateRoom: (name: string) => void;
};

const Sidebar = ({
  conversations,
  selected,
  setSelected,
  sidebarOpen,
  setSidebarOpen,
  getAvatarGradient,
  onCreateRoom,
}: Props) => {
  const [roomName, setRoomName] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const create = () => {
        if (!roomName.trim()) return;
        onCreateRoom(roomName.trim()); // gọi API
        setRoomName("");
        setShowCreate(false);
    };
  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h1>Watch Chat</h1>
      </div>

        <div className="search-container">
            <Search size={18} className="search-icon"/>
            <input className="search-input" placeholder="Tên người dùng..."/>
            <button className="add-room-btn" onClick={() => setShowCreate(!showCreate)}> + </button>
        </div>

        {/* UI tạo phòng */}
        {showCreate && (
            <div className="create-room-popup" >
                <input placeholder="Tên phòng..." value={roomName} onChange={(e) => setRoomName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && create()}/>
                <button onClick={create}>Tạo</button>
            </div>
        )}

      <div className="conversation-list">
        {conversations.map((c) => (
          <div
            key={c.name}
            className={`conversation-item ${
              selected?.name === c.name ? "active" : ""
            }`}
            onClick={() => {
              setSelected(c);
              setSidebarOpen(false);
            }}
          >
            <div className="avatar-wrapper">
              <div
                className="avatar"
                style={{ backgroundImage: getAvatarGradient(c.color) }}
              >
                {c.type === 1 ? (
                  <i className="fa-solid fa-users"></i>
                ) : (
                  c.name[0].toUpperCase()
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
  );
};

export default Sidebar;
