"use client";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoArrowDown } from "react-icons/io5";
import { toast } from "react-toastify";
import {
  createIngress,
  getStreamById,
  getUserStream,
  updateStreamStatus,
} from "@/database/actions/stream.action";
import { useSession } from "next-auth/react";
import StreamPlayer from "@/components/shared/StreamPlayer";
import { Loader } from "lucide-react";
import { VscCopy } from "react-icons/vsc";
import { useRouter } from "next/navigation";

const Page = () => {
  return (
    <div className=" w-full p-3 2xl:p-4 space-y-4 bg-slate-50 pb-16">
      <Link href={"/feed-learn"} className="flex items-center gap-2">
        <FaArrowLeftLong className="text-xl" />
        <div className="text-lg font-semibold">Back </div>
      </Link>
      <h3 className=" text-xl 2xl:text-2xl font-bold ">View Details</h3>

      <div className=" w-full flex-col md:flex-row flex gap-5 mt-8 pb-10">
        <div className=" bg-white rounded-md shadow w-full md:w-[60%] p-6">
          <div className="flex items-center justify-between w-full border-b mb-4 pb-4">
            <h2 className=" text-lg font-bold 2xl:text-xl">Post Preview</h2>
          </div>
          <h2 className=" font-bold mb-2 2xl:text-lg">lelele</h2>
          <p className="text-xs 2xl:text-sm mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            unde{" "}
          </p>
          <div className=" w-full py-4 rounded-[10px]">
            <Image
              src="/streaming.svg"
              alt="post"
              className=" w-full h-full"
              width={400}
              height={400}
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
        <div className=" bg-white rounded-md shadow w-full h-fit md:w-[40%] p-6">
          <div className="my-2">
            <h2 className="flex items-center gap-2 mb-4 font-bold 2xl:text-lg">
              Comments
              <IoArrowDown className="text-lg" />
            </h2>
            <div className=" w-full flex  items-start  justify-between mb-2 gap-4">
              <div className="flex items-center gap-1.5">
                <Image
                  src="/avatar.svg"
                  width={56}
                  height={56}
                  alt="profile"
                  className="rounded-full"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs 2xl:text-sm ">
                    lorem ipsem is a dummy text, that is used for comments, t,
                    that is used for comments
                  </p>
                  <span className="text-xs 2xl:textsm text-slate-600">
                    10:20 pm
                  </span>
                </div>
              </div>
              <Image
                src="/menu.svg"
                width={20}
                height={20}
                alt="like"
                className="cursor-pointer"
              />
            </div>
            <div className=" w-full flex  items-start  justify-between mb-2 gap-4">
              <div className="flex items-center gap-1.5">
                <Image
                  src="/avatar.svg"
                  width={56}
                  height={56}
                  alt="profile"
                  className="rounded-full"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs 2xl:text-sm ">
                    lorem ipsem is a dummy text, that is used for comments, t,
                    that is used for comments
                  </p>
                  <span className="text-xs 2xl:textsm text-slate-600">
                    10:20 pm
                  </span>
                </div>
              </div>
              <Image
                src="/menu.svg"
                width={20}
                height={20}
                alt="like"
                className="cursor-pointer"
              />
            </div>
            <div className=" w-full flex  items-start  justify-between mb-2 gap-4">
              <div className="flex items-center gap-1.5">
                <Image
                  src="/avatar.svg"
                  width={56}
                  height={56}
                  alt="profile"
                  className="rounded-full"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs 2xl:text-sm ">
                    lorem ipsem is a dummy text, that is used for comments, t,
                    that is used for comments
                  </p>
                  <span className="text-xs 2xl:textsm text-slate-600">
                    10:20 pm
                  </span>
                </div>
              </div>
              <Image
                src="/menu.svg"
                width={20}
                height={20}
                alt="like"
                className="cursor-pointer"
              />
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
      </div>
    </div>
  );
};

export default Page;
