// import React from "react";
import {FaMedapps, FaRegChartBar } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { SiCrowdsource } from "react-icons/si";import { LuWallet } from "react-icons/lu";
import { PiCoinsFill } from "react-icons/pi";
const links = [
  {
    text: "Transactions",
    path: ".",
    icon: <FaRegChartBar />,
  },
  {
    text: "Crowdfunding",
    path: "crowd",
    icon: <SiCrowdsource />,
  },
  {
    text: "Product",
    path: "product",
    icon: <FaMedapps />,
  },
  {
    text: "Balance",
    path: "balance",
    icon: <LuWallet />,
  },
  {
    text: "Smuni",
    path: "smuni",
    icon: <PiCoinsFill />,
  },
  {
    text: "Account",
    path: "account",
    icon: <ImProfile />,
  },
];
export default links;
