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
          <p>Connect with our expert to solve your problem now</p>
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
