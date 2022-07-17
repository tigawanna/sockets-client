import { MainChatRoom } from "./components/MainChatRoom";
import useChat from './utils/useChat';
import { Toolbar } from './components/Toolbar';



function App() {

 const {user,setUser,room,messages,sendMessage,userExists,setUserExists} = useChat("genaral")
 console.log("room ==== ",room)
  return (
    <div className="scroll-bar flex h-screen w-screen">
      <div className="fixed top-[0px] w-[100%] z-60">
        <Toolbar room={room}/>
      </div>
    <div className="w-full h-full  mt-12">  
    <MainChatRoom messages={messages} user={user} setUser={setUser} sendMessage={sendMessage}
    userExists={userExists} setUserExists={setUserExists}
    />
    </div>
  </div>
  );
}

export default App;
