import React, { useState, useContext } from "react";

import { useRouter } from "next/router";
//INTERNAL IMPORT
import Style from "./UploadNFT.module.css";
import formStyle from "../../subPages/AccountPage/Form/Form.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex";
import { DropZone } from "../UploadNFT/uploadNFTindex";

const UloadNFT = ({ uploadToIPFS, mintNft, chatGroup }) => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();
  //
  // mint NFTCard
  const handleMintNft = async () => {
    if (!quantity || !name || !image || !chatGroup?._id || !price) {
      console.log("data missing");
    } else mintNft(quantity, name, image, chatGroup?._id, price);
  };
  return (
    <div className={Style.upload}>
      <DropZone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="Drag & drop file"
        subHeading="or Browse media on your device"
        name={name}
        description={description}
        category={category}
        properties={properties}
        setImage={setImage}
        uploadToIPFS={uploadToIPFS}
        mintNft={mintNft}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Title</label>
          <input
            type="text"
            placeholder="Title "
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="Description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="Nft description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Quantity</label>
          <input
            type="number"
            placeholder="Mint quantity "
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Price</label>
          <input
            type="number"
            placeholder="Price "
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={Style.upload_box_btn}>
          <Button
            btnName="Create NFT"
            handleClick={handleMintNft}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
};

export default UloadNFT;
