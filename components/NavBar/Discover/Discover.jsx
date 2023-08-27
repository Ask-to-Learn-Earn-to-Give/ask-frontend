import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = ({ currentAccount }) => {
  //--------DISCOVER NAVIGATION MENU
  const router = useRouter();
  const discover = [
    {
      name: "Discovery",
      link: "searchPage",
      protect: "searchPage",
    },
    {
      name: "Your Profile",
      link: "profile",
      protect: "connectWallet",
    },
    {
      name: "Create Question",
      link: "create",
      protect: "connectWallet",
    },
    {
      name: "Account Setting",
      link: "account",
      protect: "connectWallet",
    },

    {
      name: "Connect Wallet",
      link: "connectWallet",
      protect: "connectWallet",
    },
  ];

  return (
    <div>
      {discover.map((el, i) => (
        <div key={i + 1} className={Style.discover}>
          {currentAccount ? (
            <div onClick={() => router.push(`${el.link}`)}>{el.name}</div>
          ) : (
            <div onClick={() => router.push(`${el.protect}`)}>{el.name}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Discover;
