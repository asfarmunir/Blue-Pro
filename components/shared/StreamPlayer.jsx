"use client";
import { useViewToken } from "@/app/hooks/useViewToken";
import React from "react";
import { LiveKitRoom } from "@livekit/components-react";
import Video from "./Video";
import { Loader } from "lucide-react";
import Chat from "./Chat";
import Image from "next/image";

const StreamPlayer = ({ user, stream }) => {
  const { token, name, identity } = useViewToken(user._id);

  if (!token || !name || !identity) {
    return (
      <div className=" w-full p-12  h-64 2xl:h-72  flex bg-slate-50 rounded-md flex-col  items-center justify-center gap-3">
        <Loader size={56} className=" animate-spin" />
        <p className="text-slate-500 tracking-wide font-semibold">Loading...</p>
      </div>
    );
  }

  console.log(process.env.NEXT_PUBLIC_LIVEKIT_WSS_URL);
  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WSS_URL}
      >
        <div className=" w-full my-4">
          <Video hostName={user.username} hostIdentity={user._id} />
        </div>
        <div className="flex  items-center justify-between my-3">
          {stream.tags && (
            <div className="flex gap-1 items-center my-3">
              {stream.tags.map((tag, index) => (
                <p
                  key={index}
                  className="bg-[#38B6FF]/15 px-2 py-1 rounded-full text-xs 2xl:text-sm text-[#38B6FF]"
                >
                  #{tag}
                </p>
              ))}
            </div>
          )}
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
        <Chat
          viewerName={name}
          hostIdentity={user._id}
          hostName={user.username}
        />
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;
