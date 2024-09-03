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
      <DialogTrigger className="bg-[#E7E7E7] w-full rounded-md text-sm font-semibold py-2.5 mb-2 text-black hover:text-white">
        View Reward
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[550px] text-sm text-black"
        style={{ backgroundColor: "white" }}
      >
        <>
          <DialogHeader className={`flex justify-start items-start `}>
            <DialogTitle className="text-lg font-bold">
              Edit Attach Products
            </DialogTitle>
            <p className="text-sm text-slate-600">
              You can view the award here to list here.
            </p>
          </DialogHeader>
          <div className="flex items-center justify-between my-2">
            <h2 className=" font-semibold">Award Title</h2>
            <h2 className=" font-semibold">-</h2>
            <h2 className=" font-semibold">Jumbo Points</h2>
          </div>
          <div className="flex items-center justify-between my-2">
            <h2 className=" font-semibold">Bluepoints</h2>
            <h2 className=" font-semibold">-</h2>
            <h2 className=" font-semibold">45</h2>
          </div>

          <div className="flex flex-col gap-3  w-full">
            <h2 className=" font-semibold">Attached Products</h2>
            <div className="w-full flex items-center justify-between px-1 py-3 gap-12 shadow-sm">
              <div className="flex items-center gap-3 flex-grow">
                <Image src="/product.svg" alt="hehe" width={60} height={60} />
                <div className="flex flex-col">
                  <h3 className="font-semibold 2xl:text-lg">Air Jordan 4</h3>
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
                  <h3 className="font-semibold 2xl:text-lg">Air Jordan 4</h3>
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
                  <h3 className="font-semibold 2xl:text-lg">Air Jordan 4</h3>
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

        <button className=" w-full rounded-lg py-3 bg-[#38B6FF] inline-flex items-center justify-center text-white gap-3 font-semibold">
          Ok
          <LuMoveRight size={20} />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default AddReward;
