import { useState,useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { Chats } from "./components/Chats";
import { Routes, Route} from "react-router-dom";
import { BrowserRouter} from "react-router-dom";
import { Toolbar } from './components/Toolbar';
import { Test } from './components/Test';


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

  const [input, setInput] = useState({ username: "", room: "" });

  return (
    <div
      className="scrollbar-thin scrollbar-thumb-purple-700scrollbar-track-gray-100 
      flex h-screen overflow-x-hidden">

      <BrowserRouter basename="/sockets-client">
        <div className="fixed top-[0px] w-[100%] z-60">
        <Toolbar/>
        </div>
        <div className="w-full h-full mt-16 ">
          <Routes>
            <Route
              path="/"
              element={<Chats socket={socket} room={input.room} user={input.username} />}
            />
            <Route
              path="/test"
              element={
              <Test/>
            }
            />
         </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
