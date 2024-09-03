"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuMoveRight, LuMoveLeft } from "react-icons/lu";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { BiSolidMessageSquareAdd } from "react-icons/bi";

const AddReward = () => {
  const [eventType, setEventType] = useState("quick");

  return (
    <Dialog>
      <DialogTrigger className="bg-[#38B6FF] text-white font-bold inline-flex items-center gap-2 px-4 py-3.5 text-sm 2xl:text-base rounded-md">
        Add Event
        <BiSolidMessageSquareAdd className="ml-2  " size={24} />
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[750px] text-sm text-black"
        style={{ backgroundColor: "white" }}
      >
        <DialogHeader className={`flex justify-start items-start `}>
          <DialogTitle className="text-lg font-bold">
            {eventType === "quick" ? "Add Quick Event" : "Schedule Event"}
          </DialogTitle>
          <p className="text-sm text-slate-600">
            You can add the event here to list
          </p>
        </DialogHeader>
        <div className=" md:h-72 2xl:h-full overflow-y-auto px-3 pb-5">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name" className=" font-semibold">
              Enter Title
            </label>
            <select
              id="name"
              onChange={(e) => setEventType(e.target.value)}
              className="w-full p-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-md"
            >
              <option value="quick">Add Quick Event</option>
              <option value="schedule">Schedule Event</option>
            </select>
          </div>
          <div className=" w-full mt-4 flex flex-col md:flex-row  items-center gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="name" className=" font-semibold">
                Enter Title
              </label>
              <input
                id="name"
                placeholder="Enter Event Title here"
                type="text"
                className="w-full p-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="name" className=" font-semibold">
                External Link
              </label>
              <input
                type="text"
                placeholder="URL"
                id="name"
                className="w-full p-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-md"
              />
            </div>
          </div>
          <div className=" w-full mt-2 flex  items-center gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="name" className=" font-semibold">
                Description
              </label>
              <Textarea
                placeholder="Enter Event Description here"
                className="w-full p-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm h-28 rounded-md"
              />
            </div>
          </div>
          {eventType === "schedule" && (
            <div className=" w-full mt-2 flex  items-center gap-5">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="name" className=" font-semibold">
                  Choose Date
                </label>
                <input
                  id="name"
                  placeholder="Enter Event Title here"
                  type="date"
                  className="w-full p-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="name" className=" font-semibold">
                  Choose Time
                </label>
                <input
                  type="time"
                  placeholder="URL"
                  id="name"
                  className="w-full p-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-md"
                />
              </div>
            </div>
          )}
          <div className=" w-full p-4 justify-center flex flex-col items-center mt-3 gap-2 border border-dotted rounded-lg">
            <Image src="/upload.svg" alt="hehe" width={30} height={30} />
            <h2 className=" 2xl:text-lg font-semibold">Upload Media Here</h2>
            <p className="text-sm text-center ">
              Supported media files :
              <span className=" px-1 text-red-600"> jpg,mp4,webp</span>
            </p>
          </div>
        </div>

        <button className=" w-full rounded-lg py-3 bg-[#38B6FF] inline-flex capitalize items-center justify-center text-white gap-3 font-semibold">
          {eventType === "quick" ? "add" : "schedule"} Event
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default AddReward;
