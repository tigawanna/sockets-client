
import { JoinRoom } from './components/JoinRoom';
import React from 'react'
import UserContext from "./utils/context";
import { Chats } from './components/Chats';


export interface User{username:string ; room:string}

let the_user:User
const user_room= localStorage.getItem("user-room");
if(user_room)
the_user = JSON.parse(user_room); 

function App() {
  
  const [user, setUser] = React.useState<User>(the_user);
  const updateUser = (new_user:User) => {setUser(new_user)};

//  const {setRoom,room,messages,sendMessage,userExists,setUserExists} = useChat("genaral")
 const user_exists = user && user.username !==""



return (
<div className="scroll-bar flex flex-col justify-between h-screen w-screen ">

<UserContext.Provider  value ={{user,updateUser}}>
{user_exists?<Chats />:<JoinRoom/>}  
</UserContext.Provider>

  </div>
  );
}

export default App;


{/* <Chats  user={user} messages={messages} sendMessage={sendMessage} room={room} 
setRoom={setRoom} setUserExists={setUserExists}/> */}
