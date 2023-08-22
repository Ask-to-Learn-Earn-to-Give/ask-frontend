import React, { useContext, useState } from "react";
import Style from "../styles/searchPage.module.css";
import { Banner } from "../subPages/collectionPage/collectionIndex";
import images from "../img";
import { ProblemSolverContext } from "../Context/ProblemSolverContext";
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
      <button onClick={handleUpload}>Create NFT</button>
    </div>
  );
};
export default ConnectRoom;
