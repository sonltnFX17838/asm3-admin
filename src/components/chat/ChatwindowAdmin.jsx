import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { SendIcon, UserIcon } from "../../assets/icon";

const host = import.meta.env.VITE_REACT_API_URL;
// eslint-disable-next-line react/prop-types
const ChatwindowAdmin = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const socketRef = useRef();
  const messagesEnd = useRef();

  useEffect(() => {
    socketRef.current = io.connect(host);
    socketRef.current.emit("getStart", roomId);
    socketRef.current.on(`chat${roomId}`, (dataGot) => {
      setChatHistory(dataGot);
      scrollToBottom();
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);
  const scrollableDivRefChat = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    if (scrollableDivRefChat.current) {
      scrollableDivRefChat.current.scrollTop =
        scrollableDivRefChat.current.scrollHeight;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setChatHistory([...chatHistory, message]);
    if (message !== null) {
      const msg = {
        content: message,
        role: "Counselors",
      };
      socketRef.current.emit("messSend", roomId, msg);
      setMessage("");
    }
  };
  return (
    <div
      className=" w-3/4  border  flex flex-col"
      style={{ height: "calc(100vh - 140px)" }}
    >
      <div
        style={{ height: "calc(100vh - 202px)", overflowY: "auto" }}
        ref={scrollableDivRefChat}
      >
        <div className="flex flex-col justify-end flex-auto p-4">
          {chatHistory.map((message, index) => (
            <div
              className="flex items-center gap-2 w-full"
              key={index}
              style={{
                justifyContent: message.role === "Counselors" ? "flex-end" : "",
              }}
            >
              {message.role === "Client" && <UserIcon />}
              <p className="my-auto">{message.content}</p>
            </div>
          ))}
          <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
        </div>
      </div>
      <form className="border py-2 flex" onSubmit={handleSubmit}>
        <input
          placeholder="input "
          className="border-none p-2 flex-auto focus:outline-none"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <div className=" bg-sky-200 rounded-full mr-2 hover:bg-sky-400">
          <button
            className="flex-none mx-4 w-10 h-10 text-center "
            type="submit"
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatwindowAdmin;
