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
  const [progress, setProgress] = useState(0);
  return (
    <Dialog>
      <DialogTrigger className="bg-[#38B6FF] text-white font-bold px-4 py-2.5 text-sm rounded-md">
        Add Reward
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[550px] text-sm text-black"
        style={{ backgroundColor: "white" }}
      >
        {progress === 0 && (
          <>
            <DialogHeader className={`flex justify-start items-start `}>
              <DialogTitle className="text-lg font-bold">
                Add Reward
              </DialogTitle>
              <p className="text-sm text-slate-600">
                You can add the award here to list
              </p>
            </DialogHeader>
            <div className=" w-full mt-4 flex  items-center gap-5">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="name" className=" font-semibold">
                  Award Title
                </label>
                <input
                  type="text"
                  placeholder="Enter User Name"
                  id="name"
                  className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="name" className=" font-semibold">
                  Attach Bluepoints
                </label>
                <input
                  placeholder="10.00"
                  id="name"
                  type="number"
                  className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
                />
              </div>
            </div>
            <div className=" w-full mb-4 flex  items-center gap-5">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="name" className=" font-semibold">
                  Description
                </label>
                <Textarea
                  placeholder="Enter Event Description here"
                  className="w-full p-3 bg-[#38B6FF]/10 text-xs h-28 rounded-md"
                />
              </div>
            </div>
          </>
        )}
        {progress !== 0 && (
          <>
            <DialogHeader className={`flex justify-start items-start `}>
              <button
                onClick={() => setProgress(progress - 1)}
                className="flex items-center gap-1.5"
              >
                <LuMoveLeft size={18} />
                Back
              </button>
              <DialogTitle className="text-lg font-bold">
                Edit Attach Products
              </DialogTitle>
              <p className="text-sm text-slate-600">
                You can add the award here to list
              </p>
            </DialogHeader>
            <div className="flex flex-col gap-3  w-full">
              <div className="w-full flex items-center justify-between px-1 py-3 gap-12 shadow-sm">
                <div className="flex items-center gap-3 flex-grow">
                  <Image src="/product.svg" alt="hehe" width={60} height={60} />
                  <div className="flex flex-col">
                    <h3 className="font-semibold">Air Jordan 4</h3>
                    <p className="text-xs text-slate-500">
                      This is a description of the Air Jordan 4. This is a
                      description of the Air Jordan 4. This is a description of
                      the Air Jordan 4.
                    </p>
                  </div>
                </div>
                <Checkbox
                  label="Attach"
                  className="text-xs
                    rounded-full
                    "
                />
              </div>
              <div className="w-full flex items-center justify-between px-1 py-3 gap-12 shadow-sm">
                <div className="flex items-center gap-3 flex-grow">
                  <Image src="/product.svg" alt="hehe" width={60} height={60} />
                  <div className="flex flex-col">
                    <h3 className="font-semibold">Air Jordan 4</h3>
                    <p className="text-xs text-slate-500">
                      This is a description of the Air Jordan 4. This is a
                      description of the Air Jordan 4. This is a description of
                      the Air Jordan 4.
                    </p>
                  </div>
                </div>
                <Checkbox
                  label="Attach"
                  className="text-xs
                    rounded-full
                    "
                />
              </div>
              <div className="w-full flex items-center justify-between px-1 py-3 gap-12 shadow-sm">
                <div className="flex items-center gap-3 flex-grow">
                  <Image src="/product.svg" alt="hehe" width={60} height={60} />
                  <div className="flex flex-col">
                    <h3 className="font-semibold">Air Jordan 4</h3>
                    <p className="text-xs text-slate-500">
                      This is a description of the Air Jordan 4. This is a
                      description of the Air Jordan 4. This is a description of
                      the Air Jordan 4.
                    </p>
                  </div>
                </div>
                <Checkbox
                  label="Attach"
                  className="text-xs
                    rounded-full
                    "
                />
              </div>
            </div>
          </>
        )}

        <button
          onClick={() => setProgress(progress + 1)}
          className=" w-full rounded-lg py-3 bg-[#38B6FF] inline-flex items-center justify-center text-white gap-3 font-semibold"
        >
          {progress === 0 && "Next"}
          {progress === 1 && "Add Reward"}
          <LuMoveRight size={20} />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default AddReward;
