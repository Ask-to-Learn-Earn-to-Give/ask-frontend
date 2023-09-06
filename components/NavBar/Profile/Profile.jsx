import React, { useContext } from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/router";
//INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = ({ currentAccount, userData }) => {
  const router = useRouter();
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <img
          src={userData?.avatarUrl}
          alt="user profile"
          width={50}
          height={50}
          className={Style.profile_account_img}
        />
        {currentAccount && (
          <div className={Style.profile_account_info}>
            <p>{userData.fullName}</p>
            <small>
              {currentAccount.slice(0, 8) + "..." + currentAccount.slice(-4)}
            </small>
          </div>
        )}
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div
            className={Style.profile_menu_one_item}
            onClick={() => router.push(`/profile/${userData._id}`)}
          >
            <FaUserAlt />
            <p>MyProfile</p>
          </div>

          <div
            className={Style.profile_menu_one_item}
            onClick={() => router.push("/account")}
          >
            <FaUserEdit />
            <p>Edit Profile</p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div
            className={Style.profile_menu_one_item}
            onClick={() => router.push("/contactus")}
          >
            <MdHelpCenter />
            <p>Help Center</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
