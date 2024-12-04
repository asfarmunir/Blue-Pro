"use client";
import React from "react";
import HamBurgerMenu from "./HamBurgerMenu";
import { MdLanguage } from "react-icons/md";
import NotificationBadge from "./navbar/NotificationBadge";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-16 bg-white md:px-2 2xl:px-10 py-5 2xl:py-8">
      <div className="flex md:opacity-0 items-center px-4">
        <HamBurgerMenu />
      </div>
      <div className="flex items-center pr-4 text-black space-x-5">
        {/* <NotificationBadge /> */}
        <div className="flex space-x-1 text-sm px-3 2xl:text-base 2xl:px-4 items-center bg-[#F2F2F2] rounded-full p-2">
          <MdLanguage className=" text-lg 2xl:text-xl" />
          <div>EN</div>
          <div className="text-slate-300">|</div>
          <div>USD</div>
        </div>
        <div className="flex border-2 border-black rounded-full p-0.5 justify-center items-center space-x-2">
          <Image
            src={"/profile.svg"}
            width={32}
            height={32}
            className="
                  w-6 h-6
                  "
            alt="profile"
          />
          {/* <IoIosArrowDown
            className="
                text-lg 2xl:text-xl"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
