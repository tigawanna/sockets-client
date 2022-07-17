import { useEffect, useRef, useState } from "react";
import socketIOClient ,{Socket} from "socket.io-client";


const NEW_MESSAGE_ADDAED = "new_message_added";
const ROOM_DATA = "room_data";

const devUrl="http://localhost:4000"
const prodUrl="https://sockets-server-ke.herokuapp.com/"

const useChat = (roomId:string) => {



  const [messages, setMessages] = useState<any>([]);
  const [room, setRoom] = useState<any>([]);
  let aUser={username:"",room:"general"}

  const [user, setUser] = useState<any>();
  const [userExists, setUserExists] = useState<boolean>(true);
  const socketRef = useRef<Socket>();

  useEffect(() => {

   const user_room= localStorage.getItem("user-room");
    if(!user_room || user_room === null){
          // console.log("nothing to see here",user_room)
       setUser(undefined)
       setUserExists(false)
      }else{
      //@ts-ignore
      aUser = JSON.parse(user_room); 
      // console.log("aUser not join on hook load=== ",aUser)
      setUser(aUser)
      setUserExists(true)
      socketRef.current = socketIOClient(prodUrl, {
        query: { roomId,user:aUser.username },
          transports: ["websocket"],
          withCredentials: true,
          extraHeaders:{"my-custom-header": "abcd"}
        })}


   socketRef.current?.on(NEW_MESSAGE_ADDAED, (msg:any) => {
    // console.log("new message  added==== ",msg)
    setMessages((prev: any) => [...prev, msg]);
  });

  socketRef.current?.on(ROOM_DATA, (msg:any) => {
    // console.log("room data  ==== ",msg)
    setRoom(msg)
  });



return () => {socketRef.current?.disconnect();};
  }, [roomId,userExists]);


  const sendMessage = (message:any) => {
  //  console.log("sending message === ",message)
    socketRef.current?.emit("new_message", message)
  };

//   socketRef.current?.emit('join',
//   {name:aUser.username,room:aUser.room}, (error:any) => {
//     if(error) {alert(error);}})


  return {user,setUser,room,messages, sendMessage,userExists,setUserExists };
};

export default useChat;
