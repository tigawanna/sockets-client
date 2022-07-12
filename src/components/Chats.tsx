import React, { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

interface ChatsProps {
  socket: Socket;
  user: string;
  room: string;
}
type Chat = { message: string; time: string };

export const Chats: React.FC<ChatsProps> = ({ socket, user, room }) => {
  const tyme =
    new Date(Date.now()).getHours() +
    ":" +
    new Date(Date.now()).getMinutes() +
    ":" +
    new Date(Date.now()).getSeconds();

  const [messages, setMesages] = useState<any>([]);

  const EVENT = "new_message_added";

  useEffect(() => {
    socket.on(EVENT, (msg) => {
      // console.log("msg ==== ",msg)
      setMesages((prev: any) => [...prev, msg]);
    });

    // unbind the event handler when the component gets unmounted
    return () => {
      socket.off(EVENT);
    };
  }, [socket]);

  const [input, setInput] = useState({ message: "hello world", time: "" });

  const handleChange = async (e: any) => {
    const { value } = e.target;
    setInput({
      ...input,
      [e.target.id]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (input.message !== "") {
      const message = { message: input.message, time: tyme };
      // console.log("message ====",message)
      await socket.emit("new_message", message);
    }
  };

  // console.log("messages ==== ",messages)

  return (
    <div className="max-h-[95vh]  overflow-x-hidden overflow-y-hiddenflex flex-col ">
      <div className="m-2"></div>

      <div
        className="w-full  flex flex-col items-center overflow-y-scroll 
   h-[80vh] p-2 scroll-bar"
      >
        {messages &&
          messages.map((chat: Chat, index: number) => {
            return <Chatcard chat={chat} key={index} />;
          })}
      </div>

      <form className="w-full p-1 fixed bottom-0">
        <div className="flex-center">
          <input
            className="w-[80%] md:w-[50%] p-2 m-1"
            id="message"
            placeholder="type.."
            onChange={handleChange}
            value={input.message}
          />
          <button className="p-2 bg-slate-600" onClick={handleSubmit}>
            &#9658;
          </button>
        </div>
      </form>
    </div>
  );
};

interface ChatCardProps {
  chat: Chat;
}

export const Chatcard: React.FC<ChatCardProps> = ({ chat }) => {
  return (
    <div className="w-[80%] flex-center-col bg-slate-500 rounded-md m-2 p-2 flex justify-between">
      <div className="w-full text-lg font-semibold">{chat.message}</div>

      <div className="w-full flex  text-sm">
        <div className="w-full ">{"human"}</div>
        <div className="w-full  flex justify-end">{chat.time}</div>
      </div>
    </div>
  );
};
