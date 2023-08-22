import React from "react";
import Style from "../styles/searchPage.module.css";
import { Banner } from "../subPages/collectionPage/collectionIndex";
import images from "../img";
import DescriptionDetail from "../components/DescriptionDetail/DescriptionDetail";
import PostBid from "../components/PostBid/PostBid";
const detail = () => {
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.background} />
      <DescriptionDetail />
      <PostBid />
    </div>
  );
};

export default detail;
