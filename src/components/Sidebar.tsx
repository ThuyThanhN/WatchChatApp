import "../css/Sidebar.css";
import { Search } from "lucide-react";
import type { Conversation } from "../types/Conversation";
import { useState } from "react";
import createRoomLogo from "../assets/group.png";
import joinRoomLogo from "../assets/chat.png";

type Props = {
  conversations: Conversation[];
  selected: Conversation | null;
  setSelected: (c: Conversation) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  getAvatarGradient: (hsl: string) => string;
  onCreateRoom: (name: string) => void;
  onJoinRoom: (name: string) => void;
  onSearchUser: (username: string) => void; // API CHECK_USER_EXIST
  onStartChat: (username: string) => void; // tạo chat FE
};

const Sidebar = ({
  conversations,
  selected,
  setSelected,
  sidebarOpen,
  setSidebarOpen,
  getAvatarGradient,
  onCreateRoom,
  onJoinRoom,
  onSearchUser,
}: Props) => {
  const [roomName, setRoomName] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [searchText, setSearchText] = useState("");

  const create = () => {
    if (!roomName.trim()) return;
    onCreateRoom(roomName.trim()); // gọi API
    setRoomName("");
    setShowCreate(false);
  };

  const join = () => {
    if (!roomName.trim()) return;
    onJoinRoom(roomName.trim());
    setRoomName("");
    setShowJoin(false);
  };
  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div>
          <h1>Watch Chat App</h1>
        </div>
        <div>
          <img
            title="Tạo phòng mới"
            src={createRoomLogo}
            alt="Create Room"
            onClick={() => setShowCreate(!showCreate)}
          />
          <img
            title="Tham gia phòng"
            src={joinRoomLogo}
            className="Logo Join Room"
            alt="Join Room"
            onClick={() => setShowJoin(true)}
          />
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input
          className="search-input"
          placeholder="Tìm kiếm người dùng..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchText.trim()) {
              onSearchUser(searchText.trim());
            }
          }}
        />
      </div>

      {/* UI tạo phòng */}
      {showCreate && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4">
                {/* Header */}
                <div className="modal-header border-0">
                  <div>
                    <h5 className="modal-title fw-bold">Tạo phòng mới</h5>
                    <small className="text-muted">
                      Nhập tên phòng mới bạn muốn tạo
                    </small>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreate(false)}
                  />
                </div>

                {/* Body */}
                <div className="modal-body pt-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên phòng..."
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && create()}
                    autoFocus
                  />
                </div>

                {/* Footer */}
                <div className="modal-footer border-0">
                  <button
                    className="btn btn-danger px-4"
                    onClick={() => setShowCreate(false)}
                  >
                    Hủy
                  </button>
                  <button
                    className="btn btn-create-room px-4"
                    onClick={create}
                    disabled={!roomName.trim()}
                  >
                    Tạo phòng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* UI tham gia phòng */}
      {showJoin && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4">
                {/* Header */}
                <div className="modal-header border-0">
                  <div>
                    <h5 className="modal-title fw-bold">Tham gia phòng</h5>
                    <small className="text-muted">
                      Nhập tên phòng bạn muốn tham gia
                    </small>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowJoin(false)}
                  />
                </div>

                {/* Body */}
                <div className="modal-body pt-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên phòng..."
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && join()}
                    autoFocus
                  />
                </div>

                {/* Footer */}
                <div className="modal-footer border-0">
                  <button
                    className="btn btn-danger px-4"
                    onClick={() => setShowJoin(false)}
                  >
                    Hủy
                  </button>
                  <button
                    className="btn btn-join-room px-4"
                    onClick={join}
                    disabled={!roomName.trim()}
                  >
                    Tham gia
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
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
