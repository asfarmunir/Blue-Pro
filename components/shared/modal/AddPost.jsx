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
        Add Post
      </DialogTrigger>
      <DialogContent
        className="  lg:min-w-[600px] sm:max-w-[550px] text-sm text-black "
        style={{ backgroundColor: "white" }}
      >
        <DialogHeader className={`flex justify-start items-start `}>
          <DialogTitle className="text-lg font-bold">Add Post</DialogTitle>
          <p className="text-sm text-slate-600">
            You can add the post from here.
          </p>
        </DialogHeader>
        <div className=" h-80 2xl:h-full px-2 space-y-4 overflow-auto">
          <div className="flex flex-col gap-1 w-full  ">
            <label
              htmlFor="name"
              className=" font-semibold text-xs mb-1 2xl:text-base "
            >
              Post Title
            </label>
            <input
              type="text"
              placeholder="video editing"
              id="name"
              className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 w-full  ">
            <label
              htmlFor="name"
              className=" font-semibold text-xs mb-1 2xl:text-base "
            >
              Add External Link
            </label>
            <input
              type="text"
              placeholder="www.xyz.com"
              id="name"
              className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
            />
          </div>
          <div className=" w-full mb-2 flex  items-center gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="name"
                className=" font-semibold text-xs mb-1 2xl:text-base "
              >
                Post Description
              </label>
              <Textarea
                placeholder="Enter Description here"
                className="w-full p-3 bg-[#38B6FF]/10 text-xs h-28 rounded-md"
              />
            </div>
          </div>
          <div className=" w-full mb-2 flex  items-center gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="name"
                className=" font-semibold text-xs mb-1 2xl:text-base "
              >
                Attach Image
              </label>
              <Image
                src="/streaming.svg"
                alt="live"
                width={23}
                height={23}
                className=" w-full rounded-lg"
              />
            </div>
          </div>
        </div>

        <button className=" w-full rounded-lg py-3 bg-[#38B6FF] inline-flex items-center justify-center text-white gap-3 font-semibold">
          Post
          <LuMoveRight size={20} />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default AddReward;
