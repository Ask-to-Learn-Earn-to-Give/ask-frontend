import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import axios, { addTokenToAxios } from "../lib/axios";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";
import {
  ProblemSolverAddress,
  ProblemSolverABI,
  mintNftAddress,
  mintNftABI,
} from "./constants";
import useAxios from "../hook/useAxios";
import { toast } from "react-toastify";

// infura register
const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;
const baobab = process.env.NEXT_PUBLIC_BAO_BAB;
const projectSecretKey = process.env.NEXT_PUBLIC_PROJECT_SECRET_KEY;
const subdomain = process.env.NEXT_PUBLIC_SUB_DOMAIN;
const auth = `Basic ${Buffer.from(`${projectID}:${projectSecretKey}`).toString(
  "base64"
)}`;
const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: "5001",
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
// fetch smart contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ProblemSolverAddress, ProblemSolverABI, signerOrProvider);
const fetchContractMint = (signerOrProvider) =>
  new ethers.Contract(mintNftAddress, mintNftABI, signerOrProvider);
//  connecting with smart contract
const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    toast.error("Something went wrong while connecting with contract");
  }
};
const connectingWithSmartContractMint = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContractMint(signer);
    return contract;
  } catch (error) {
    toast.error("Something went wrong while connecting with contract");
  }
};
export const ProblemSolverContext = React.createContext();
export const ProblemSolverProvider = ({ children }) => {
  // usestate
  const [currentAccount, setCurrentAccount] = useState("");
  const [userData, setUserData] = useState();
  const [data, setData] = useState([]);
  const [allUser, setAllUser] = useState("");
  const [propData, setPropData] = useState([]);
  const { operation: getAllUser, data: get } = useAxios(`/api/user`, "GET");
  const router = useRouter();
  // check if wallet connected
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Install Metamask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        if (localStorage.getItem("token")) {
          addTokenToAxios();
          setCurrentAccount(accounts[0]);
        }
      } else {
        localStorage.removeItem("token");
        console.log("No account found");
      }
    } catch (error) {
      toast.error("Something wrong while connecting to wallet");
    }
  };
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  // connect wallet function

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install Metamask");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const {
        data: { nonce },
      } = await axios.post("/api/auth/wallet", {
        address: accounts[0],
      });

      const signedNonce = await window.ethereum.request({
        method: "personal_sign",
        params: [
          `0x${Buffer.from(nonce, "utf8").toString("hex")}`,
          accounts[0],
        ],
        from: accounts[0],
      });

      const {
        data: { token },
        statusText,
      } = await axios.post("/api/auth/verify-wallet", {
        address: accounts[0],
        signedNonce: signedNonce,
      });

      localStorage.setItem("token", token);
      addTokenToAxios();
      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      toast.error("Error while connecting to wallet");
    }
  };
  // set current wallet
  const currentWallet = async () => {
    if (typeof window !== "undefined") {
      // await window.ethereum.enable();
      window.ethereum.on("accountsChanged", function (accounts) {
        setCurrentAccount(accounts[0]);
        // check user exists or not by current wallet.
      });
    }
  };
  useEffect(() => {
    currentWallet();
  }, []);
  //----------------------------------------------------
  // get current userData in database
  useEffect(() => {
    if (!currentAccount) return;

    const getUser = async () => {
      const res = await axios.get(`/api/user?address=${currentAccount}`);
      const { user } = res.data;
      setUserData(user);
    };

    getUser();
  }, [currentAccount]);

  // fetch all data from database
  useEffect(() => {
    getAllUser().then(({ users }) => {
      setAllUser(users);
    });
  }, []);
  // fetch all data from blockchain
  useEffect(() => {
    fetchAllProblems().then((item) => {
      setData(item);
    });
  }, []);
  useEffect(() => {
    if (allUser && data) {
      const updateData = mergeArrays(data, allUser);
      setPropData(updateData);
    }
  }, [allUser, data]);
  // set mapping with db with blockchain.
  // problemUserAddress address
  function mergeArrays(arr1, arr2) {
    const map = new Map(arr2.map((obj) => [obj.address, obj]));
    const merged = arr1.map((obj1) => {
      const obj2 = map.get(obj1.address);
      if (!obj2)
        return {
          ...obj1,
          description: "",
          email: "",
          facebook: "",
          images: "",
          instagram: "",
          name: "",
          twitter: "",
          website: "",
        };
      return { ...obj1, ...obj2 };
    });
    return merged;
  }

  //----------------------------------------------------
  // upload to ipfs function
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      toast.error("Error uploading to IPFS");
    }
  };
  // -----------------------------------PROBLEMSOLVER ------------------------
  // -----------------------------------PROBLEMSOLVER ------------------------
  // -----------------------------------PROBLEMSOLVER ------------------------

  // smart contract function
  // create problem
  const CreateProblem = async (title, image, description) => {
    if (!title || !description) console.log("data missing");
    try {
      const contract = await connectingWithSmartContract();
      const transaction = await contract.createProblem(
        title,
        image,
        description
      );
      await transaction.wait();
    } catch (error) {
      console.log("error", error);
    }
  };
  // fetch problem
  const fetchAllProblems = async () => {
    const res = await axios.get("/api/problem?limit=100&skip=0");
    const { problems } = res.data;

    return problems;
    // try {
    //   const provider = new ethers.providers.JsonRpcProvider(baobab);
    //   const contract = fetchContract(provider);
    //   const data = await contract.getAllProblems();
    //   const items = await Promise.all(
    //     data.map(
    //       async ({
    //         id,
    //         title,
    //         image,
    //         description,
    //         user,
    //         selectedExpert,
    //         cost,
    //         solved,
    //         markedAsSolved,
    //         selecting,
    //       }) => {
    //         return {
    //           id: id.toString(),
    //           title,
    //           problemImage: image,
    //           expertDescription: description,
    //           address: user,
    //           selectedExpert,
    //           cost: cost.toString(),
    //           solved,
    //           markedAsSolved,
    //           selecting,
    //         };
    //       }
    //     )
    //   );
    //   return items;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // place a bid price
  const PlaceBid = async (problemId, amount, comment) => {
    if (!problemId || !amount || !comment) console.log("data missing");
    try {
      const contract = await connectingWithSmartContract();
      const bidAmount = ethers.utils.parseUnits(amount.toString(), "ether");
      const transaction = await contract.placeBid(
        problemId,
        bidAmount,
        comment
      );
      await transaction.wait();
      console.log("Place your bid successfully");
    } catch (error) {
      console.log("error", error);
    }
  };
  // get exert id
  const getExpertBidId = async (problemId, _expert) => {
    if (!problemId || !_expert) console.log("data missing");
    try {
      const contract = await connectingWithSmartContract();
      const transaction = await contract.getExpertBidId(problemId, _expert);
      await transaction.wait();
      console.log("Get Bid Id  successfully");
    } catch (error) {
      console.log("error", error);
    }
  };
  // function selected expert
  const selectedExpert = async (
    problemOnchainId,
    problemBidOnchainId,
    value
  ) => {
    try {
      const contract = await connectingWithSmartContract();
      const transaction = await contract.selectExpert(
        problemOnchainId,
        problemBidOnchainId,
        {
          value: value,
        }
      );
      await transaction.wait();
      console.log("Selected expert successfully");
      return true;
    } catch (error) {
      console.log("error", error);
    }
  };
  // function get all bidder
  const getProblemById = async (problemId) => {
    const res = await axios.get(`/api/problem/${problemId}`);
    const { problem } = res.data;
    return problem;
  };
  // function get all bidder
  const getBidders = async (problemId) => {
    const res = await axios.get(`/api/problem/${problemId}/bid`);
    const { problemBids } = res.data;
    return problemBids;
    // if (!problemId) console.log("data missing");
    // try {
    //   const contract = await connectingWithSmartContract();
    //   const data = await contract.getBids(problemId);
    //   const items = await Promise.all(
    //     data.map(
    //       async ({
    //         bidId,
    //         problemId,
    //         expert,
    //         bidAmount,
    //         expertDescription,
    //       }) => {
    //         return {
    //           bidId: bidId.toString(),
    //           problemId: problemId.toString(),
    //           expert,
    //           bidAmount: ethers.utils.formatUnits(
    //             bidAmount.toString(),
    //             "ether"
    //           ),
    //           expertDescription,
    //         };
    //       }
    //     )
    //   );
    //   return items;
    // } catch (error) {
    //   console.log("error", error);
    // }
  };
  const solvedProblem = async (_problemId, _expert) => {
    try {
      const contract = await connectingWithSmartContract();
      const transaction = await contract.solvedProblem(_problemId, _expert);
      await transaction.wait();
      console.log("Solved Problem successfully");
      return true;
    } catch (error) {
      console.log("error", error);
    }
  };
  const unSolvedProblem = async (_problemId) => {
    try {
      const contract = await connectingWithSmartContract();
      const transaction = await contract.unSolvedProblem(_problemId);
      await transaction.wait();
      console.log("Solved Problem successfully");
      return true;
    } catch (error) {
      console.log("error", error);
    }
  };

  // -----------------------------------MINT NFT ------------------------
  // -----------------------------------MINT NFT ------------------------
  // -----------------------------------MINT NFT ------------------------
  const mintNft = async (count, name, image, price, key) => {
    if (!count || !name || !image || !price || !key)
      console.log("data missing");
    const data = JSON.stringify({ name, image, price, key });
    try {
      const added = await client.add(data);
      const tokenURI = `${subdomain}/ipfs/${added.path}`;
      const contract = await connectingWithSmartContractMint();
      const transaction = await contract.mintNFT(count, tokenURI);
      await transaction.wait();
    } catch (error) {
      console.log("error", error);
    }
  };
  const getNftInfo = async (tokenId) => {
    if (!tokenId) console.log("data missing");
    try {
      const contract = await connectingWithSmartContractMint();
      const transaction = await contract.getNFTInfo(tokenId);
      await transaction.wait();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ProblemSolverContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        uploadToIPFS,
        currentAccount,
        currentWallet,
        CreateProblem,
        fetchAllProblems,
        PlaceBid,
        getExpertBidId,
        selectedExpert,
        getBidders,
        userData,
        data,
        allUser,
        propData,
        getProblemById,
        mintNft,
        getNftInfo,
        solvedProblem,
        unSolvedProblem,
      }}
    >
      {children}
    </ProblemSolverContext.Provider>
  );
};
