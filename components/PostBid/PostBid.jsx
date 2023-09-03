import { useContext, useEffect, useState } from "react";
import styles from "./PostBid.module.css";
import { Button } from "../../components/componentsindex";
import formStyle from "../../subPages/CreatePage/Form.module.css";
import image from "../../img";
import Image from "next/image";
import { ProblemSolverContext } from "../../Context/ProblemSolverContext";
import Link from "next/link";
import { useRouter } from "next/router";
import useSocket from "../../hook/useSocket";
import axios from "../../lib/axios";
import { ethers } from "ethers";
const PostBid = ({ problemId }) => {
  const {
    currentAccount,
    userData,
    propData,
    PlaceBid,
    allUser,
    selectedExpert,
    getBidders,
    getProblemById,
  } = useContext(ProblemSolverContext);
  const [comment, setComment] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [bids, setBids] = useState([]);
  const [lookUp, setLookUp] = useState([]);
  const rounter = useRouter();
  const { socket } = useSocket("problem");
  const [problem, setProblem] = useState({});

  const addComment = async () => {
    if (!comment.trim()) return;
    if (!price) return;

    try {
      await PlaceBid(problem.onchainId, price, comment);
      console.log("Place successfully");
    } catch (error) {
      console.log("error while place your price", error);
    }

    setComment("");
    setPrice(0);
  };
  // useEffect to get all bidders and trigger lookUpData() when allbidder and allUser change
  useEffect(() => {
    if (!problemId) return;

    async function fetchData() {
      const bids = await getBidders(problemId);
      const problem = await getProblemById(problemId);

      setBids(bids);
      setProblem(problem);
    }

    setAddress(userData);
    fetchData();
  }, [problemId, getBidders]);

  useEffect(() => {
    if (!socket) return;

    socket.on("problem.bid.created", async ({ problemBidId }) => {
      await axios.post(`/api/problem-bid/${problemBidId}/upload-data`, {
        description: comment,
      });
    });

    return () => socket.off("problem.bid.created");
  }, [socket, comment]);

  // useEffect(() => {
  //   const getAllDataSeverS = lookUpData(allbidder, allUser);
  //   setLookUp(getAllDataSeverS);
  // }, [allbidder, allUser]);
  // // function to look up expert information on data base
  // function lookUpData(A, B) {
  //   const data = A?.map(({ expert, ...restA }) => {
  //     const expertAddress = expert.address.toLowerCase();
  //     // Check if B exists and is an array
  //     if (!B || !Array.isArray(B)) {
  //       return null;
  //     }
  //     const matchedUser = B?.find(({ address }) =>
  //       address.toLowerCase().includes(expertAddress)
  //     );
  //     if (!matchedUser) {
  //       return null;
  //     }
  //     const { address, ...restB } = matchedUser;
  //     return { ...restA, ...restB, expert };
  //   }).filter((item) => item !== null);
  //   return data;
  // }
  // handle select
  const handleSelected = async (
    problemOnchainId,
    problemBidOnchainId,
    value
  ) => {
    console.log(problemOnchainId, problemBidOnchainId, value);
    const selected = await selectedExpert(
      problemOnchainId,
      problemBidOnchainId,
      value
    );
    // if (selected) {
    //   rounter.push(`/connectRoom/`);
    // }
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
        {bids.map((el, index) => (
          <div key={index} className={styles.comment}>
            <div className={styles.showbox_container}>
              <div className={styles.showbox_container_userInfor}>
                <div className={styles.showbox_container_userInfor_box}>
                  <Link
                    href={{
                      pathname: `/user/${el.expert._id}`,
                    }}
                  >
                    <div className={styles.showbox_container_userInfor_img}>
                      <img
                        src={el.expert.avatarUrl}
                        alt="background image"
                        width={50}
                        height={50}
                        className={styles.showbox_container_userInfor_img_img}
                      />
                    </div>
                  </Link>
                  <div className={styles.showbox_container_userInfor_userName}>
                    <h2>{el.expert.fullName}</h2>
                  </div>
                </div>
                <div className={styles.showbox_container_userInfor_price}>
                  <h2>Price</h2>
                  <h3>{ethers.utils.formatUnits(el.amount)} klay</h3>
                </div>
                {currentAccount &&
                currentAccount.toString().toLowerCase() ===
                  problem.author.address?.toString().toLowerCase() ? (
                  <div className={styles.showbox_container_userInfor_selecbox}>
                    <div>
                      <Button
                        handleClick={() =>
                          handleSelected(
                            problem.onchainId,
                            el.onchainId,
                            el.amount,
                            el.expert.address
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
                {el.description}
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
