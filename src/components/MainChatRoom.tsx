import React from 'react'
import { Chats } from './Chats';
import { Socket } from "socket.io-client";
import { useState } from 'react';
import { JoinRoom } from './JoinRoom';
import { useEffect } from 'react';

interface MainChatRoomProps {
socket:Socket
}
interface User{
username:string
room:string
}

export const MainChatRoom: React.FC<MainChatRoomProps> = ({socket}) => {

let aUser={username:"",room:"general"}
  
const EVENT = "join";

useEffect(() => {
const user_room= localStorage.getItem("user-room");
if(!user_room || user_room === null){
    console.log("nothing to see here",user_room)
    setOpen(true)
}else{
//@ts-ignore
aUser = JSON.parse(user_room); 
console.log("aUser not null on join=== ",aUser)
socket.emit('join',{name:aUser.username,room:aUser.room}, (error:any) => {
if(error) {alert(error);}})
}




// unbind the event handler when the component gets unmounted
return () => {
socket.off(EVENT);};
}, [socket]);


const [open, setOpen] = useState(false);
return (
 <div className='h-full w-full'>
  {open?<JoinRoom setOpen={setOpen} socket={socket}/>:<Chats socket={socket} user={aUser}/>}
 </div>
);
}

