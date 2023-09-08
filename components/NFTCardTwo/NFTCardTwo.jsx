import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "../../lib/axios";
//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";
import Link from "next/link";
const NFTCardTwo = ({ NFTData, setMessages, setChatGroup }) => {
  const fetchData = async (_id) => {
    const { messages } = (
      await axios.get(`/api/chat/${_id}/messages?skip=0&limit=1024`)
    ).data;
    const { chatGroup } = (await axios.get(`/api/chat/${_id}`)).data;
    setMessages(messages);
    setChatGroup(chatGroup);
  };
  const getMessId = async (id) => {
    await fetchData(id);
  };
  return (
    <div className={Style.NFTCardTwo}>
      {NFTData &&
        NFTData?.map((el, i) => (
          <div key={i + 1}>
            <div
              className={Style.NFTCardTwo_box}
              onClick={() => getMessId(el?.key)}
            >
              <div className={Style.NFTCardTwo_box_img}>
                <Image
                  src={el?.image}
                  alt="NFT"
                  width={350}
                  height={350}
                  objectFit="cover"
                  className={Style.NFTCardTwo_box_img_img}
                />
              </div>
              <div className={Style.NFTCardTwo_box_info_info_title}>
                <p>{el?.name}</p>
              </div>
              <div className={Style.NFTCardTwo_box_info}>
                <div className={Style.NFTCardTwo_box_info_box}>
                  <small> price</small>
                  <p>{el?.price} Klay</p>
                </div>
                <div className={Style.NFTCardTwo_box_info_info}>
                  <div className={Style.NFTCardTwo_box_info_info_id}>
                    <p>Askify# {el?.tokenId?.slice(0, 4)}</p>
                  </div>
                  <div className={Style.NFTCardTwo_box_info_info_expert}>
                    {/* <p>
                      with <span>{el.expert}</span>
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NFTCardTwo;
