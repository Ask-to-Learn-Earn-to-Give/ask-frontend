import React from "react";
import Image from "next/image";
const Message = ({ text, senderName, senderAvatar, sentByCurrentUser }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        margin: "10px",
        flexDirection: sentByCurrentUser ? "row-reverse" : "row",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Image
              src={senderAvatar}
              width={50}
              height={50}
              alt={`${senderName}'s avatar`}
              style={{
                marginLeft: sentByCurrentUser ? "10px" : "0",
                marginRight: sentByCurrentUser ? "0" : "10px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div>
            <span style={{ fontWeight: "bold", marginBottom: "5px" }}>
              {senderName}
            </span>
            <div
              style={{
                backgroundColor: sentByCurrentUser ? "#007bff" : "#e6e6e6",
                color: sentByCurrentUser ? "#fff" : "#333",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "70%",
              }}
            >
              {text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
