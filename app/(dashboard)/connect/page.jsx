import React from "react";
import Image from "next/image";
import Search from "@/components/shared/Search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LuCalendarDays } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import AddGroup from "@/components/shared/modal/AddGroup";
import AddPost from "@/components/shared/modal/AddPost";

import Link from "next/link";
const Live = () => {
  return (
    <div className=" p-1.5 md:p-3 2xl:p-5 w-full bg-slate-50 ">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between w-full">
        <div className="flex flex-col">
          <h2 className=" font-bold text-xl 2xl:text-2xl">
            Connect Management
          </h2>
          <p>You can check th e activity management details here</p>
        </div>
        <div className="flex items-center w-full md:w-fit gap-2">
          <Link
            href={"/connect/request"}
            className=" border-2 border-[#38B6FF] rounded-lg font-semibold px-4 text-sm py-2.5 text-[#38B6FF] inline-flex items-center gap-2"
          >
            View Requests
          </Link>
          <AddGroup />
          {/* <AddPost /> */}
        </div>
      </div>
      <div className=" w-full my-8 bg-white  rounded-lg p-2 md:p-4 2xl:p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-lg font-semibold">Group Details</h2>

          <div className="hidden md:flex items-center gap-2">
            <Search />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className=" px-4 py-2 ml-4 inline-flex items-center rounded-lg font-bold border-2"
                >
                  Today
                  <LuCalendarDays className=" text-lg 2xl:text-xl ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="px-4 bg-white">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="mb-3" />

                <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                  View all Details
                </Button>

                <hr
                  className="pt-2 border-t-1 block w-full"
                  style={{ borderColor: "#CCCCCD" }}
                />
                <Button
                  className="bg-[#D3175233] w-full rounded-md mb-2"
                  style={{ color: "#D31752" }}
                  onClick={() => removeJob(row.original?.id)}
                >
                  Delete
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="rounded-lg bg-[#ECF8FF] border">
            <div className="flex  p-3.5 py-4 items-center justify-between">
              <h2 className=" font-bold 2xl:text-lg">Group Name Goes here.</h2>
              <Link
                href={"/connect/details"}
                className="border bg-white flex items-center gap-2 font-bold p-2.5 px-4 rounded-lg shadow"
              >
                View Details
                <FaArrowRightLong className="text-xl" />
              </Link>
            </div>
            <div className=" w-full border-x border-b rounded-lg px-4 flex items-center gap-4 py-5 bg-white">
              <Image
                src="/streaming2.svg"
                alt="live"
                width={124}
                height={124}
              />
              <div className="flex flex-col gap-2.5">
                <p className=" bg-[#38B6FF]/10 p-1.5 rounded-full text-blue-500 font-semibold text-xs 2xl:text-sm w-fit">
                  {" "}
                  category
                </p>
                <div className="flex items-center gap-4">
                  <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                    <Image src="/globe.svg" alt="live" width={16} height={16} />
                    Public
                  </p>
                  <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                    <Image
                      src="/members.svg"
                      alt="live"
                      width={18}
                      height={18}
                    />
                    2k Members
                  </p>
                </div>
                <p className=" text-sm 2xl:text-base">
                  Join a thriving community of professional and aspiring live
                  streamers and creators...
                </p>
                <p className="text-xs 2xl:text-sm text-gray-400">
                  Created May 20, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
