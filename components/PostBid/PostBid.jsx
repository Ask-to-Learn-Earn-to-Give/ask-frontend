import { useContext, useEffect, useState } from "react";
import styles from "./PostBid.module.css";
import { Button } from "../../components/componentsindex";
import formStyle from "../../subPages/CreatePage/Form.module.css";
import image from "../../img";
import Image from "next/image";
import { ProblemSolverContext } from "../../Context/ProblemSolverContext";
import Link from "next/link";
import { useRouter } from "next/router";
const PostBid = ({ id, problemUserAddress }) => {
  const {
    currentAccount,
    userData,
    propData,
    PlaceBid,
    allUser,
    selectedExpert,
    getBidders,
  } = useContext(ProblemSolverContext);
  const [comment, setComment] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [allbidder, setAllbidder] = useState([]);
  const [lookUp, setLookUp] = useState([]);
  const rounter = useRouter();
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
  // useEffect to get all bidders and trigger lookUpData() when allbidder and allUser change
  useEffect(() => {
    async function getAllBidders() {
      const item = await getBidders(id);
      setAllbidder(item);
    }
    setAddress(userData);
    getAllBidders();
  }, [id, getBidders]);

  useEffect(() => {
    const getAllDataSeverS = lookUpData(allbidder, allUser);
    setLookUp(getAllDataSeverS);
  }, [allbidder, allUser]);
  // function to look up expert information on data base
  function lookUpData(A, B) {
    const data = A?.map(({ expert, ...restA }) => {
      const expertAddress = expert.toLowerCase();
      // Check if B exists and is an array
      if (!B || !Array.isArray(B)) {
        return null;
      }
      const matchedUser = B?.find(({ walletAddress }) =>
        walletAddress.toLowerCase().includes(expertAddress)
      );
      if (!matchedUser) {
        return null;
      }
      const { walletAddress, ...restB } = matchedUser;
      return { ...restA, ...restB, expert };
    }).filter((item) => item !== null);
    return data;
  }
  // handle select
  const handleSelected = async (propblemId, bidId, value, roomId) => {
    const selected = await selectedExpert(propblemId, bidId, value);
    if (selected) {
      rounter.push(`/connectRoom/`);
    }
  };

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
        {lookUp?.map((el, index) => (
          <div key={index} className={styles.comment}>
            <div className={styles.showbox_container}>
              <div className={styles.showbox_container_userInfor}>
                <div className={styles.showbox_container_userInfor_box}>
                  <Link
                    href={{
                      pathname: "/profile",
                      query: el.expert,
                    }}
                  >
                    <div className={styles.showbox_container_userInfor_img}>
                      <Image
                        src={el?.images}
                        alt="background image"
                        width={50}
                        height={50}
                        className={styles.showbox_container_userInfor_img_img}
                      />
                    </div>
                  </Link>
                  <div className={styles.showbox_container_userInfor_userName}>
                    <h2>{el?.name}</h2>
                  </div>
                </div>
                <div className={styles.showbox_container_userInfor_price}>
                  <h2>Price</h2>
                  <h3>{el.bidAmount} klay</h3>
                </div>
                {currentAccount &&
                currentAccount.toString().toLowerCase() ===
                  problemUserAddress?.toString().toLowerCase() ? (
                  <div className={styles.showbox_container_userInfor_selecbox}>
                    <div>
                      <Button
                        handleClick={() =>
                          handleSelected(
                            el.problemId,
                            el.bidId,
                            el.bidAmount,
                            el.expert
                          )
                        }
                        className={styles.button}
                        btnName="Select"
                      ></Button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.showbox_container_userInfor_selecbox}>
                    <div>
                      <Button
                        handleClick={() => {}}
                        classStyle={styles.button}
                        btnName="View"
                        disable={true}
                      ></Button>
                    </div>
                  </div>
                )}
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
