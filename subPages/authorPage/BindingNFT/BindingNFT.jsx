import React, { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
import style from "./BindingNFT.module.css";
const BindingNFT = () => {
  return (
    <div className={style.chat}>
      <div className={style.message_container}>
        <div className={style.message_sent}>Hi there!</div>
        <div className={style.message_received}>Hello!</div>
        <div className={style.message_sent}>Hi there!</div>
        <div className={style.message_received}>Hello!</div>
        <div className={style.message_sent}>Hi there!</div>
        <div className={style.message_received}>Hello!</div>
        <div className={style.message_sent}>Hi there!</div>
        <div className={style.message_received}>Hello!</div>
        <div className={style.message_sent}>Hi there!</div>
        <div className={style.message_received}>Hello!</div>
        <div className={style.message_sent}>Hi there!</div>
        <div className={style.message_received}>Hello!</div>
      </div>
    </div>
  );
};
export default BindingNFT;
