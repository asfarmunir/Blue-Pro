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

const GoLive = ({ params: { id } }) => {
  const [stream, setStream] = useState(null);
  console.log("🚀 ~ GoLive ~ stream:", stream);
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      const getStream = async () => {
        const userStream = await getStreamById(id);
        setStream(userStream.data);
      };
      getStream();
    }
  }, [session, id]);

  if (session.status === "loading" || !stream) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className=" w-20 h-20 animate-spin text-blue-400 " />
      </div>
    );
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const handleStatus = async (status) => {
    const res = await updateStreamStatus(stream._id, status);
    if (res.status !== 200) {
      toast.error(res.message);
    }
    if (status === "live") {
      setStream({ ...stream, isLive: true });
    } else {
      setStream({ ...stream, isLive: false });
    }

    toast.success(`Stream is ${status}`);
  };

  return (
    <div className=" w-full p-3 2xl:p-4 space-y-4 bg-slate-50 pb-16">
      <Link href={"/live"} className="flex items-center gap-2">
        <FaArrowLeftLong className="text-xl" />
        <div className="text-lg font-semibold">Back </div>
      </Link>
      <h3 className=" text-xl 2xl:text-2xl font-bold ">Go Live</h3>

      <div className=" w-full flex-col md:flex-row flex gap-5 mt-8 pb-10">
        <div className=" bg-white rounded-md shadow w-full md:w-[60%] p-6">
          <div className="flex items-center justify-between w-full border-b mb-4 pb-4">
            <h2 className=" text-lg font-bold 2xl:text-xl">Live Preview</h2>
            {stream.isLive ? (
              <div className="bg-green-500 px-8 font-semibold py-1.5 rounded-full text-white text-xs 2xl:text-sm inline-flex items-center gap-2">
                Live
              </div>
            ) : (
              <div className="bg-red-500 px-8 py-1.5 font-semibold rounded-full text-white text-xs 2xl:text-sm inline-flex items-center gap-2">
                Offline
              </div>
            )}
          </div>
          <h2 className=" font-bold mb-2 2xl:text-lg">{stream.name}</h2>
          <p className="text-xs 2xl:text-sm mb-2">{stream.description}</p>
          {stream.externalUrl && (
            <div className="bg-[#007AFF]/15 w-fit text-xs 2xl:text-sm  rounded-full px-3 py-1.5 gap-2 inline-flex items-center">
              <Image src="/link.svg" alt="live" width={15} height={15} />
              {stream.externalUrl}
            </div>
          )}

          <StreamPlayer user={session.data.user} stream={stream} />

          {/* <div className="flex  items-center justify-between my-3">
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
                    lorem ipsem is a dummy text, that is used for comments,
                    lorem ipsem is a dummy text, that is used for comments
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
                    lorem ipsem is a dummy text, that is used for comments,
                    lorem ipsem is a dummy text, that is used for comments
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
                    lorem ipsem is a dummy text, that is used for comments,
                    lorem ipsem is a dummy text, that is used for comments
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
          </div> */}
        </div>
        <div className=" bg-white rounded-md shadow w-full h-fit md:w-[40%] p-6">
          <h2 className="text-lg 2xl:text-xl font-bold">Session Details</h2>

          <div className="flex flex-col gap-1 my-5 w-full">
            <label
              htmlFor="name"
              className="text-sm font-semibold 2xl:text-base"
            >
              Server URL
            </label>
            <div className="relative w-full">
              <p
                className="w-full p-4 rounded-xl text-slate-400 font-semibold inline-flex items-center justify-between text-xs 2xl:text-base bg-blue-100/70 cursor-pointer"
                onClick={() => copyToClipboard(stream.serverUrl)}
              >
                {stream.serverUrl}
                <VscCopy className="text-lg 2xl:text-xl" />
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 my-5 w-full">
            <label
              htmlFor="name"
              className="text-sm font-semibold 2xl:text-base"
            >
              Stream Key
            </label>
            <div className="relative w-full border-b pb-8">
              <p
                className="w-full p-4 rounded-xl text-slate-400 font-semibold inline-flex items-center justify-between text-xs 2xl:text-base bg-blue-100/70 cursor-pointer"
                onClick={() => copyToClipboard(stream.streamKey)}
              >
                {stream.streamKey}
                <VscCopy className="text-lg 2xl:text-xl" />
              </p>
            </div>
          </div>
          {stream.isLive ? (
            <button
              className="bg-red-500 text-white font-semibold w-full py-4 mt-3 text-sm 2xl:text-base rounded-xl"
              onClick={() => handleStatus("offline")}
            >
              Stop Live Stream
            </button>
          ) : (
            <button
              className="bg-[#38B6FF] text-white font-semibold w-full py-4 mt-3 text-sm 2xl:text-base rounded-xl"
              onClick={() => handleStatus("live")}
            >
              Start Live Stream
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoLive;
