"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { LuMoveRight } from "react-icons/lu";

import { FaArrowLeftLong } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import { addBluepoints } from "@/database/actions/user.action";

const UserDetails = ({ userDetails }) => {
  const [name, setName] = useState("");
  const modalRef = useRef(null);
  const [points, setPoints] = useState(0);

  const handleSubmit = async () => {
    if (name !== userDetails.username) {
      toast.error("PLease verify allocation of bluepoints");
      return;
    }
    const res = await addBluepoints(userDetails._id, points);
    if (res.status !== 200) {
      toast.error("Something went wrong");
      return;
    }
    if (modalRef.current) modalRef.current.click();
    toast.success("Bluespoints added successfully!");
  };

  return (
    <div className=" w-full p-5 bg-slate-50 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2.5">
          <Link href={"/user"} className="flex items-center gap-1.5">
            <FaArrowLeftLong className=" 2xl:text-lg " />
            <p className=" font-semibold">Back</p>
          </Link>
          <h1 className="text-2xl 2xl:text-3xl font-bold">View User Details</h1>
        </div>
        <Dialog>
          <DialogTrigger
            ref={modalRef}
            className="bg-[#38B6FF] text-white font-bold px-4 py-3 text-sm rounded-md"
          >
            Send BluePoint
          </DialogTrigger>
          <DialogContent
            className="w-[90vw] sm:max-w-[550px] text-sm text-black"
            style={{ backgroundColor: "white" }}
          >
            <DialogHeader className={`flex justify-start items-start `}>
              <DialogTitle className="text-lg font-bold">
                Send Blupoints
              </DialogTitle>
              <p className="text-sm text-slate-600">
                You can assign the blupoints to user here
              </p>
            </DialogHeader>
            <div className=" w-full my-4 flex  items-center gap-5">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="name" className=" font-semibold">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Enter User Name"
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="point" className=" font-semibold">
                  Attach Bluepoints
                </label>
                <input
                  type="number"
                  placeholder="10"
                  onChange={(e) => setPoints(e.target.value)}
                  id="point"
                  className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className=" w-full rounded-lg py-3 bg-[#38B6FF] inline-flex items-center justify-center text-white gap-3 font-semibold"
            >
              Send Bluepoints
              <LuMoveRight size={20} />
            </button>
          </DialogContent>
        </Dialog>
      </div>
      <div className=" w-full bg-white p-5 flex items-center justify-between shadow rounded-md mb-5 mt-8">
        <div className="flex items-center gap-2">
          <Image alt="profile" src="/profile.svg" width={40} height={40} />
          <div className="flex flex-col">
            <p className=" text-lg font-bold capitalize">
              {userDetails.username}
            </p>
            <p className="text-xs font-light capitalize text-slate-600">
              {userDetails.userType}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image alt="profile" src="/star.png" width={33} height={33} />
            <div className="flex flex-col">
              <p className=" text-sm 2xl:text-base font-bold">
                {userDetails.bluepoints}
              </p>
              <p className="text-xs  text-slate-600">Blue Points</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Image alt="profile" src="/gift.png" width={33} height={33} />
            <div className="flex flex-col">
              <p className=" text-sm 2xl:text-base font-bold">Rewards</p>
              <p className="text-xs  text-slate-600">
                {userDetails.rewards || 0} items
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Image alt="profile" src="/mail.png" width={33} height={33} />
            <div className="flex flex-col">
              <p className=" text-sm 2xl:text-base font-bold">Email Address</p>
              <p className="text-xs  text-slate-600">{userDetails.email}</p>
            </div>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-[#F9FAFB] border">
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Blupoints</TableHead>
            <TableHead>Claim Status</TableHead>
            <TableHead>Reward Name</TableHead>
            <TableHead>Delivery Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className=" text-xs max-w-[120px]  2xl:text-sm  font-semibold">
              Watch
            </TableCell>
            <TableCell className="text-xs max-w-[200px] 2xl:text-sm">
              10 Points
            </TableCell>
            <TableCell className=" text-xs max-w-[180px]  2xl:text-sm  ">
              <button className="bg-[#E6F6EE] text-green-600 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                <Image src="/accept.svg" alt="eye" width={18} height={18} />
                Claimed
              </button>{" "}
            </TableCell>
            <TableCell className=" text-xs font-semibold max-w-[100px]  2xl:text-sm  ">
              Mystery Box
            </TableCell>
            <TableCell className="  max-w-[130px] text-xs 2xl:text-sm  ">
              <button className="bg-[#E6F6EE] text-green-600 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                <Image src="/accept.svg" alt="eye" width={18} height={18} />
                Delivered
              </button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" text-xs max-w-[120px]  2xl:text-sm  font-semibold">
              Scissors
            </TableCell>
            <TableCell className="text-xs max-w-[200px] 2xl:text-sm">
              10 Points
            </TableCell>
            <TableCell className=" text-xs max-w-[180px]  2xl:text-sm  ">
              <button className="bg-[#FEF3F2] text-red-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                <Image src="/reject.svg" alt="eye" width={18} height={18} />
                Not Yet
              </button>
            </TableCell>
            <TableCell className=" text-xs font-semibold max-w-[100px]  2xl:text-sm  ">
              Thunder Prize
            </TableCell>
            <TableCell className="  max-w-[130px] text-xs 2xl:text-sm  ">
              <button className="bg-[#FEF3F2] text-red-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                <Image src="/reject.svg" alt="eye" width={18} height={18} />
                Not Yet
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default UserDetails;
