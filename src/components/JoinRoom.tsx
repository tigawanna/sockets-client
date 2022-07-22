import React, {useContext, useState} from "react";
import UserContext from './../utils/context';
import axios from 'axios';


interface JoinRoomProps {


}

export const JoinRoom: React.FC<JoinRoomProps> = () => {
    
const [input, setInput] = useState({ username: "", room: "general" });
const [error, setError] = useState({ name:"", message:"" });



const devUrl="http://localhost:4000"
const lanUrl="http://192.168.43.238:4000"
const prodUrl="https://sockets-server-ke.herokuapp.com/"


const client = axios.create({ baseURL:prodUrl});
const user = useContext(UserContext);
//console.log("JoinRoom.tsx  user ==== ",user.user)

const handleChange = async (e: any) => {
        const { value } = e.target;
        setInput({
          ...input,
          [e.target.id]: value,
        });

      };
    

  const handleSubmit = async (e: any) => {
  //console.log("inputon submit ==== ",input)
  e.preventDefault();

  
  if(input.username !== ""){
  const roomname = input.room.toLowerCase()
  const username = input.room.toLowerCase()
  const room_data = {username,room:roomname}
  // localStorage.setItem("user-room",JSON.stringify(room_data));
  // user.updateUser(room_data)

  client.post('/users', {user:room_data})
  .then( (response)=> {
  const user_exist =response.data.data
  //console.log("user exists? === ",user_exist)

  if(!user_exist){

  localStorage.setItem("user-room",JSON.stringify(room_data));
  user.updateUser(room_data)  
  }
  else{
    setError({name:"username",message:"username exists"})
  }
  })
  .catch(function (error) {
    //console.log("error logging in === ",error)
    setError({name:"username",message:"connection error"})
  });


  }
  else{
  setError({name:"username",message:"nick name needed"})
  }

  };   
  const isError=()=>{
  if(error.name === "") return false
  return true}


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
