import Search from "@/components/shared/Search";
import React from "react";
import Image from "next/image";
import Sidebar from "@/components/shared/Sidebar";
import LogoutBtn from "@/components/shared/LogoutBtn";
import HamBurgerMenu from "@/components/shared/HamBurgerMenu";
import NotificationBadge from "@/components/shared/navbar/NotificationBadge";
import { MdLanguage } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Navbar from "@/components/shared/Navbar";

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
{/*           
          <div className=" mb-4">

          <Search />
          </div> */}

      
            <Sidebar />
            <LogoutBtn />
        </div>

        {/* <!-- Main content --> */}
        <div className="flex flex-col  md:w-[80%] h-screen overflow-hidden ">
          <Navbar/>
          <div className="p-4  overflow-y-auto pb-8 min-h-screen z-50 bg-[#FAFCFF] border-l border-t">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
