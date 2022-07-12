import { useState } from "react";
import io from "socket.io-client";
import { Chats } from "./components/Chats";

function App() {
  const socket = io("https://sockets-server-ke.herokuapp.com/", {
    transports: ["websocket"],
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });

  const [input, setInput] = useState({ username: "", room: "" });

  return (
    <div
      className="scrollbar-thin scrollbar-thumb-purple-700
     scrollbar-track-gray-100 flex h-screen
     overflow-x-hidden
     "
    >
      <div className="w-full p-1 m-1">
        <Chats socket={socket} room={input.room} user={input.username} />
      </div>
    </div>
  );
}

export default App;
