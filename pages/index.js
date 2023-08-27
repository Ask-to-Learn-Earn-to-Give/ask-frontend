import React, { useContext, useEffect, useState } from "react";
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  Brand,
  Spinner,
  Title,
  Slider,
  Subscribe,
} from "../components/componentsindex";
import { PropCard } from "../subPages/collectionPage/collectionIndex";
import { ProblemSolverContext } from "../Context/ProblemSolverContext";
const Home = () => {
  const { checkIfWalletConnected, propData } = useContext(ProblemSolverContext);
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Title heading="Start with easy step" paragraph="" />
      <Service />
      <Title
        heading="Discovery "
        paragraph="Help our user solve they problem to get money now!"
      />
      <div className={Style.PropCard}>
        {propData && propData.length == 0 ? (
          <Spinner />
        ) : (
          <PropCard PropData={propData} />
        )}
      </div>

      <Slider />
      <Brand />
      <Subscribe />
    </div>
  );
};

export default Home;
