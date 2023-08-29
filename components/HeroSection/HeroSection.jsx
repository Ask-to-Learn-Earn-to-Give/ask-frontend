import React, { useContext } from "react";
import Image from "next/image";
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";
import { useRouter } from "next/router";
// import SM
const HeroSection = () => {
  const router = useRouter();
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>
            Ask to learn <br /> earn to give
          </h1>
          <p>
            Connect with expert consultants through Askify to solve your
            real-world problems. <br /> <br /> Our tokenization process enables
            you to convert your knowledge into valuable digital assets that can
            be traded and utilized easily across our diverse platforms, allowing
            you to earn passive income
          </p>
          <br />
          <br />
          <br />
          <Button
            btnName={"Discover Now"}
            handleClick={() => router.push("/searchPage")}
          />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="Hero Section"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
