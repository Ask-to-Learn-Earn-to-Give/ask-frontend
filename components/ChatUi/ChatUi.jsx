import React, { useState } from "react";
import Message from "./Message";
import images from "../../img/index";
import styles from "./ChatUi.module.css";
import { Button } from "../componentsindex";
const ChatUi = () => {
  const messages = [
    {
      senderId: 1,
      content: "I'm doing pretty well, thanks.",
      senderName: "Bob",
      senderAvatar: images.user1,
      chatGroupId: 12345,
      sentByCurrentUser: true,
    },
    {
      senderId: 2,
      content: "I'm doing pretty well, thanks.",
      senderName: "Alice",
      senderAvatar: images.user2,
      chatGroupId: 12345,
      sentByCurrentUser: false,
    },
    {
      senderId: 1,
      content: "I'm doing pretty well, thanks.",
      senderName: "bob",
      senderAvatar: images.user1,
      chatGroupId: 12345,
      sentByCurrentUser: true,
    },
    {
      senderId: 2,
      content: "I'm doing pretty well, thanks.",
      senderName: "Alice",
      senderAvatar: images.user2,
      chatGroupId: 12345,
      sentByCurrentUser: false,
    },
    {
      senderId: 1,
      content: "I'm doing pretty well, thanks.",
      senderName: "bob",
      senderAvatar: images.user1,
      chatGroupId: 12345,
      sentByCurrentUser: true,
    },
    {
      senderId: 2,
      content: "I'm doing pretty well, thanks.",
      senderName: "Alice",
      senderAvatar: images.user2,
      chatGroupId: 12345,
      sentByCurrentUser: false,
    },
    {
      senderId: 1,
      content: "I'm doing pretty well, thanks.",
      senderName: "bob",
      senderAvatar: images.user1,
      chatGroupId: 12345,
      sentByCurrentUser: true,
    },
    {
      senderId: 2,
      content: "I'm doing pretty well, thanks.",
      senderName: "Alice",
      senderAvatar: images.user2,
      chatGroupId: 12345,
      sentByCurrentUser: false,
    },
    {
      senderId: 1,
      content: "I'm doing pretty well, thanks.",
      senderName: "bob",
      senderAvatar: images.user1,
      chatGroupId: 12345,
      sentByCurrentUser: true,
    },
    {
      senderId: 2,
      content: "I'm doing pretty well, thanks.",
      senderName: "Alice",
      senderAvatar: images.user2,
      chatGroupId: 12345,
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
        {messages.map((message, index) => (
          <Message
            key={index}
            content={message.content}
            senderName={message.senderName}
            senderAvatar={message.senderAvatar}
            sentByCurrentUser={message.sentByCurrentUser}
          />
        ))}
      </div>
      <form className={styles.InputChatBox} onSubmit={handleMessageSubmit}>
        <input
          type="content"
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
          placeholder="Type a message..."
        />
        <Button type="submit" btnName={"SEND"} handleClick={() => {}}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatUi;
