import React, {useState, useEffect} from "react";
import queryString from "query-string";
import { Socket } from 'socket.io-client';

interface JoinRoomProps {
setOpen: React.Dispatch<React.SetStateAction<boolean>>
socket:Socket
}

export const JoinRoom: React.FC<JoinRoomProps> = ({setOpen,socket}) => {
const [input, setInput] = useState({ username: "", room: "general" });
const [error, setError] = useState({ name:"", message:"" });

const handleChange = async (e: any) => {
        const { value } = e.target;
        setInput({
          ...input,
          [e.target.id]: value,
        });
      };
    
 const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(input.username !== ""){
        localStorage.setItem("user-room",JSON.stringify(input));
        socket.emit('join',{name:input.username,room:input.room}, (error:any) => {
        if(error) {alert(error);}})
        setOpen(false)
        }
        else{
        setError({name:"username",message:"nick name needed"})
        }

      };   
  const isError=()=>{
    if(error.name === ""){
     return false
    }
    return true
     }
return (
 <div className="h-full w-full flex-center-col bg-gradient-to-l from-cyan-900 to-purple-900">
        <form className="w-[95%] md:w-[50%] p-3 bg-slate-700 rounded-lg text-white shadow-lg
         shadow-purple-500 ">
        <div className="flex-center-col">
            <label className="text-lg font-bold">Join</label>
          <input
            style={{borderColor:isError()?"red":""}}
            className="w-[80%] md:w-[80%] p-2 m-1 border-black border rounded-sm bg-black"
            id="username"
            placeholder="nick name"
            onChange={handleChange}
            value={input.username}
          />

         <input
            className="w-[80%] md:w-[80%] p-2 m-1 border-black border rounded-sm bg-black"
            id="room"
            placeholder="room name"
            onChange={handleChange}
            value={input.room}
          />
         {isError()?<div className="text-md p-1m-1 text-red-300">{error.message}</div>:null}
      <button 
      onClick={handleSubmit}
      className="p-2 m-1 w-[30%] bg-purple-800 shadow-md 
       hover:shadow-purple-400 rounded-md">Join</button>
      </div>
      </form>

 </div>
);
}
