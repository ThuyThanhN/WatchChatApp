import "../css/SocketLoading.css";

const SocketLoading = () => {
    return (
        <div className="socket-loading-backdrop">
            <div className="socket-loading-box">
                <div className="spinner"></div>
                <p>Đang xử lý...</p>
            </div>
        </div>
    );
};

export default SocketLoading;
