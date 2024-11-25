"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiSolidDashboard } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { PiUsersThree } from "react-icons/pi";
import { RiHome5Line } from "react-icons/ri";
import { MdOutlineInventory2 } from "react-icons/md";
import { MdOutlineLiveTv } from "react-icons/md";
import { LiaHandshake } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import Image from "next/image";

export const sidebarTabs = [
  {
    name: "Dashboard",
    icon: <BiSolidDashboard />,
    img: "/dashboard.svg",
    link: "/",
  },
  {
    name: "User Management",
    icon: <PiUsersThree />,
    img: "/user.svg",
    link: "/user",
  },
  {
    name: "Inventory Management",
    icon: <MdOutlineInventory2 />,
    img: "/inventory.svg",
    link: "/inventory",
  },
  {
    name: "Go Live",
    icon: <MdOutlineLiveTv />,
    link: "/live",
    img: "/live.svg",
  },
  {
    name: "Connect Management",
    icon: <LiaHandshake />,
    img: "/live.svg",
    link: "/connect",
  },
  {
    name: "Activity Management",
    icon: <IoSettingsOutline />,
    link: "/activity",
    img: "/setting.svg",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="xl:flex-1 bg-white">
      {sidebarTabs.map((tab, i) => (
        <Link
          key={i}
          href={tab.link}
          className={`flex items-center px-4 text-xs 2xl:text-base py-3 2xl:py-4 text-nowrap mt-1 2xl:mt-1 justify-start gap-2 2xl:gap-3 font-semibold rounded-xl   ${
            pathname === tab.link
              ? "bg-[#38B6FF] text-white"
              : "hover:bg-slate-50"
          }`}
          onClick={() => handleLinkClick("")}
        >
          <Image
            src={tab.img}
            width={20}
            height={20}
            alt="logo"
            className={`object-contain 
            w-5 h-5 2xl:w-6 2xl:h-6
            ${pathname === tab.link ? " invert" : ""}
            `}
          />
          {tab.name}
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;
