import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner } from "../subPages/collectionPage/collectionIndex";
import { Brand, Title, Spinner } from "../components/componentsindex";
import images from "../img";
import { AuthorNFTCardBox } from "../subPages/authorPage/componentIndex";
import {
  AuthorProfileCard,
  AuthorTaps,
} from "../subPages/authorPage/componentIndex";
import { ProblemSolverContext } from "../Context/ProblemSolverContext";
// import sm data
const array1 = [
  {
    image: images.creatorbackground1,
    price: 5,
    auctionStarted: true,
    title: "just a title",
    descrition: "just a description",
    expert: "Roxie",
    id: 1,
  },
  {
    image: images.creatorbackground2,
    price: 5,
    auctionStarted: true,
    title: "just a title",
    descrition: "just a description",
    expert: "Roxie",
    id: 4,
  },
  {
    image: images.creatorbackground3,
    price: 5,
    auctionStarted: true,
    title: "just a title",
    descrition: "just a description",
    expert: "Roxie",
    id: 3,
  },
];
const array2 = [
  {
    image: images.creatorbackground3,
    price: 5,
    auctionStarted: true,
    title: "just a title",
    descrition: "just a description",
    expert: "Roxie",
    id: 1,
  },
  {
    image: images.creatorbackground4,
    price: 5,
    auctionStarted: true,
    title: "just a title",
    descrition: "just a description",
    expert: "Roxie",
    id: 4,
  },
  {
    image: images.creatorbackground5,
    price: 5,
    auctionStarted: true,
    title: "just a title",
    descrition: "just a description",
    expert: "Roxie",
    id: 3,
  },
  {
    image: images.creatorbackground6,
    price: 5,
    auctionStarted: true,
    title: "just a title",
    descrition: "just a description",
    expert: "Roxie",
    id: 2,
  },
];
const profile = () => {
  const [isListed, setIsListed] = useState(true);
  const [isMyNft, setIsMyNft] = useState(false);
  const [listed, setListed] = useState(array2);
  const [myNft, setMyNft] = useState(array1);

  // sm data
  const { currentAccount, userData } = useContext(ProblemSolverContext);

  return (
    <div className={Style.author}>
      <Banner bannerImage={images.background} />
      <AuthorProfileCard currentAccount={currentAccount} userData={userData} />
      <AuthorTaps setIsListed={setIsListed} setIsMyNft={setIsMyNft} />
      <AuthorNFTCardBox
        isListed={isListed}
        isMyNft={isMyNft}
        listed={listed}
        myNft={myNft}
      />
      <Brand />
    </div>
  );
};

export default profile;
