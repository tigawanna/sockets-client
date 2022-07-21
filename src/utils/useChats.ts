import { Room, User } from "./types"
import { useRef,useState,useEffect } from 'react';
import socketIOClient,{ Socket } from 'socket.io-client';

const NEW_MESSAGE_ADDAED = "new_message_added";
const ROOM_DATA = "room_data";

const devUrl="http://localhost:4000"
const lanUrl="http://192.168.43.238:4000"
const prodUrl="https://sockets-server-ke.herokuapp.com/"



const useChats=(user:User)=>{

const socketRef = useRef<Socket>();
const [messages, setMessages] = useState<any>([]);
const [room, setRoom] = useState<Room>({users:0,room:""});


useEffect(() => {
socketRef.current = socketIOClient(lanUrl, {
query: { room:user.room,user:user.username },
transports: ["websocket"],
withCredentials: true,
extraHeaders:{"my-custom-header": "abcd"}

})


socketRef.current?.on(NEW_MESSAGE_ADDAED, (msg:any) => {
// //console.log("new message  added==== ",msg)
setMessages((prev: any) => [msg,...prev]);
 });

socketRef.current?.on(ROOM_DATA, (msg:any) => {
//console.log("room data  ==== ",msg)
 setRoom(msg)});

return () => {socketRef.current?.disconnect()};
}, [])

const sendMessage = (message:any) => {
//console.log("sending message ..... === ",message)
 socketRef.current?.emit("new_message", message)
};




return {room,messages,sendMessage}
}
export default useChats
