import { UserIcon } from "../../assets/icon";
import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import ChatwindowAdmin from "./ChatwindowAdmin";

const host = import.meta.env.VITE_REACT_API_URL;

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [roomId, setRoomId] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(host);

    socketRef.current.emit("clientOnl");

    socketRef.current.on("clientOnl", (data) => {
      setUsers(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div
      className="p-3 w-full h-screen bg-gray-100"
      style={{ height: "calc(100vh - 64px" }}
    >
      <h1 className="font-bold text-2xl">Chat</h1>
      <p className="text-gray-500 font-semibold mb-2"> Apps / Chat</p>
      <div
        className="flex h-full  bg-white"
        style={{ height: "calc(100vh - 140px" }}
      >
        <div className="h-5/6 w-1/4 border  ">
          <div className="w-full border p-4">
            <div className="border">
              <input
                placeholder="Search Contact"
                className="border-none p-2 flex-auto font-semibold focus:outline-none"
              />
            </div>
          </div>
          <div className="">
            {users &&
              users.map((user, index) => (
                <button
                  className="flex items-center gap-2 border p-3 w-44"
                  onClick={() => setRoomId(user)}
                  key={index}
                >
                  <UserIcon />
                  <p className="overflow-hidden">{user}</p>
                </button>
              ))}
          </div>
        </div>
        {roomId && <ChatwindowAdmin roomId={roomId} />}
      </div>
    </div>
  );
};

export default ChatPage;
