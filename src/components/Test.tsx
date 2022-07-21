import React, { useContext } from 'react'
import { Chat, Message } from '../utils/types';
import UserContext from './../utils/context';
import useChats from './../utils/useChats';


interface TestProps {
}

export const Test: React.FC<TestProps> = () => {
const user = useContext(UserContext);
//console.log("Text.tsx  user ==== ",user.user)

const {room,messages} = useChats(user.user)

const texts = messages as Chat[]

//console.log("texts === ",texts)
return (
 <div className="h-full w-full">
    <div className="text-4xl font-bold"> testing</div>
    <div className="text-lg">User {user.user.username }</div>
    <div className="text-lg">Room {user.user.room }</div>
    <div className="text-lg">RoomUser count {room.users }</div>
 <button className='p-2 text-lg bg-purple-200 rounded-md'
 onClick={()=>user.updateUser({username:"",room:""})}>logout</button>

<div className="text-lg">
{
    texts.map((text,index)=>{
         return <div key={index} className='p-2 m-1 '>{text.newMessage.message}</div>
    })
}
</div>
 </div>
);
}
