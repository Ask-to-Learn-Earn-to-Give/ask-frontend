import React, { useContext, useState } from "react";
import Style from "../styles/create.module.css";
import { Banner } from "../subPages/collectionPage/collectionIndex";
import { Create } from "../subPages/CreatePage/createIndex";

import images from "../img";
// import data from contract
import { ProblemSolverContext } from "../Context/ProblemSolverContext";
const create = () => {
  const { uploadToIPFS } = useContext(ProblemSolverContext);
  // tabs

  return (
    <div className={Style.create}>
      <Banner bannerImage={images.background} />

      <div className={Style.create_box}>
        <div className={Style.create_box_heading}>
          <h1>Describe Your Problem</h1>
          <p>Image, Title, description, ...</p>
        </div>
        <div className={Style.create_box_title}>
          <h1>Upload image</h1>
          <p>
            File types supported: JPG, PNG, GIF, SVG, MP3, MP4, WEBM, GLB, GLTF.
            Max Size: 100 MB
          </p>
        </div>
        <div className={Style.create_box_form}>
          {" "}
          <div className={Style.uploadNFT_box_form}>
            <Create uploadToIPFS={uploadToIPFS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default create;
