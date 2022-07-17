import React from 'react'
import { Chats } from './Chats';
import { JoinRoom } from './JoinRoom';



interface User{username:string ; room:string}
interface MainChatRoomProps {
messages:any ;
user:User
setUser: React.Dispatch<any>
sendMessage: (message: any) => void
userExists: boolean
setUserExists: React.Dispatch<React.SetStateAction<boolean>>
}


export const MainChatRoom: React.FC<MainChatRoomProps> = ({user,setUser,messages,sendMessage,userExists,setUserExists}) => {


return (
 <div className='h-full w-full '>
  {userExists?<Chats user={user} messages={messages} sendMessage={sendMessage}/>:
  <JoinRoom setUser={setUser} setUserExists={setUserExists}/>}
 </div>
);
}

