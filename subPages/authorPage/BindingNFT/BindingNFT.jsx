import React, { useState, useEffect, useRef } from "react";
import Message from "../../../components/ChatUi/Message";
// import io from "socket.io-client";
import style from "./BindingNFT.module.css";
const BindingNFT = ({ messagesNFT, chatgoupNFT }) => {
  return (
    <div>
      {messagesNFT.length > 0 ? (
        <div className={style.chat}>
          {messagesNFT.map((message, index) => {
            const user = chatgoupNFT.members.find(
              ({ _id }) => _id == message.senderId
            );
            return (
              <Message
                key={message._id}
                content={message.content}
                senderName={user.fullName}
                senderAvatar={user.avatarUrl}
                sentByCurrentUser={message.senderId == chatgoupNFT.ownerId}
              />
            );
          })}
        </div>
      ) : (
        <h1>Please select nft to show data</h1>
      )}
    </div>
  );
};

export default BindingNFT;
