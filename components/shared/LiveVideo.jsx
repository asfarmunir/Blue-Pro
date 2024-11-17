import React, { useEffect } from "react";
import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import VolumeControl from "./VolumeControl";
const LiveVideo = ({ participant }) => {
  const videoRef = React.useRef(null);
  const wrapperRef = React.useRef(null);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track.attach(videoRef.current);
      }
    });

  const [volume, setVolume] = React.useState(0);

  const onVolumeChange = (value) => {
    setVolume(+value);
    if (videoRef.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  return (
    <div ref={wrapperRef} className=" relative h-64  2xl:h-72 w-full flex">
      <video ref={videoRef} width="100%" />
      <div className=" absolute top-0  w-full h-full opacity-0 hover:opacity-100 transition-all ">
        <div className=" bottom-0 absolute flex  items-center justify-between h-10 bg-gradient-to-r from-neutral-900/60 to-slate-900/60 w-full px-4 ">
          <p className=" bg-red-600 px-4 flex py-1 items-center justify-center rounded-sm gap-1.5">
            <span className=" w-[5px] h-[5.5px] mb-[2px] animate-pulse bg-white rounded-full"></span>
            <span className="text-[0.5rem] font-semibold text-white tracking-wide ">
              LIVE
            </span>
          </p>
          <VolumeControl
            value={volume}
            onChange={onVolumeChange}
            onToggle={toggleMute}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
