import React, { useContext, useEffect, useState } from "react";
import styles from "./DescriptionDetail.module.css";
import { ProblemSolverContext } from "../../Context/ProblemSolverContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const DescriptionDetail = ({ id }) => {
  const { propData, getProblemById } = useContext(ProblemSolverContext);
  const [postDetail, setPostDetail] = useState();
  const router = useRouter();
  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);

  const getDetail = async (_id) => {
    const detail = await getProblemById(_id);
    setPostDetail(detail);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{postDetail?.title}</h2>
      </div>
      <div className={styles.body}>
        <h3>{postDetail?.description}</h3>
      </div>
      {postDetail?.image ? (
        <div className={styles.imageContainer}>
          <Image
            className={styles.image_image}
            src={postDetail?.image}
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
