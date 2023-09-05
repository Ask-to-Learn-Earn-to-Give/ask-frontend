import React from "react";
import Style from "../../../styles/detail.module.css";
import { Banner } from "../../../subPages/collectionPage/collectionIndex";
import images from "../../../img";
import DescriptionDetail from "../../../components/DescriptionDetail/DescriptionDetail";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import PostBid from "../../../components/PostBid/PostBid";
import { useRouter } from "next/router";
const detail = () => {
  const router = useRouter();
  const { problemId } = router.query;

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.background} />
      <div className={Style.back}>
        <Link href={{ pathname: "/problems" }}>
          <p>
            <IoIosArrowBack /> Back
          </p>
        </Link>
        <Link href={{ pathname: "/problems" }}>
          <p>
            Next <IoIosArrowForward />
          </p>
        </Link>
      </div>
      <div className={Style.container}>
        <DescriptionDetail problemId={problemId} />
        <PostBid problemId={problemId} />
      </div>
      <div className={Style.back}>
        <Link href={{ pathname: "/problems" }}>
          <p>
            <IoIosArrowBack /> Back
          </p>
        </Link>
        <Link href={{ pathname: "/problems" }}>
          <p>
            Next <IoIosArrowForward />
          </p>
        </Link>
      </div>
    </div>
  );
};

export default detail;
