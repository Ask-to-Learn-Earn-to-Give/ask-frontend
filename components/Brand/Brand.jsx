import React from "react";
import Image from "next/image";
import Button from "../Button/Button";
import images from "../../img";
import Style from "./Brand.module.css";
const Brand = () => {
  return (
    <div className={Style.Brand}>
      <div className={Style.Brand_box}>
        <div className={Style.Brand_box_left}>
          <h1>Earn free crypto with us</h1>
          <p>A creative agency that lead and inspire</p>
          <div className={Style.Brand_box_left_btn}>
            <Button btnName="Create" handleClick={() => {}} />
            <Button btnName="Discover" handleClick={() => {}} />
          </div>
        </div>
        <div className={Style.Brand_box_right}>
          <Image src={images.earn} alt="brand logo" width={800} height={600} />
        </div>
      </div>
    </div>
  );
};

export default Brand;
