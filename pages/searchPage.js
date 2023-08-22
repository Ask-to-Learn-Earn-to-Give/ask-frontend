import React, { useContext, useEffect, useState } from "react";
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Spinner } from "../components/componentsindex";
import { Filter } from "../components/componentsindex";
import { Banner } from "../subPages/collectionPage/collectionIndex";
import images from "../img";
// smartcontract
import { ProblemSolverContext } from "../Context/ProblemSolverContext";

const searchPage = () => {
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.background} />

      <Filter />
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
