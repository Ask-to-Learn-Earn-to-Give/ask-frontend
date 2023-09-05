import React, { useContext, useEffect, useRef, useState } from "react";
import Style from "../../../styles/problems.module.css";
import { Banner } from "../../../subPages/collectionPage/collectionIndex";
import images from "../../../img";
import { ProblemSolverContext } from "../../../Context/ProblemSolverContext";
import ChatUi from "../../../components/ChatUi/ChatUi";
import styles from "../../../styles/connectRoom.module.css";
import UloadNFT from "../../../components/UploadNFT/UploadNFT";
import useSocket from "../../../hook/useSocket";
import { useRouter } from "next/router";
import axios from "../../../lib/axios";
const ConnectRoom = () => {
  const { uploadToIPFS } = useContext(ProblemSolverContext);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const handleUpload = async () => {
    const data = {
      userName: "test",
      userImg: "asda",
      comment: "commdasent",
      price: "price",
      expertAddress: "currentAccount",
    };
    const url = await uploadToIPFS(JSON.stringify(data));
    setUploadedUrl(url);
  };

  const { socket } = useSocket("chat");
  const router = useRouter();
  const { problemId } = router.query;

  const [problem, setProblem] = useState(null);
  const [chatGroup, setChatGroup] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (message) => {
    socket.emit("chat.user.send_message", {
      chatGroupId: problem.chatGroupId,
      content: message,
    });
  };

  useEffect(() => {
    if (!problemId) return;
    if (!socket) return;

    async function fetchData() {
      const { problem } = (await axios.get(`/api/problem/${problemId}`)).data;
      const { chatGroup } = (
        await axios.get(`/api/chat/${problem.chatGroupId}`)
      ).data;
      const { messages } = (
        await axios.get(
          `/api/chat/${problem.chatGroupId}/messages?skip=0&limit=1024`
        )
      ).data;

      setProblem(problem);
      setChatGroup(chatGroup);
      setMessages(messages);

      socket.emit("chat.user.join", { chatGroupId: problem.chatGroupId });
    }

    fetchData();

    socket.on("chat.message.created", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off("chat.message.created");
    };
  }, [problemId, socket]);

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.background} />
      <div className={styles.Container}>
        <div>
          <h1>Connected Room</h1>
          <ChatUi
            chatGroup={chatGroup}
            messages={messages}
            handleSubmit={handleSubmit}
          />
        </div>
        <div>
          <h1>Create NFT</h1>
          <UloadNFT />
        </div>
      </div>
    </div>
  );
};
export default ConnectRoom;
