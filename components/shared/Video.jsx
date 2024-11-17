"use client";
import { ConnectionState, Track } from "livekit-client";
import { Loader, WifiOff } from "lucide-react";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import LiveVideo from "./LiveVideo";
const Video = ({ hostName, hostIdentity }) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  console.log(connectionState);
  console.log(ConnectionState.Connected);

  if (!participant && connectionState === ConnectionState.Connected) {
    content = (
      <div className=" w-full p-12 flex h-64 2xl:h-72 bg-slate-50 rounded-md flex-col  items-center justify-center gap-3">
        <WifiOff size={64} />
        <p className="text-slate-500 tracking-wide font-semibold">
          Host is Offline
        </p>
      </div>
    );
  } else if (!participant || tracks.length === 0) {
    content = (
      <div className=" w-full p-12 flex bg-slate-50  h-64 2xl:h-72 rounded-md flex-col  items-center justify-center gap-3">
        <Loader size={56} className=" animate-spin" />
        <p className="text-slate-500 tracking-wide font-semibold">
          Getting things ready...
        </p>
      </div>
    );
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return <div className="">{content}</div>;
};

export default Video;
