import React, { useContext, useState } from "react";
import Image from "next/image";
import { ProblemSolverContext } from "../../../Context/ProblemSolverContext";
import images from "../../../img";
//INTERNAL IMPORT
import Style from "./PropCard.module.css";
import { LikeProfile } from "../../../components/componentsindex";
import Link from "next/link";
const PropCard = ({ PropData }) => {
  const { userData } = useContext(ProblemSolverContext);
  return (
    <div className={Style.PropCard}>
      {PropData &&
        PropData.map((el, i) => (
          <Link
            href={{
              pathname: `/problems/${el._id}`,
            }}
            key={i + 1}
          >
            <div className={Style.PropCard_box} key={i + 1}>
              <div className={Style.Container}>
                <div className={Style.Container_Top}>
                  <div className={Style.PropCard_box_detail_top}>
                    <div className={Style.PropCard_box_detail_Status}>
                      {el.status === "waiting" ? (
                        <div
                          className={Style.PropCard_box_detail_Status_unsolved}
                        >
                          Unsolved
                        </div>
                      ) : el.status == "onprogress" ? (
                        <div
                          className={Style.PropCard_box_detail_Status_solved}
                        >
                          Solving
                        </div>
                      ) : (
                        <div
                          className={Style.PropCard_box_detail_Status_solved}
                        >
                          Solved
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={Style.PropCard_box_detail_bot}>
                    <div className={Style.PropCard_box_detail_bot_image}>
                      <Image
                        className={Style.PropCard_box_detail_bot_image_img}
                        src={el.image}
                        alt="profile image"
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className={Style.PropCard_box_detail_bot_content}>
                      <div className={Style.PropCard_box_detail_title}>
                        <p>{el.title}</p>
                      </div>
                      <div className={Style.PropCard_box_detail_description}>
                        <p>{el.expertDescription}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={Style.PropCard_box_User}>
                  <div className={Style.PropCard_box_User_img}>
                    {el.images ? (
                      <Image
                        className={Style.PropCard_box_User_img_img}
                        src={el.images}
                        alt="profile image"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <Image
                        className={Style.PropCard_box_User_img_img}
                        src={el.author?.avatarUrl}
                        alt="profile image"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                  <div>
                    <p>Posted by</p>
                  </div>
                  <div>
                    <h4>{el.author?.fullName}</h4>
                  </div>
                  <div>
                    <p>Address</p>
                  </div>
                  <div>
                    <h4>{el.author?.address?.slice(0, 8)}...</h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default PropCard;
