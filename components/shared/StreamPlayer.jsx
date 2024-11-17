"use client";
import { useViewToken } from "@/app/hooks/useViewToken";
import React from "react";
import { LiveKitRoom } from "@livekit/components-react";
import Video from "./Video";
import { Loader } from "lucide-react";

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
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;
