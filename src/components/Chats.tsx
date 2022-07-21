import React, { useState, useRef,useEffect,useContext } from "react";
import {AiOutlineSend } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { makeTimeStamp } from './../utils/utils';
import { Toolbar } from './Toolbar';
import { Chat, Message } from './../utils/types';
import UserContext from "../utils/context";
import useChats from "../utils/useChats";



interface ChatsProps {

}


export const Chats: React.FC<ChatsProps> = ({}) => {


const user = useContext(UserContext);
// //console.log("Text.tsx  user ==== ",user.user)

const {room,messages,sendMessage} = useChats(user.user)

const [input, setInput] = useState({ message: "", time:makeTimeStamp() });
const [error, setError] = useState({ name:"", message:"" });

 const [size, setSize] = useState({x: window.innerWidth,y: window.innerHeight});
 const updateSize = () =>setSize({x: window.innerWidth,y: window.innerHeight });

 useEffect(() => {
   window.onresize = updateSize
    })

  const handleChange = async (e: any) => {
    const { value } = e.target;
    setInput({
      ...input,
      [e.target.id]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // //console.log("submit in form ====",input.message)
    if (input.message !== "" && user.user.username !=="") {
      const message = { message: input.message, time:input.time,user:user.user.username };
      // //console.log("message ====",message)
      sendMessage(message)
      setError({name:"",message:""})
    }else{
      //console.log("error ====",input,user)
      setError({name:"username",message:"type something"})
    }
  };

  const isError=()=>{
    if(error.name === "") return false
    return true}
 

  return (
    <div 
    style={{maxHeight:size.y}}
    className="h-full overflow-x-hidden overflow-y-hiddenflex flex-col justify-between ">

      <div className="fixed top-[0px] w-[100%] z-60">
      <Toolbar room={room}  updateUser={user.updateUser}/>
      </div>
      {/* <div className="fixed top-[10%] right-[40%] p-1 z-60 text-3xl font-bold">{size.y}</div> */}

      <div
        className="mt-10 w-full h-[55vh] md:h-[80vh] flex flex-col-reverse items-center overflow-y-scroll  p-2 scroll-bar"
      >
        {messages &&
          messages.map((chat: Chat, index: number) => {
            return <Chatcard  key={index} chat={chat} user={user.user}/>;
          })}
      </div>

      <form 
      onSubmit={handleSubmit}
      className="w-full p-1 fixed bottom-1 ">
        <div className="flex-center">
          <input
             style={{borderColor:isError()?"red":""}}
            className="w-[80%] md:w-[50%] p-2 m-1 border-black border-2 rounded-sm "
            id="message"
            placeholder="type.."
            onChange={handleChange}
            value={input.message}
   
            autoComplete={"off"}
          />
          <button type="submit">
            <IconContext.Provider value={{
              size: "30px",
              className: "mx-1",

            }}>
           <AiOutlineSend  /></IconContext.Provider>
               </button>
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
  
const isMe = chat.newMessage.user === user.username
  // //console.log("chat in chat card ==== ",chat)
  return (
    <div className="flex-center w-full m-2">

    <div 
    style={{backgroundColor:isMe?"purple":"white",color:isMe?"white":""}}
    className="capitalize p-5 h-6 w-6 text-xl font-bold mr-1 border-2 border-slate-400
    rounded-[50%] flex-center"> {chat?.newMessage.user[0]}</div>
  
      <div className="w-[80%] h-full border border-slate-800  rounded-md
     m-1 p-2 flex justify-between items-center">
 
      <div className="max-w-[80%] h-fit break-words whitespace-normal text-mdfont-normal">
        {chat?.newMessage.message}
      </div>

        <div className="w-fit font-medium h-full flex flex-col justify-end items-stretch text-sm ">
        <div className="w-full ">{chat?.newMessage.user}</div>
        <div className="w-full ">{chat?.newMessage.time}</div>
      </div>
    </div>

    </div>
  );
};
