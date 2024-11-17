"use client";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "../ui/slider";

const volumeControl = ({ onToggle, onChange, value }) => {
  const isMuted = value === 0;
  const isHigh = value > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isHigh) {
    Icon = Volume2;
  }

  const lable = isMuted ? "Unmute" : "Mute";

  const handleChange = (value) => {
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onToggle}
        className="focus:outline-none"
        aria-label={lable}
      >
        <Icon className="h-5 w-5" color="white" />
      </button>

      <Slider
        value={[value]}
        onValueChange={handleChange}
        min={0}
        max={100}
        step={1}
        className="w-20 cursor-pointer"
      />
    </div>
  );
};

export default volumeControl;
