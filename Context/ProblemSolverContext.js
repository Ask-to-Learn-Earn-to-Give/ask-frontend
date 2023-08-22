import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";
import useAxios from "../hook/useAxios";
import { toast } from "react-toastify";

// infura register
const projectID = process.env.PROJECT_ID;
const projectSecretKey = process.env.PROJECT_SECRET_KEY;
const subdomain = process.env.SUB_DOMAIN;
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
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );
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
export const ProblemSolverContext = React.createContext();
export const ProblemSolverProvider = ({ children }) => {
  // usestate
  const [currentAccount, setCurrentAccount] = useState("");
  const [userData, setUserData] = useState();
  const { operation: getUserExis, data: news } = useAxios(
    `/api/v1/users?walletAddress=${currentAccount}`,
    "GET"
  );
  const router = useRouter();
  // check if wallet connected
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Install Metamask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
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
  // get current userData in database
  useEffect(() => {
    if (currentAccount) {
      getUserExis().then((response) => {
        setUserData(response?.data.user);
      });
    }
  }, [currentAccount]);

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

  return (
    <ProblemSolverContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        uploadToIPFS,
        currentAccount,
        currentWallet,
      }}
    >
      {children}
    </ProblemSolverContext.Provider>
  );
};
