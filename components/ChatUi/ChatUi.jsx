import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import images from "../../img/index";
import styles from "./ChatUi.module.css";
import { Button } from "../componentsindex";
import { ProblemSolverContext } from "../../Context/ProblemSolverContext";
const ChatUi = ({ chatGroup, messages, handleSubmit }) => {
  const [messageInput, setMessageInput] = useState("");
  const { currentAccount } = useContext(ProblemSolverContext);
  const boxRef = useRef(null);

  const currentId = (chatGroup?.members || []).find(
    ({ address }) => address == currentAccount
  )?._id;

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    handleSubmit(messageInput);
    setMessageInput("");
  };

  // scroll to bottom of chat box
  useEffect(() => {
    if (!boxRef.current) return;

    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.Container}>
      <div className={styles.box} ref={boxRef}>
        {messages.map((message, index) => {
          const user = chatGroup.members.find(
            ({ _id }) => _id == message.senderId
          );
          return (
            <Message
              key={message._id}
              content={message.content}
              senderName={user.fullName}
              senderAvatar={user.avatarUrl}
              sentByCurrentUser={message.senderId == currentId}
            />
          );
        })}
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
