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

const AddReward = () => {
  return (
    <Dialog>
      <DialogTrigger className="bg-[#38B6FF] text-white font-bold px-4 py-2.5 text-sm rounded-md">
        Add Group
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[550px] text-sm text-black "
        style={{ backgroundColor: "white" }}
      >
        <DialogHeader className={`flex justify-start items-start `}>
          <DialogTitle className="text-lg font-bold">Add Group</DialogTitle>
          <p className="text-sm text-slate-600">
            You can add the groups from here to list
          </p>
        </DialogHeader>
        <div className=" h-80 2xl:h-full pr-2 space-y-4 overflow-auto">
          <div className="flex flex-col gap-1 w-full  ">
            <label htmlFor="name" className=" ">
              Group Type
            </label>
            <input
              type="text"
              placeholder="type"
              id="name"
              className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name" className=" ">
              Group Name
            </label>
            <input
              placeholder="name"
              id="name"
              type="text"
              className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
            />
          </div>
          <div className=" w-full mb-2 flex  items-center gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="name" className=" ">
                Description
              </label>
              <Textarea
                placeholder="Enter Event Description here"
                className="w-full p-3 bg-[#38B6FF]/10 text-xs h-28 rounded-md"
              />
            </div>
          </div>
          <div className=" w-full p-4 justify-center flex flex-col items-center shadow  gap-2 border border-dotted rounded-lg">
            <Image src="/upload.svg" alt="hehe" width={30} height={30} />
            <h2 className=" 2xl:text-lg font-semibold">
              Upload Group Cover Image
            </h2>
            <p className="text-sm ">
              Supported media files :
              <span className=" px-1 text-red-600"> jpg,mp4,webp</span>
            </p>
          </div>
        </div>

        <button className=" w-full rounded-lg py-3 bg-[#38B6FF] inline-flex items-center justify-center text-white gap-3 font-semibold">
          Add Group
          <LuMoveRight size={20} />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default AddReward;
