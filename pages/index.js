import React, { useContext, useEffect, useState } from "react";
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  Brand,
  Spinner,
  Title,
} from "../components/componentsindex";
import { ProblemSolverContext } from "../Context/ProblemSolverContext";
const Home = () => {
  const { checkIfWalletConnected } = useContext(ProblemSolverContext);
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Title heading="Start with easy step" paragraph="" />
      <Service />
      <Title heading="Find the Expert now" paragraph="" />

      <Brand />
    </div>
  );
};

export default Home;
