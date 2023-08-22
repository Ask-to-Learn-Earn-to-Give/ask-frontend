import React, { useState, useContext } from "react";
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import { useRouter } from "next/router";
//INTERNAL IMPORT
import Style from "./Create.module.css";
import formStyle from "./Form.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex";
import { DropZone } from "../CreatePage/createIndex";

const Create = ({ uploadToIPFS }) => {
  const [active, setActive] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [category, setCategory] = useState(0);
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();
  const categoryArry = [
    {
      image: images.blockchain,
      category: "Blockchain",
    },
    {
      image: images.coding,
      category: "Coding",
    },
    {
      image: images.finance,
      category: "Finance",
    },
    {
      image: images.healthcare,
      category: "Healthcare",
    },
    {
      image: images.education,
      category: "Education",
    },
    {
      image: images.others,
      category: "Others",
    },
  ];

  return (
    <div className={Style.upload}>
      <DropZone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="Drag & drop file"
        subHeading="or Browse media on your device"
        name={title}
        description={description}
        fileSize={fileSize}
        category={category}
        properties={properties}
        setImage={setImage}
        uploadToIPFS={uploadToIPFS}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Title</label>
          <input
            type="text"
            placeholder="Title "
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="80"
            rows="6"
            placeholder="Write your question description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Choose Category</label>
          <p className={Style.upload_box_input_para}>
            Choose an exiting category to connect with our expert
          </p>

          <div className={Style.upload_box_slider_div}>
            {categoryArry.map((el, i) => (
              <div
                className={`${Style.upload_box_slider} ${
                  active == i + 1 ? Style.active : ""
                }`}
                key={i + 1}
                onClick={() => (setActive(i + 1), setCategory(el.category))}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={Style.upload_box_slider_box_img}>
                    <Image
                      src={el.image}
                      alt="background image"
                      width={70}
                      height={70}
                      className={Style.upload_box_slider_box_img_img}
                    />
                  </div>
                  <div className={Style.upload_box_slider_box_img_icon}>
                    <TiTick />
                  </div>
                </div>
                <p>{el.category} </p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.upload_box_btn}>
          <Button
            btnName="Create"
            handleClick={async () => {}}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
