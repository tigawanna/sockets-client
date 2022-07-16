import React, { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import {AiOutlineSend } from 'react-icons/ai';
import { IconContext } from "react-icons";

interface ChatsProps {
  socket: Socket;
  user: { username: string; room: string;}

}
type Chat ={ newMessage:{message: string; time: string,user:string }};

export const Chats: React.FC<ChatsProps> = ({ socket,user}) => {
  const tyme =
    new Date(Date.now()).getHours() +
    ":" +
    new Date(Date.now()).getMinutes() +
    ":" +
    new Date(Date.now()).getSeconds();

  const [messages, setMesages] = useState<any>([]);

  const EVENT = "new_message_added";
  const ROOM = "room_data";

  useEffect(() => {
    socket.on(EVENT, (msg) => {
      // console.log("msg ==== ",msg)
      setMesages((prev: any) => [...prev, msg]);
    });
    // socket.on(ROOM, (msg) => {
    //   console.log("room details ==== ",msg)
    //   setRoom(msg)
    // });

   // unbind the event handler when the component gets unmounted
    return () => {
      socket.off(EVENT);
    };
  }, [socket]);

  const [input, setInput] = useState({ message: "", time: "" });

  const handleChange = async (e: any) => {
    const { value } = e.target;
    setInput({
      ...input,
      [e.target.id]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("user name in form ====",user)
    if (input.message !== "" || user.username !=="") {
      const message = { message: input.message, time: tyme,user:user.username };
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
            return <Chatcard  key={index} chat={chat} user={user}/>;
          })}
      </div>

      <form className="w-full p-1 fixed bottom-0">
        <div className="flex-center">
          <input
            className="w-[80%] md:w-[50%] p-2 m-1 border-black border-2 rounded-sm "
            id="message"
            placeholder="type.."
            onChange={handleChange}
            value={input.message}
            required={true}
          />
            <IconContext.Provider
            value={{
              size: "30px",
              className: "mx-1",
            }}
            
          >
           <AiOutlineSend  onClick={handleSubmit}/>

          </IconContext.Provider>
         
        

        </div>
      </form>
    </div>
  );
};

interface ChatCardProps {
  chat: Chat;
  user: { username: string; room: string;}

}

export const Chatcard: React.FC<ChatCardProps> = ({ chat,user }) => {
  // console.log("chat in chat card ==== ",chat)
  return (
    <div className="flex-center w-full m-2">
    <div className="capitalize p-5 h-6 w-6 text-xl font-bold mr-1 border border-slate-400
        rounded-[50%] flex-center"> {chat?.newMessage.user[0]}</div>
  
  <div className="w-[80%] h-full border border-slate-800  rounded-md
     m-1 p-2 flex justify-between items-center">
 
      <div className="max-w-[80%] h-fit break-words whitespace-normal text-mdfont-normal">
        {chat?.newMessage.message}
        </div>

        <div className="w-[10%] h-full flex flex-col justify-end items-stretch text-sm ">
        <div className="w-full ">{chat?.newMessage.user}</div>
        <div className="w-full ">{chat?.newMessage.time}</div>
      </div>
    </div>
    </div>
  );
};
