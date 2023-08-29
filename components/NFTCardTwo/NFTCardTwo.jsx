import React, { useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { MdVerified, MdTimer } from "react-icons/md";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";
import Link from "next/link";
const NFTCardTwo = ({ NFTData }) => {
  return (
    <div className={Style.NFTCardTwo}>
      {NFTData &&
        NFTData?.map((el, i) => (
          <Link href={{ pathname: "/", query: el }} key={i + 1}>
            <div className={Style.NFTCardTwo_box} key={i + 1}>
              <div className={Style.NFTCardTwo_box_img}>
                <Image
                  src={el.image}
                  alt="NFT"
                  width={350}
                  height={350}
                  objectFit="cover"
                  className={Style.NFTCardTwo_box_img_img}
                />
              </div>
              <div className={Style.NFTCardTwo_box_info_info_title}>
                <p>{el.title}</p>
              </div>
              <div className={Style.NFTCardTwo_box_info}>
                <div className={Style.NFTCardTwo_box_info_box}>
                  <small> price</small>
                  <p>{el.price} ETH</p>
                </div>
                <div className={Style.NFTCardTwo_box_info_info}>
                  <div className={Style.NFTCardTwo_box_info_info_id}>
                    <p>Askify# {el.id}</p>
                  </div>
                  <div className={Style.NFTCardTwo_box_info_info_expert}>
                    <p>
                      with <span>{el.expert}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default NFTCardTwo;
