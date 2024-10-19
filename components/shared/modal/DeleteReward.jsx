"use client";
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { deleteReward } from "@/database/actions/reward.action";
import { toast } from "react-toastify";

const AddReward = ({ id }) => {
  const modalRef = useRef(null);

  return (
    <Dialog>
      <DialogTrigger
        ref={modalRef}
        className="bg-[#D3175233] text-red-600 w-full rounded-md text-sm font-semibold py-2.5 mb-2 "
      >
        Delete Reward
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[550px] text-sm text-black"
        style={{ backgroundColor: "white" }}
      >
        <div className="flex items-center justify-start flex-col gap-3 py-5">
          <Image src="/delete.svg" alt="hehe" width={60} height={60} />
          <h2 className=" font-semibold 2xl:text-lg">
            Are You Sure You want to delete ?
          </h2>
          <p className="text-sm text-slate-600">
            Do you really want to delete the reward listing here
          </p>
          <button
            onClick={async () => {
              await deleteReward(id);
              toast.success("Reward deleted successfully");
              if (modalRef.current) modalRef.current.click();
            }}
            className=" w-full rounded-lg py-3 mt-5 bg-[#38B6FF] inline-flex items-center justify-center text-white gap-3 font-semibold"
          >
            Yes
          </button>
          <button
            onClick={() => {
              if (modalRef.current) modalRef.current.click();
            }}
            className=" w-full rounded-lg mb-3 text-[#38B6FF] inline-flex items-center justify-center  underline gap-3 font-semibold"
          >
            Cancle
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddReward;
