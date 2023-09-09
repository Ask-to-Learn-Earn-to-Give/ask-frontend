import React, { useContext, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./Form.module.css";
import { Button } from "../../../components/componentsindex";
import useAxios from "../../../hook/useAxios";
import { useForm } from "react-hook-form";
import { ProblemSolverContext } from "../../../Context/ProblemSolverContext";
import axios from "../../../lib/axios";

const Form = ({ fileUrl }) => {
  const { currentAccount, userData } = useContext(ProblemSolverContext);
  const [updateURL, setUpdateURL] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const defaulInput = {
    fullName: "",
    email: "",
    description: "",
    avatarUrl: "",
    address: "",
  };
  const [forms, setForms] = useState(defaulInput);

  // create update user
  const onSubmit = async (data) => {
    await axios.patch("/api/user/common-fields", {
      fullName: data.name,
      email: data.email,
      description: data.description,
      avatarUrl: fileUrl || undefined,
    });

    window.location.href = "/";
  };

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={Style.Form_box_input}>
            <label htmlFor="name">Name</label>
            <input
              placeholder="Your name"
              {...register("name")}
              defaultValue={forms[0]?.fullName}
              className={Style.Form_box_input_userName}
            />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="email">Email</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input
                type="text"
                placeholder="Email*"
                {...register("email")}
                defaultValue={forms[0]?.email}
              />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="something about yourself in few words"
              {...register("description")}
              defaultValue={forms[0]?.description}
            ></textarea>
          </div>

          {/* <div className={Style.Form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>

              <input
                type="text"
                placeholder="website"
                {...register("website")}
                defaultValue={forms[0]?.website}
              />
            </div>
          </div>

          <div className={Style.Form_box_input_social}>
            <div className={Style.Form_box_input}>
              <label htmlFor="facebook">Facebook</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input
                  type="text"
                  placeholder="https://your-facebook.com"
                  {...register("facebook")}
                  defaultValue={forms[0]?.facebook}
                />
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="twitter">Twitter</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialTwitter />
                </div>
                <input
                  type="text"
                  placeholder="https://your-twitter.com"
                  {...register("twitter")}
                  defaultValue={forms[0]?.twitter}
                />
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="instagram">Instagram</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialInstagram />
                </div>
                <input
                  type="text"
                  placeholder="https://your-instagram.com"
                  defaultValue={forms[0]?.instagram}
                  {...register("instagram")}
                />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="wallet">Wallet address</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                placeholder="Your wallet address "
                defaultValue={currentAccount}
                {...register("address")}
                disabled={true}
              />
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineContentCopy />
              </div>
            </div>
          </div> */}
          <div className={Style.Form_box_btn}>
            <Button
              btnName="Upload profile"
              handleClick={() => handleSubmit(onSubmit)}
              type="submit"
              classStyle={Style.button}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
