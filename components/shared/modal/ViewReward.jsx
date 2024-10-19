"use client";
import React, { useEffect, useState, useRef } from "react";
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
import { getRewardById } from "@/database/actions/reward.action";
import { toast } from "react-toastify";

const AddReward = ({ rewardId }) => {
  const [reward, setReward] = useState({});
  const modalRef = useRef(null);
  const fetchReward = async () => {
    try {
      const response = await getRewardById(rewardId);
      setReward(response.reward);
      if (response.status !== 200) {
        toast.error("No reward found.");
      }
    } catch (error) {
      console.error("Error fetching reward", error);
    }
  };

  useEffect(() => {
    fetchReward();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog>
      <DialogTrigger
        ref={modalRef}
        className="bg-[#E7E7E7] w-full rounded-md text-sm font-semibold py-2.5 mb-2 text-black hover:text-white"
      >
        View Reward
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[550px] text-sm text-black"
        style={{ backgroundColor: "white" }}
      >
        <>
          <DialogHeader className={`flex justify-start items-start `}>
            <DialogTitle className="text-lg font-bold">View Reward</DialogTitle>
            <p className="text-sm text-slate-600">
              You can view the award here to list here.
            </p>
          </DialogHeader>
          <div className="flex items-center justify-between my-2">
            <h2 className=" font-semibold">Award Title</h2>
            <h2 className=" font-semibold">-</h2>
            <h2 className=" font-semibold capitalize">{reward.name}</h2>
          </div>
          <div className="flex items-center justify-between my-2">
            <h2 className=" font-semibold">Bluepoints</h2>
            <h2 className=" font-semibold">-</h2>
            <h2 className=" font-semibold">{reward.bluepoints}</h2>
          </div>

          <div className="flex flex-col max-h-56 2xl:max-h-96 pr-5 overflow-y-auto overflow-x-hidden gap-3  w-full">
            <h2 className=" font-semibold">Attached Products</h2>
            {reward.attachedProducts &&
              reward.attachedProducts.map((product, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between px-1 py-3 gap-12 shadow-sm"
                >
                  <div className="flex items-center gap-3 flex-grow">
                    <div className="flex items-center justify-center w-[60px] h-[60px] object-contain object-center ">
                      <Image
                        src={product.image}
                        alt="hehe"
                        width={60}
                        height={60}
                        className=" w-full h-full rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold capitalize 2xl:text-lg">
                        {product.name}
                      </h3>
                      <p className="text-xs capitalize text-slate-500">
                        {product.description.length > 150
                          ? product.description.slice(0, 150) + "..."
                          : product.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>

        <button
          onClick={() => modalRef.current.click()}
          className=" w-full rounded-lg py-3 bg-[#38B6FF] inline-flex items-center justify-center text-white gap-3 font-semibold"
        >
          Ok
          <LuMoveRight size={20} />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default AddReward;
