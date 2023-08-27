import React, { useContext, useEffect, useState } from "react";
import styles from "./DescriptionDetail.module.css";
import { ProblemSolverContext } from "../../Context/ProblemSolverContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const DescriptionDetail = ({ id }) => {
  const { propData } = useContext(ProblemSolverContext);
  const [postDetail, setPostDetail] = useState();
  const router = useRouter();
  useEffect(() => {
    if (propData) {
      const detail = getDetailById(propData, id);
      setPostDetail(detail);
    }
  }, []);

  function getDetailById(item, _id) {
    return item.find((obj) => obj.id === _id);
  }
  console.log("post detail", postDetail);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{postDetail?.title}</h2>
      </div>
      <div className={styles.body}>
        <h3>{postDetail?.expertDescription}</h3>
      </div>
      {postDetail?.problemImage ? (
        <div className={styles.imageContainer}>
          <Image
            className={styles.image_image}
            src={postDetail?.problemImage}
            alt="Problem image"
            objectFit="contain"
            layout="fill"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DescriptionDetail;
