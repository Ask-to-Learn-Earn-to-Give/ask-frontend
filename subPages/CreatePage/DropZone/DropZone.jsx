import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

//INTRNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../../img";
import { Spinner } from "../../../components/componentsindex";
const DropZone = ({
  title,
  heading,
  subHeading,
  name,
  description,
  category,
  uploadToIPFS,
  setImage,
  CreateProblem,
}) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFile) => {
    setLoading(true);
    const url = await uploadToIPFS(acceptedFile[0]);
    setLoading(false);

    setFileUrl(url);
    setImage(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });
  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.DropZone_box_input}>
          <p>{title}</p>
          <div className={Style.DropZone_box_input_img}>
            <Image
              src={images.upload}
              alt="upload"
              width={100}
              height={100}
              objectFit="contain"
              className={Style.DropZone_box_input_img_img}
            />
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        fileUrl && (
          <>
            <br />
            <br />
            <h1>Preview your post</h1>
            <aside className={Style.DropZone_box_aside}>
              <div className={Style.DropZone_box_aside_box}>
                <Image src={fileUrl} alt="nft image" width={200} height={200} />

                <div className={Style.DropZone_box_aside_box_preview}>
                  <div className={Style.DropZone_box_aside_box_preview_one}>
                    <p>
                      <span>Title:</span>
                      {name || ""}
                    </p>
                  </div>

                  <div className={Style.DropZone_box_aside_box_preview_two}>
                    <p>
                      <span>Description:</span>
                      {description || ""}
                    </p>
                  </div>

                  <div className={Style.DropZone_box_aside_box_preview_three}>
                    <p>
                      <span>Category</span>
                      {category || ""}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </>
        )
      )}
    </div>
  );
};

export default DropZone;
