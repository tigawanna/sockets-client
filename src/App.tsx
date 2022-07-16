import { useState,useEffect } from "react";
import io from "socket.io-client";

import { Routes, Route} from "react-router-dom";
import { BrowserRouter} from "react-router-dom";
import { Toolbar } from './components/Toolbar';
import { Test } from './components/Test';
import { MainChatRoom } from './components/MainChatRoom';
import { JoinRoom } from './components/JoinRoom';
import { useSocket, useSocketEvent } from 'socket.io-react-hook';

function App() {
  
  const devUrl="http://localhost:4000"
  const prodUrl="https://sockets-server-ke.herokuapp.com/"
  const socket = io(prodUrl, {
    transports: ["websocket"],
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });
  const [room, setRoom] = useState()
  // const ROOM = "room_data";
  // useEffect(() => {

  //   socket.on(ROOM, (msg) => {
  //     console.log("room details ==== ",msg)
  //        setRoom(msg)
  //   });

  //   // unbind the event handler when the component gets unmounted

  // }, []);
  const { connected,error } = useSocket(); 

  // console.log("errror --== ",error)

  return (
    <div
      className="scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-gray-100 
      flex h-screen overflow-x-hidden">

      <BrowserRouter basename="/sockets-client">
        <div className="fixed top-[0px] w-[100%] z-60">
        <Toolbar room={room}/>
        </div>
        <div className="w-full h-full  mt-10">
          <Routes>
            <Route
              path="/"
              element={<MainChatRoom socket={socket} />}
            />
            <Route
              path="/test"
              element={
                // @ts-ignore
              <JoinRoom/>
            }
            />
         </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
