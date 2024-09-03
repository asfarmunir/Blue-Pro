"use client";
import React from "react";
import { IoBookOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Signout from "@/components/shared/modal/Signout";
const LogoutBtn = () => {
  const pathname = usePathname();
  return (
    <div style={{ fontSize: "16px" }} className="pb-5 2xl:pb-8">
      {/* <Link
        className="flex items-center justify-start cursor-pointer font-bold text-xs 2xl:text-base text-pinkColor rounded-md px-4 mt-4"
      >
      </Link> */}
      <Link
        href={"/privacy-policy"}
        className={`flex items-center px-4 text-xs 2xl:text-base py-3 2xl:py-4 text-nowrap  justify-start gap-2 2xl:gap-3 font-semibold rounded-xl   ${
          pathname === "/privacy-policy"
            ? "bg-[#38B6FF] text-white"
            : "hover:bg-slate-50"
        }`}
      >
        <IoBookOutline className="mr-1 text-lg " />
        Privacy Policy
      </Link>

      <Signout />
    </div>
  );
};

export default LogoutBtn;
