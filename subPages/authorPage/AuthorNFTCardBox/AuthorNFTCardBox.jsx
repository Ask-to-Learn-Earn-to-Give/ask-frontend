import React, { useState } from "react";

//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import images from "../../../img";
import { NFTCardTwo } from "../../collectionPage/collectionIndex";
import FollowerTabCard from "../../../components/FollowerTab/FollowerTabCard/FollowerTabCard";

const AuthorNFTCardBox = ({
  collectiables,
  created,
  like,
  follower,
  following,
}) => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "0x70997970C518",
    },
  ];

  const followingArray = [
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground1,
      user: images.user8,
      seller: "0x70997970C518",
    },
  ];
  return (
    <div className={Style.AuthorNFTCardBox}>
      {like && <NFTCardTwo NFTData={nfts} />}
      {follower && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followerArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} key={i} />
          ))}
        </div>
      )}
      {following && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followingArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorNFTCardBox;
