import React, { useState } from "react";
import Image from "next/image";
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./AuthorTabs.module.css";

const AuthorTaps = ({ isListed, isMyNft, setIsListed, setIsMyNft }) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState("Most Recent");
  const listArray = [
    "Created By Admin",
    "Most Appreciated",
    "Most Discussed",
    "Most Viewed",
  ];

  const openDropDownList = () => {
    if (!openList) {
      setOpenList(true);
    } else {
      setOpenList(false);
    }
  };

  const openTab = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Listed NFT") {
      setIsListed(true);
      setIsMyNft(false);
      setActiveBtn(1);
    } else if (btnText == "Own NFT") {
      setIsListed(false);
      setIsMyNft(true);
      setActiveBtn(2);
    }
  };

  return (
    <div className={Style.AuthorTaps}>
      <div className={Style.AuthorTaps_box}>
        <div className={Style.AuthorTaps_box_left}>
          <div className={Style.AuthorTaps_box_left_btn}>
            <button
              className={`${activeBtn == 1 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Listed NFT
            </button>
            <button
              className={`${activeBtn == 2 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Own NFT
            </button>
          </div>
        </div>

        <div className={Style.AuthorTaps_box_right}>
          <div
            className={Style.AuthorTaps_box_right_para}
            onClick={() => openDropDownList()}
          >
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {openList && (
            <div className={Style.AuthorTaps_box_right_list}>
              {listArray.map((el, i) => (
                <div
                  key={i + 1}
                  onClick={() => setSelectedMenu(el)}
                  className={Style.AuthorTaps_box_right_list_item}
                >
                  <p>{el}</p>
                  <span>{selectedMenu == el && <TiTick />}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorTaps;
