import { useContext, useEffect, useState } from "react";
import styles from "./PostBid.module.css";
import { Button } from "../../components/componentsindex";
import formStyle from "../../subPages/CreatePage/Form.module.css";
import image from "../../img";
import Image from "next/image";
import { ProblemSolverContext } from "../../Context/ProblemSolverContext";
import Link from "next/link";
const PostBid = ({ id }) => {
  const {
    currentAccount,
    userData,
    propData,
    PlaceBid,
    allUser,
    getExpertBidId,
    selectedExpert,
    getBidders,
  } = useContext(ProblemSolverContext);
  const [comment, setComment] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [allbidder, setAllbidder] = useState([]);

  // connecting with smart contract
  const placeYourPrice = async () => {
    try {
      await PlaceBid(id, price, comment);
      console.log("Place successfully");
    } catch (error) {
      console.log("error while place your price", error);
    }
  };
  const addComment = () => {
    if (!comment.trim()) return;
    if (!price) return;
    placeYourPrice(id, price, comment);
    setComment("");
    setPrice(0);
  };
  // function get all bidder
  const getAllBidders = async () => {
    const item = await getBidders(id);
    setAllbidder(item);
  };
  useEffect(() => {
    getAllBidders(id);
    getDetailByAddress(allUser,)
  }, []);
  // get detail user by address
  function getDetailByAddress(item, address) {
    return item.find((obj) => obj.walletAddress === address);
  }
  console.log("akk", allbidder);
  console.log("allUser", allUser);
  return (
    <div className={styles.commentBox}>
      <div className={styles.post_bid}>
        <h1>Post your solution</h1>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="price">Bid Price</label>
          <p>Input your price to help User solve this problem</p>
          <input
            type="number"
            placeholder="Bid price "
            className={formStyle.Form_box_input_userName}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <p>Write something about yourself to User know who you are</p>
          <div className={styles.textarea_container}>
            <textarea
              name=""
              id=""
              cols="80"
              rows="6"
              placeholder="Write something about yourself"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className={styles.commentBox_button}>
          <Button
            handleClick={addComment}
            className={styles.button}
            btnName="Submit"
          ></Button>
        </div>
      </div>
      <div className={styles.showbox}>
        {allbidder?.map((el, index) => (
          <div key={index} className={styles.comment}>
            <div className={styles.showbox_container}>
              <div className={styles.showbox_container_userInfor}>
                <div className={styles.showbox_container_userInfor_box}>
                  <div className={styles.showbox_container_userInfor_img}>
                    {/* <Image
                      src={comment.userImg}
                      alt="background image"
                      width={50}
                      height={50}
                      className={styles.showbox_container_userInfor_img_img}
                    /> */}
                  </div>
                  <div className={styles.showbox_container_userInfor_userName}>
                    {/* <h2>{comment.userName}</h2> */}
                  </div>
                </div>
                <div className={styles.showbox_container_userInfor_price}>
                  <h2>Price</h2>
                  <h3>{el.bidAmount} klay</h3>
                </div>
                <Link href={{ pathname: "/connectRoom", query: el }}>
                  <div className={styles.showbox_container_userInfor_selecbox}>
                    <div>
                      <Button
                        handleClick={() => {}}
                        className={styles.button}
                        btnName="Select"
                      ></Button>
                    </div>
                  </div>
                </Link>
              </div>
              <div className={styles.showbox_container_userComment}>
                {el.expertDescription}
              </div>
              <div className={styles.post_date}>
                <p>Post date: 23-8-2023</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostBid;
