import { useState,useEffect } from "react";
import { MainChatRoom } from "./components/MainChatRoom";
import useChat from './utils/useChat';



function App() {

 const {user,setUser,room,messages,sendMessage,userExists,setUserExists} = useChat("genaral")
//  console.log("user  ",user)
  return (
    <div className="scroll-bar flex h-screen">
    <MainChatRoom messages={messages} user={user} setUser={setUser} sendMessage={sendMessage}
    userExists={userExists} setUserExists={setUserExists}
    />
  </div>
  );
}

export default App;
