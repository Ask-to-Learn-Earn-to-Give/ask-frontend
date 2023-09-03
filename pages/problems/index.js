import React, { useContext, useEffect, useState } from "react";
import Style from "../../styles/problems.module.css";
import { Slider, Brand, Spinner } from "../../components/componentsindex";
import { Filter } from "../../components/componentsindex";
import {
  Banner,
  PropCard,
} from "../../subPages/collectionPage/collectionIndex";
import { SearchBar } from "../../subPages/Problems/searchBarIndex";
import useAxios from "../../hook/useAxios";

import images from "../../img";
// smartcontract
import { ProblemSolverContext } from "../../Context/ProblemSolverContext";

const searchPage = () => {
  // connect data smart contract
  const { propData } = useContext(ProblemSolverContext);
  const [dataCopy, setDataCopy] = useState([]);
  const [dataCall, setDataCall] = useState([]);
  useEffect(() => {
    if (propData) {
      setDataCall(propData);
    }
  }, [propData]);
  const onHandleSearch = (value) => {
    const filtereData = propData.filter(({ title }) =>
      title().includes(value())
    );
    if (filtereData.length === 0) {
      setDataCall(dataCopy);
    } else {
      setDataCall(filtereData);
    }
  };
  const onClearSearch = () => {
    if (propData.length && dataCall.length) {
      setDataCall(propData);
    }
  };

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.background} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      {propData && propData.length == 0 ? (
        <Spinner />
      ) : (
        <PropCard PropData={dataCall} />
      )}
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
