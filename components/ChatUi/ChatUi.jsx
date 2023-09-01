import React, { useState } from "react";
import Message from "./Message";
import images from "../../img/index";
import styles from "./ChatUi.module.css";
const ChatUi = () => {
  const messages = [
    {
      id: 1,
      text: "Hi there! How are you doing?",
      senderName: "Alice",
      senderAvatar: images.user2,
      sentByCurrentUser: false,
    },
    {
      id: 2,
      text: "I'm good, thanks for asking! How about you?",
      senderName: "Bob",
      senderAvatar: images.user4,

      sentByCurrentUser: true,
    },
    {
      id: 3,
      text: "I'm doing pretty well, thanks.",
      senderName: "Alice",
      senderAvatar: images.user2,

      sentByCurrentUser: false,
    },
    {
      id: 3,
      text: "I'm doing pretty well, thanks.",
      senderName: "Alice",
      senderAvatar: images.user2,

      sentByCurrentUser: false,
    },
    {
      id: 3,
      text: "I'm doing pretty well, thanks.",
      senderName: "Alice",
      senderAvatar: images.user2,

      sentByCurrentUser: false,
    },
    {
      id: 3,
      text: "I'm doing pretty well, thanks.",
      senderName: "Alice",
      senderAvatar: images.user2,

      sentByCurrentUser: false,
    },
  ];
  const [messageInput, setMessageInput] = useState("");
  const handleMessageSubmit = (event) => {
    event.preventDefault();
    console.log(messageInput);
    setMessageInput("");
  };
  return (
    <div className={styles.Container}>
      <div className={styles.box}>
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            senderName={message.senderName}
            senderAvatar={message.senderAvatar}
            sentByCurrentUser={message.sentByCurrentUser}
          />
        ))}
      </div>
      <form className={styles.InputChatBox} onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatUi;
