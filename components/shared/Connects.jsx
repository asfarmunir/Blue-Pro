"use client";
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
import Link from "next/link";
import Pagination from "./Pagination";
const Connect = ({ groups, totalPages, page }) => {
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
            {/* <DropdownMenu>
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
                >
                  Delete
                </Button>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
        {groups && groups.length ? (
          <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {groups.map((group) => (
              <div key={group._id} className="rounded-lg bg-[#ECF8FF] border">
                <div className="flex  p-3.5 py-4 items-center justify-between">
                  <h2 className=" font-bold capitalize 2xl:text-lg">
                    {group.name}
                  </h2>
                  <Link
                    href={`/connect/details/${group._id}`}
                    className="border bg-white flex items-center gap-2 font-bold p-2.5 px-4 rounded-lg shadow"
                  >
                    View Details
                    <FaArrowRightLong className="text-xl" />
                  </Link>
                </div>
                <div className=" w-full border-x border-b rounded-lg px-4 flex items-center gap-4 py-5 bg-white">
                  <div className=" w-[135px] 2xl:w-[150px] h-[120px] 2xl:h-[154px] rounded-lg overflow-hidden ">
                    <Image
                      src={group.grpImage}
                      alt="live"
                      width={124}
                      height={124}
                      className=" w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 w-fit">
                    <p className=" bg-[#38B6FF]/10 p-1.5 px-3 capitalize rounded-full text-blue-500 font-semibold text-xs 2xl:text-sm w-fit">
                      {" "}
                      {group.category}
                    </p>
                    <div className="flex items-center gap-4">
                      <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                        <Image
                          src="/globe.svg"
                          alt="live"
                          width={16}
                          height={16}
                        />
                        {group.type}
                      </p>
                      <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                        <Image
                          src="/members.svg"
                          alt="live"
                          width={18}
                          height={18}
                        />
                        {group.members.length} Members
                      </p>
                    </div>
                    <p className=" text-sm 2xl:text-base max-w-[20rem] w-full">
                      {group.description}
                    </p>
                    <p className="text-xs 2xl:text-sm text-gray-400">
                      Created{" "}
                      {new Date(group.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" w-full  items-center justify-center">
            <h2 className="text-lg font-semibold text-center">
              No Connects Found!
            </h2>
          </div>
        )}

        <div className=" w-full mt-4">
          <Pagination page={page} totalPages={totalPages} urlParamName="page" />
        </div>
      </div>
    </div>
  );
};

export default Connect;
