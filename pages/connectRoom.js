import React, { useContext, useState } from "react";
import Style from "../styles/problems.module.css";
import { Banner } from "../subPages/collectionPage/collectionIndex";
import images from "../img";
import { ProblemSolverContext } from "../Context/ProblemSolverContext";
import ChatUi from "../components/ChatUi/ChatUi";
import styles from "../styles/connectRoom.module.css";
import UloadNFT from "../components/UploadNFT/UploadNFT";
const ConnectRoom = () => {
  const { uploadToIPFS } = useContext(ProblemSolverContext);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const handleUpload = async () => {
    const data = {
      userName: "test",
      userImg: "asda",
      comment: "commdasent",
      price: "price",
      expertAddress: "currentAccount",
    };
    const url = await uploadToIPFS(JSON.stringify(data));
    setUploadedUrl(url);
  };

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.background} />
      <div className={styles.Container}>
        <div>
          <h1>Connected Room</h1>
          <ChatUi />
        </div>
        <div>
          <h1>Create NFT</h1>
          <UloadNFT />
        </div>
      </div>
    </div>
  );
};
export default ConnectRoom;
