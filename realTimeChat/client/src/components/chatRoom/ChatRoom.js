import "./ChatRoom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import UserList from "../userList/UserList";
import { useEffect, useState } from "react";
import ChatList from "../chatList/ChatList";

const ChatRoom = ({ socket, room, user }) => {
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState([]);
  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessageData((prevMsgs) => [...prevMsgs, message]);
    });

    socket.on("user-list", (users) => {
      setUserData(users);
    });
  }, [socket]);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (userInput !== "") {
      const now = new Date();

      // Get the current hours and minutes
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const time = hours + ":" + minutes;

      const data = {
        room,
        userName: user,
        text: userInput,
        time,
      };
      await socket.emit("chat-message", data);
      setUserInput("");
    }
  };

  const leaveRoomHandler = () => {
    window.location.reload();
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <img
            src="https://www.airtribe.live/_nuxt/img/main.6cc64c7.svg"
            alt="airtribe-logo"
          />
          &nbsp;Airtribe
        </h1>
        <button className="btn" id="leave-btn" onClick={leaveRoomHandler}>
          Leave Room
        </button>
      </header>

      <main className="chat-main">
        <div className="chat-sidebar">
          <h2 id="room-name">{room}</h2>
          <h3>
            <FontAwesomeIcon icon={faUser} />
            &nbsp;Online
          </h3>
          <UserList users={userData} />
        </div>
        <ChatList messages={messageData} />
      </main>

      <div className="chat-form-container">
        <form onSubmit={submitHandler}>
          <input
            id="msg"
            type="text"
            placeholder="Type a Message"
            autoComplete="off"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
          />
          <button className="btn-plane">
            <FontAwesomeIcon icon={faPaperPlane} className="paper-plane" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
