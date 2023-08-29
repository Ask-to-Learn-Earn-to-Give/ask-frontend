import React, { useState } from "react";
import NFTCardTwo from "../../../components/NFTCardTwo/NFTCardTwo";
//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import BindingNFT from "../BindingNFT/BindingNFT";
import images from "../../../img";

const AuthorNFTCardBox = ({ isListed, isMyNft, listed, myNft }) => {
  return (
    <div className={Style.AuthorNFTCardBox}>
      <div>
        {isListed && <NFTCardTwo NFTData={listed} />}
        {isMyNft && <NFTCardTwo NFTData={myNft} />}
      </div>
      <div className={Style.AuthorNFTCardBox_nft_binding}>
        <BindingNFT />
      </div>
    </div>
  );
};

export default AuthorNFTCardBox;
