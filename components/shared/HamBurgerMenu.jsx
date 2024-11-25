"use client";
import { useState } from "react";
import Image from "next/image";
import { BiSolidDashboard } from "react-icons/bi";
import { MdPersonSearch } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";
import { IoMdHelpCircle } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarTabs } from "./Sidebar";
import LogoutBtn from "./LogoutBtn";

const HamBurgerMenu = () => {
  const [isSidebarVisible, setSidebarVisibility] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const router = useRouter();
  const logout = async () => {
    await doSignOut();
    router.push("/auth/login");
  };

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 pointer-events:none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <div>
                <div>
                  <div className="flex items-center justify-start px-4  mb-12">
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
                  <LogoutBtn />
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default HamBurgerMenu;
