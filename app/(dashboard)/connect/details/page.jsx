import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

const page = () => {
  return (
    <div className=" w-full bg-slate-50  py-3 md:p-3 2xl:p-4 mb-8">
      <div className=" w-full relative">
        <Image
          src="/group-cover.svg"
          alt="connect"
          width={200}
          height={200}
          className=" w-full h-full"
        />
        <Link
          href={"/connect"}
          className=" p-2 absolute top-5 left-5 rounded-md bg-slate-100"
        >
          <FaArrowLeft className=" " />
        </Link>
        <div className=" p-0.5 py-1.5 absolute top-5 right-5 rounded-lg bg-slate-100">
          <Image src="/menu.svg" alt="connect" width={20} height={20} />
        </div>
        <div className=" p-1.5 absolute top-5 right-16 rounded-md bg-slate-100">
          <Image
            src="/group-members.svg"
            alt="connect"
            width={20}
            height={20}
          />
        </div>
        <div className=" hidden md:block p-4 absolute bottom-5 left-5 rounded-md bg-slate-50  bg-opacity-80">
          <p className="bg-[#38B6FF]/10 text-[#38B6FF] text-xs px-4 w-fit text-center font-semibold  py-1.5 mb-2 rounded-full">
            Category
          </p>
          <h2 className="2xl:text-lg font-bold">
            PUBLIC PRIVATE GROUP NAME HERE
          </h2>{" "}
          <div className="flex items-center gap-4 mt-2">
            <p className="text-xs inline-flex items-center gap-1 2xl:text-sm ">
              <Image src="/globe.svg" alt="live" width={16} height={16} />
              Public
            </p>
            <p className="text-xs inline-flex items-center gap-1 2xl:text-sm ">
              <Image src="/members.svg" alt="live" width={18} height={18} />
              2k Members
            </p>
            <p className="text-xs inline-flex items-center gap-1 2xl:text-sm ">
              Created May 20, 2024{" "}
            </p>
          </div>
        </div>
        <div className=" p-4 md:hidden rounded-md bg-white  bg-opacity-80">
          <p className="bg-[#38B6FF]/10 text-[#38B6FF] text-xs px-4 w-fit text-center font-semibold  py-1.5 mb-2 rounded-full">
            Category
          </p>
          <h2 className="2xl:text-lg font-bold">
            PUBLIC PRIVATE GROUP NAME HERE
          </h2>{" "}
          <div className="flex items-center gap-4 mt-2">
            <p className="text-xs inline-flex items-center gap-1 2xl:text-sm ">
              <Image src="/globe.svg" alt="live" width={16} height={16} />
              Public
            </p>
            <p className="text-xs inline-flex items-center gap-1 2xl:text-sm ">
              <Image src="/members.svg" alt="live" width={18} height={18} />
              2k Members
            </p>
            <p className="text-xs inline-flex items-center gap-1 2xl:text-sm ">
              Created May 20, 2024{" "}
            </p>
          </div>
        </div>
      </div>
      <div className=" my-6 w-full flex items-center justify-center gap-4 flex-col md:flex-row ">
        <button className=" py-4 px-24 w-full md:w-fit justify-center  rounded-full font-semibold text-sm 2xl:text-base bg-[#38B6FF] text-white inline-flex items-center gap-2">
          <Image src="/feed.svg" alt="live" width={23} height={23} />
          <p> Group Feed</p>
        </button>
        <button className=" py-4 px-24 w-full md:w-fit justify-center rounded-full text-sm font-semibold 2xl:text-base border-2 border-[#38B6FF]  inline-flex items-center gap-2">
          <Image src="/alert-black.svg" alt="live" width={23} height={23} />
          <p> About </p>
        </button>
      </div>
      <div className=" w-full bg-white p-4">
        <div className="flex items-center gap-2">
          <Image src="/avatar.svg" alt="live" width={48} height={48} />
          <div className="flex flex-col ">
            <h2 className=" font-bold 2xl:text-lg">Hello Shayan</h2>
            <p className=" text-xs 2xl:text-sm text-slate-500">
              Whats in your mind
            </p>
          </div>
        </div>
        <input
          type="text"
          placeholder=" Write your post here ..."
          id="name"
          className="w-full p-3 my-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-lg"
        />
        <div className=" w-full flex flex-col md:flex-row items-center justify-between gap-2">
          <button className=" border-2 border-slate- gap-2 rounded-lg shadow p-2.5 2xl:p-3 flex items-center justify-center w-full ">
            <Image src="/image.svg" alt="live" width={23} height={23} />
            <p className=" text-xs 2xl:text-sm font-bold"> Add Image/Video</p>
          </button>
          <button className=" border-2 border-slate- gap-2 rounded-lg shadow p-2.5 2xl:p-3 flex items-center justify-center w-full ">
            <Image src="/tag.svg" alt="live" width={19} height={19} />
            <p className=" text-xs 2xl:text-sm font-bold"> Tags</p>
          </button>
          <button className=" border-2 border-slate- gap-2 rounded-lg shadow p-2.5 2xl:p-3 flex items-center justify-center w-full ">
            <Image src="/link-black.svg" alt="live" width={23} height={23} />
            <p className=" text-xs 2xl:text-sm font-bold">Add URL</p>
          </button>
        </div>
      </div>
      <div className=" flex flex-col mx-auto w-fit my-8 bg-white p-7 rounded-lg">
        <div className="flex items-center justify-between w-full border-b mb-4 pb-4">
          <div className="flex items-center gap-2">
            <Image src="/avatar.svg" alt="live" width={48} height={48} />
            <div className="flex flex-col ">
              <h2 className=" font-bold 2xl:text-lg">Shayan</h2>
              <p className=" text-xs 2xl:text-sm text-slate-500">2h ago</p>
            </div>
          </div>{" "}
          <Image
            src={"/watch.svg"}
            width={50}
            alt="live"
            height={50}
            className="cursor-pointer"
          />
        </div>
        <h2 className=" font-bold 2xl:text-lg mb-2">
          Title Goes here, Title Goes here
        </h2>
        <p className="text-xs 2xl:text-sm mb-2 max-w-3xl 2xl:max-w-4xl">
          Join a thriving community of professional and aspiring live streamers
          and creators. Enhance your skills, share your experiences, and grow
          your network.
        </p>
        <div className=" w-full">
          <Image
            alt="live"
            src={"/streaming.svg"}
            width={500}
            height={300}
            className="rounded-lg my-2 w-full h-full"
          />
        </div>
        <div className="flex  items-center justify-between mt-3">
          <div className=" flex gap-1 items-center">
            <p className="bg-[#38B6FF]/15 px-2 py-1 rounded-full text-xs 2xl:text-sm text-[#38B6FF]">
              #tag
            </p>
            <p className="bg-[#38B6FF]/15 px-2 py-1 rounded-full text-xs 2xl:text-sm text-[#38B6FF]">
              #tag
            </p>
            <p className="bg-[#38B6FF]/15 px-2 py-1 rounded-full text-xs 2xl:text-sm text-[#38B6FF]">
              #tag
            </p>
          </div>
          <div className=" flex gap-1 items-center">
            <div className="bg-[#FFDDDD] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
              <Image src="/likes.svg" alt="live" width={20} height={20} />
              <p className="text-xs 2xl:text-sm font-semibold">12</p>
            </div>
            <div className="bg-[#F6F6F6] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
              <Image src="/comment.svg" alt="live" width={22} height={22} />
              <p className="text-xs 2xl:text-sm font-semibold">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
