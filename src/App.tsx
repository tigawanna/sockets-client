import { useState,useEffect } from "react";
import io from "socket.io-client";

import { Routes, Route} from "react-router-dom";
import { BrowserRouter} from "react-router-dom";
import { Toolbar } from './components/Toolbar';
import { Test } from './components/Test';
import { MainChatRoom } from './components/MainChatRoom';
import { JoinRoom } from './components/JoinRoom';


function App() {
  const devUrl="http://localhost:4000"
  const prodUrl="https://sockets-server-ke.herokuapp.com/"
  const socket = io(devUrl, {
    transports: ["websocket"],
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });




  return (
    <div
      className="scrollbar-thin scrollbar-thumb-purple-700scrollbar-track-gray-100 
      flex h-screen overflow-x-hidden">

      <BrowserRouter basename="/sockets-client">
        <div className="fixed top-[0px] w-[100%] z-60">
        <Toolbar/>
        </div>
        <div className="w-full h-full  mt-5">
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
