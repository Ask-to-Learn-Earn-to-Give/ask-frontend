import { useContext, useEffect, useState } from "react";
import styles from "./PostBid.module.css";
import { Button } from "../../components/componentsindex";
import formStyle from "../../subPages/CreatePage/Form.module.css";
import image from "../../img";
import Image from "next/image";
import { ProblemSolverContext } from "../../Context/ProblemSolverContext";
import Link from "next/link";
const PostBid = () => {
  const { currentAccount, userData } = useContext(ProblemSolverContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState();
  const userInfo = {
    userName: "test",
    userImg: image.creatorbackground3,
    comment: comment,
    price: price,
    expertAddress: currentAccount,
  };
  const addComment = () => {
    if (!comment.trim()) return;
    if (!price) return;
    setComments([...comments, userInfo]);
    setComment("");
    setPrice(null);
  };
  console.log(comments);
  return (
    <div className={styles.commentBox}>
      <div className={styles.showbox}>
        {comments.map((comment, index) => (
          <div key={index} className={styles.comment}>
            <div className={styles.showbox_container}>
              <div className={styles.showbox_container_userInfor}>
                <div className={styles.showbox_container_userInfor_box}>
                  <div className={styles.showbox_container_userInfor_img}>
                    <Image
                      src={comment.userImg}
                      alt="background image"
                      width={50}
                      height={50}
                      className={styles.showbox_container_userInfor_img_img}
                    />
                  </div>
                  <div className={styles.showbox_container_userInfor_userName}>
                    <h2>{comment.userName}</h2>
                  </div>
                </div>
                <div className={styles.showbox_container_userInfor_price}>
                  <h2>Price</h2>
                  <h3>{comment.price} klay</h3>
                </div>
                <Link href={{ pathname: "/connectRoom", query: comment }}>
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
                {comment.comment}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <br />
        <br />
        <br />
        <h1>Post a bid</h1>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="price">Bid Price</label>
          <p>Input your price to help User solve this problem</p>
          <input
            type="number"
            placeholder="Bid price "
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <p>Write something about yourself to User know who you are</p>
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
        <div className={styles.commentBox_button}>
          <Button
            handleClick={addComment}
            className={styles.button}
            btnName="Submit"
          ></Button>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default PostBid;
