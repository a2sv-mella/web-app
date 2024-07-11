// import React from "react";
import { FaWpforms, FaRegChartBar } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { SiCrowdsource } from "react-icons/si";
import { BiDonateHeart } from "react-icons/bi";
import { LuWallet } from "react-icons/lu";
import { PiCoinsFill } from "react-icons/pi";
const links = [
  {
    text: "Summary",
    path: ".",
    icon: <FaWpforms />,
  },
  {
    text: "Transactions",
    path: "transactions",
    icon: <FaRegChartBar />,
  },
  {
    text: "Crowdfunding",
    path: "crowd",
    icon: <SiCrowdsource />,
  },
  {
    text: "Donations",
    path: "donations",
    icon: <BiDonateHeart />,
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
