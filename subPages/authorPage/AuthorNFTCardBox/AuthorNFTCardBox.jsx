import React, { useState } from "react";
import NFTCardTwo from "../../../components/NFTCardTwo/NFTCardTwo";
//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import BindingNFT from "../BindingNFT/BindingNFT";
import images from "../../../img";

const AuthorNFTCardBox = ({ isListed, isMyNft, listed, myNft }) => {
  const [messagesNFT, setMessages] = useState([]);
  const [chatgoupNFT, setChatGroup] = useState([]);

  return (
    <div className={Style.AuthorNFTCardBox}>
      <div>
        {isListed && (
          <NFTCardTwo
            NFTData={listed}
            setMessages={setMessages}
            setChatGroup={setChatGroup}
          />
        )}
        {isMyNft && (
          <NFTCardTwo
            NFTData={myNft}
            setMessages={setMessages}
            setChatGroup={setChatGroup}
          />
        )}
      </div>
      <div className={Style.AuthorNFTCardBox_nft_binding}>
        <BindingNFT messagesNFT={messagesNFT} chatgoupNFT={chatgoupNFT} />
      </div>
    </div>
  );
};

export default AuthorNFTCardBox;
