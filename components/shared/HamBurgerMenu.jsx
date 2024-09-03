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

const HamBurgerMenu = () => {
  const [isSidebarVisible, setSidebarVisibility] = useState(false);
  const [activeLink, setActiveLink] = useState("");

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
      <button
        onClick={toggleSidebar}
        className="md:hidden text-gray-500 hover:text-blue focus:outline-none focus:text-gray-700"
      >
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
      </button>
      {isSidebarVisible && (
        <div
          className="fixed top-0 left-0 h-screen md:hidden"
          style={{
            zIndex: 1,
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className={
              isSidebarVisible
                ? "flex flex-col w-64 bg-white h-full"
                : "hidden md:flex flex-col w-64 bg-white"
            }
          >
            <div className="p-3 w-full flex justify-end">
              <button onClick={() => setSidebarVisibility(false)}>
                <AiOutlineClose size={24} />
              </button>
            </div>
            <div className="flex items-center justify-start px-4 mx-4 h-20">
              <Image
                src={`/users-group-two-rounded_svgrepo.com.svg`}
                width={30}
                height={30}
                alt="logo"
                className="ml-1"
              />
              <span className="font-bold uppercase ml-2 text-black">
                Employment
              </span>
            </div>
            <div
              className="flex flex-col flex-1 overflow-y-auto h-full"
              style={{ fontSize: "15px" }}
            >
              <nav className="flex-1 px-2 py-4 bg-white">
                <Link
                  href="/"
                  className={`flex items-center justify-start px-4 py-2 text-lightGray rounded-md py-3 my-4 mx-4 hover:bg-pinkBackground hover:text-pinkColor focus:bg-pinkBackground focus:text-pinkColor ${
                    activeLink === "dashboard"
                      ? "bg-pinkBackground text-pinkColor"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("dashboard")}
                >
                  <BiSolidDashboard className="text-2xl mr-3" />
                  Dashboard
                </Link>
                <Link
                  href="/job-seekers"
                  className={`flex items-center justify-start px-4 py-2 text-lightGray rounded-md py-3 my-4 mx-4 hover:bg-pinkBackground hover:text-pinkColor focus:bg-pinkBackground focus:text-pinkColor ${
                    activeLink === "job-seekers"
                      ? "bg-pinkBackground text-pinkColor"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("job-seekers")}
                >
                  <MdPersonSearch className="text-2xl mr-3" />
                  Job Seekers
                </Link>
                <Link
                  href="/sponsors"
                  className={`flex items-center justify-start px-4 py-2 text-lightGray rounded-md py-3 my-4 mx-4 hover:bg-pinkBackground hover:text-pinkColor focus:bg-pinkBackground focus:text-pinkColor ${
                    activeLink === "sponsors"
                      ? "bg-pinkBackground text-pinkColor"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("sponsors")}
                >
                  <FaHandshakeSimple className="text-2xl mr-3" />
                  Sponsors
                </Link>
                <hr className="mx-4" />
                <Link
                  href="/"
                  className={`flex items-center justify-start px-4 py-2 text-lightGray rounded-md py-3 my-4 mx-4 hover:bg-pinkBackground hover:text-pinkColor focus:bg-pinkBackground focus:text-pinkColor ${
                    activeLink === "help"
                      ? "bg-pinkBackground text-pinkColor"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("dashboard")}
                >
                  <IoMdHelpCircle className="text-2xl mr-3" />
                  Help
                </Link>
              </nav>
              <div
                className="flex items-center justify-start px-4 py-2 text-pinkColor rounded-md my-16 py-3 mx-4 ml-7 hover:bg-pinkBackground hover:text-pinkColor focus:bg-pinkBackground focus:text-pinkColor"
                onClick={logout}
              >
                <IoArrowBack className="mr-3 " />
                Logout
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HamBurgerMenu;
