import UserForm from "./components/userForm/UserForm";
import io from "socket.io-client";
import ChatRoom from "./components/chatRoom/ChatRoom";
import { useState } from "react";

const socket = io.connect("http://localhost:3003");

function App() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("Backend");
  const [showChat, setShowChat] = useState(false);

  const fnJoinRoom = (data) => {
    socket.emit("join-room", data);
    setShowChat(true);
  };

  const handleSetUser = (data) => setUser(data);
  const handleSetRoom = (data) => setRoom(data);

  return (
    <div>
      {!showChat && (
        <UserForm
          fnJoinRoom={fnJoinRoom}
          socket={socket}
          user={user}
          room={room}
          handleSetUser={handleSetUser}
          handleSetRoom={handleSetRoom}
        />
      )}
      {showChat && (
        <ChatRoom
          socket={socket}
          user={user}
          room={room}
        />
      )}
    </div>
  );
}

export default App;
