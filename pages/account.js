import React, { useState, useCallback, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

//INTERNAL IMPORT
import Style from "../styles/account.module.css";
import images from "../img";
import Form from "../subPages/AccountPage/Form/Form";
import { ProblemSolverContext } from "../Context/ProblemSolverContext";

const account = () => {
  const { currentAccount, userData, uploadToIPFS } =
    useContext(ProblemSolverContext);

  const [fileUrl, setFileUrl] = useState(null);
  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });
  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile settings</h1>
        <p>
          You can set preferred display name, create your profile URL and manage
          other personal settings....
        </p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />

          {fileUrl ? (
            <img
              src={fileUrl}
              alt="nft image"
              width={150}
              height={150}
              className={Style.account_box_img_img}
            />
          ) : (
            <img
              src={userData?.avatarUrl}
              alt="account upload"
              width={150}
              height={150}
              className={Style.account_box_img_img}
            />
          )}

          <p className={Style.account_box_img_para}>Change Image</p>
        </div>
        <div className={Style.account_box_from}>
          <Form fileUrl={fileUrl} />
        </div>
      </div>
    </div>
  );
};

export default account;
