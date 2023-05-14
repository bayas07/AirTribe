const ChatList = ({ messages = [] }) => {
  return (
    <div className="chat-messages">
      {messages.map((message, index) => (
        <div className="message" key={index}>
          <p className="meta">
            {message.userName}
            <span>{message.time}</span>
          </p>
          <p className="text">{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
