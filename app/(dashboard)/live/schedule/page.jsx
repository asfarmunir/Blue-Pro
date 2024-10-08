import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoArrowDown } from "react-icons/io5";

const page = () => {
  return (
    <div className=" w-full p-3 2xl:p-4 space-y-4 bg-slate-50 pb-16">
      <Link href={"/live"} className="flex items-center gap-2">
        <FaArrowLeftLong className="text-xl" />
        <div className="text-lg font-semibold">Back </div>
      </Link>
      <h3 className=" text-xl 2xl:text-2xl font-bold ">Schedule Session</h3>

      <div className=" w-full flex-col md:flex-row flex gap-5 mt-8">
        <div className=" bg-white rounded-md shadow w-full md:w-[60%] p-6">
          <div className="flex items-center justify-between w-full border-b mb-4 pb-4">
            <h2 className=" text-lg font-bold 2xl:text-xl">Live Preview</h2>
            <Image
              src={"/watch.svg"}
              width={50}
              alt="live"
              height={50}
              className="cursor-pointer"
            />
          </div>
          <h2 className=" font-bold">Title Goes here, Title Goes here</h2>
          <p className="text-xs 2xl:text-sm mb-2">
            Join a thriving community of professional and aspiring live
            streamers and creators. Enhance your skills, share your experiences,
            and grow your network.
          </p>
          <div className="bg-[#007AFF]/15 w-fit text-xs 2xl:text-sm  rounded-full px-3 py-1.5 gap-2 inline-flex items-center">
            <Image src="/link.svg" alt="live" width={15} height={15} />
            www.facebook.com
          </div>
          <div className=" w-full">
            <Image
              alt="live"
              src={"/streaming.svg"}
              width={500}
              height={300}
              className="rounded-md mt-4"
            />
          </div>
          <div className="flex  items-center justify-between my-3">
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
                <Image
                  src="/like-empty.svg"
                  alt="live"
                  width={20}
                  height={20}
                />
                <p className="text-xs 2xl:text-sm font-semibold">0</p>
              </div>
              <div className="bg-[#F6F6F6] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
                <Image src="/comment.svg" alt="live" width={22} height={22} />
                <p className="text-xs 2xl:text-sm font-semibold">0</p>
              </div>
            </div>
          </div>
          <div className="my-2">
            <h2 className="flex items-center gap-2 mb-4 font-bold 2xl:text-lg">
              Comments
              <IoArrowDown className="text-lg" />
            </h2>
            <div className=" w-full h-48 flex-col flex items-center justify-center">
              <Image src="/alert.svg" width={56} height={56} alt="profile" />
              <h2 className=" 2xl:text-lg font-bold">No comments yet</h2>
            </div>
            <div className=" w-full flex bg-[#38B6FF]/15 p-2 px-3  rounded-xl  items-center  justify-between mb-2 gap-4">
              <div className="flex items-center gap-1.5">
                <Image
                  src="/avatar-blue.svg"
                  width={46}
                  height={46}
                  alt="profile"
                  className="rounded-full"
                />
                <input
                  type="text"
                  className=" border-none bg-transparent text-slate-600"
                  placeholder="Add a comment"
                />
              </div>
              <Image
                src="/export.svg"
                width={20}
                height={20}
                alt="like"
                className="cursor-pointer invert"
              />
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-md shadow w-full h-fit md:w-[40%] p-6">
          <h2 className="text-lg 2xl:text-xl font-bold">Session Details</h2>
          <div className="flex flex-col gap-1 my-3 w-full">
            <label
              htmlFor="name"
              className="text-sm font-semibold 2xl:text-base"
            >
              Live Session Title
            </label>
            <input
              type="text"
              placeholder="title"
              id="name"
              className="w-full p-4 bg-[#38B6FF]/10 text-xs rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1 my-3 w-full">
            <label
              htmlFor="tag"
              className="text-sm font-semibold 2xl:text-base"
            >
              Tags
            </label>
            <input
              type="text"
              placeholder="#tag"
              id="tag"
              className="w-full p-4 bg-[#38B6FF]/10 text-xs rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1 my-3 w-full">
            <label
              htmlFor="tag"
              className="text-sm font-semibold 2xl:text-base"
            >
              External URL
            </label>
            <input
              type="text"
              placeholder="www.facebook.com"
              id="tag"
              className="w-full p-4 bg-[#38B6FF]/10 text-xs rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1 my-3 w-full">
            <label
              htmlFor="tag"
              className="text-sm font-semibold 2xl:text-base"
            >
              Description
            </label>
            <Textarea
              placeholder="Enter Event Description here"
              className="w-full p-4 bg-[#38B6FF]/10 text-xs h-28 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1 my-3 w-full">
            <label
              htmlFor="tag"
              className="text-sm font-semibold 2xl:text-base"
            >
              Upload Thumbnail
            </label>
            <input
              type="file"
              id="tag"
              className="w-full p-4 bg-[#38B6FF]/10 text-xs rounded-lg"
            />
          </div>
          <button className=" bg-[#38B6FF] w-full my-3 p-3 text-white font-bold rounded-lg">
            Schedule Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
