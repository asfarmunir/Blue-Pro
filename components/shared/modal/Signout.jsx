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
import { IoIosLogOut } from "react-icons/io";

const AddReward = () => {
  return (
    <Dialog>
      <DialogTrigger
        className="text-[#E40000] flex items-center
         justify-start cursor-pointer mt-2 text-xs 2xl:text-base font-bold rounded-md px-4 "
      >
        <IoIosLogOut className="mr-3  text-lg " />
        Logout
      </DialogTrigger>
      <DialogContent
        className="text-sm text-black"
        style={{ backgroundColor: "white" }}
      >
        <div className="flex items-center justify-start flex-col gap-3 py-5">
          <Image
            src="/logout.svg"
            alt="hehe"
            width={60}
            height={60}
            className="mb-2"
          />
          <h2 className=" font-bold text-xl 2xl:text-3xl">
            Do You want to Logout ?
          </h2>
          <p className="text-sm 2xl:text-lg text-slate-600 text-center">
            Do you really want to logout the blupro <br /> app here
          </p>
          <button className=" w-full rounded-lg py-3 mt-5 bg-[#38B6FF] inline-flex items-center justify-center text-white gap-3 font-semibold">
            Yes
          </button>
          <button className=" w-full rounded-lg mb-3 text-[#38B6FF] inline-flex items-center justify-center  underline gap-3 font-semibold">
            Cancle
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddReward;
