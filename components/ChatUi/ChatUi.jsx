import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import images from "../../img/index";
import styles from "./ChatUi.module.css";
import { Button } from "../componentsindex";
import { ProblemSolverContext } from "../../Context/ProblemSolverContext";
const ChatUi = ({ chatGroup, messages, handleSubmit }) => {
  const [messageInput, setMessageInput] = useState("");
  const { currentAccount, solvedProblem, unSolvedProblem } =
    useContext(ProblemSolverContext);
  const boxRef = useRef(null);

  const currentId = (chatGroup?.members || []).find(
    ({ address }) => address == currentAccount
  )?._id;

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    handleSubmit(messageInput);
    setMessageInput("");
  };
  // handle solve problem
  const handleSolverProblem = async () => {
    const probId = getNumberFromName(chatGroup?.name);
    if (probId && expertAddress) {
      const solved = await solvedProblem(probId, expertAddress);
    } else {
      console.log("data missing");
    }
  };
  const handleUnSolverProblem = async () => {
    const probId = getNumberFromName(chatGroup?.name);
    if (probId) {
      const unsolved = await unSolvedProblem(probId);
    } else {
      console.log("data missing");
    }
  };
  // scroll to bottom of chat box
  useEffect(() => {
    if (!boxRef.current) return;

    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);
  // get expert addrress:
  const expertAddress = (chatGroup?.members || []).find(
    ({ _id }) => _id !== chatGroup?.ownerId
  )?.address;
  // get problem ID
  function getNumberFromName(name) {
    var words = name?.split(" ") || "";
    var lastWord = words[words.length - 1]?.trim();
    if (/^\d+$/.test(lastWord)) {
      return parseInt(lastWord);
    } else {
      return null;
    }
  }

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
        <div style={{ maxWidth: "700px", overflowY: "scroll" }}>
          <input
            type="text"
            style={{
              width: "650px",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
            placeholder="Type a message..."
          />
        </div>

        {/* <Button type="submit" btnName={"SEND"} handleClick={() => {}}>
    Send
  </Button> */}
      </form>
      <div className={styles.button_box}>
        <h1>Your problems has Solved?</h1>
        <div className={styles.button_box_button}>
          <Button
            btnName={" Solved"}
            handleClick={() => handleSolverProblem()}
          ></Button>
          <Button
            btnName={"UnSolved"}
            handleClick={() => handleUnSolverProblem()}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default ChatUi;
