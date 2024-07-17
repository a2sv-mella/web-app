// import React from "react";
import { FaMedapps, FaRegChartBar } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { SiCrowdsource } from "react-icons/si";
import { LuWallet } from "react-icons/lu";
import { PiCoinsFill } from "react-icons/pi";
const links = [
  {
    text: "Account",
    path: ".",
    icon: <ImProfile />,
  },
  {
    text: "Transactions",
    path: "transactions",
    icon: <FaRegChartBar />,
  },
  {
    text: "Crowdfunding",
    path: "developer-crowd",
    icon: <SiCrowdsource />,
  },
  {
    text: "Campaigns",
    path: "user-crowd",
    icon: <SiCrowdsource />,
  },
  {
    text: "Product",
    path: "product",
    icon: <FaMedapps />,
  },
  {
    text: "Smuni",
    path: "smuni",
    icon: <PiCoinsFill />,
  },
  {
    text: "Shares",
    path: "shares",
    icon: <LuWallet />,
  },
];
export default links;
