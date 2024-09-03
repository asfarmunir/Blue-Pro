import Search from "@/components/shared/Search";
import React from "react";
import Image from "next/image";
import Sidebar from "@/components/shared/Sidebar";
import LogoutBtn from "@/components/shared/LogoutBtn";
import HamBurgerMenu from "@/components/shared/HamBurgerMenu";
import NotificationBadge from "@/components/shared/navbar/NotificationBadge";
import { MdLanguage } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <div className="flex h-[100vh] font-mulish ">
        {/* <!-- sidebar --> */}
        <div className="hidden md:flex flex-col  shadow w-[20%] bg-white text-sm  z-10 h-full px-4 2xl:px-6 overflow-y-auto">
          <div className="w-full flex justify-center items-center ">
            <Image
              src={`/logo.svg`}
              width={90}
              height={90}
              alt="logo"
              className="
              w-18 h-18
              2xl:w-28 2xl:h-28
              "
            />
          </div>
          
          <div className=" mb-4">

          <Search />
          </div>

      
            <Sidebar />
            <LogoutBtn />
        </div>

        {/* <!-- Main content --> */}
        <div className="flex flex-col  md:w-[80%] h-screen overflow-hidden ">
          <div className="flex items-center justify-between h-16 bg-white md:px-2 2xl:px-10 py-5 2xl:py-8">
            <div className="flex items-center px-4">
              <HamBurgerMenu />
            </div>
            <div className="flex items-center pr-4 text-black space-x-5">
              <NotificationBadge />
              <div className="flex space-x-1 text-sm px-3 2xl:text-base 2xl:px-4 items-center bg-[#F2F2F2] rounded-full p-2">
                <MdLanguage 
                className=" text-lg 2xl:text-xl" />
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
                <IoIosArrowDown className="
                text-lg 2xl:text-xl" />
              </div>
            </div>
          </div>
          <div className="p-4  overflow-y-auto pb-8 min-h-screen z-50 bg-[#FAFCFF] border-l border-t">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
