"use client";
import React, { useRef } from "react";
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
import AddEvent from "@/components/shared/modal/AddEvent";
import Pagination from "./Pagination";
import EditEvent from "@/components/shared/modal/EditEvent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteActivity } from "@/database/actions/activity.action";
import { toast } from "react-toastify";
const Live = ({ activities, page, totalPages, users }) => {
  console.log("🚀 ~ Live ~ activities:", activities);
  const modalRef = useRef(null);
  return (
    <div className="p-3 2xl:p-5 w-full bg-slate-50 ">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between w-full">
        <div className="flex flex-col">
          <h2 className=" font-bold text-xl 2xl:text-2xl">
            Activity Management
          </h2>
          <p>You can check th e activity management details here</p>
        </div>
        <div className="flex items-center w-full md:w-fit gap-2">
          <AddEvent users={users} />
        </div>
      </div>
      <div className=" w-full my-8 bg-white  rounded-lg p-4 2xl:p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-lg font-semibold">Event Details</h2>

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
            {/* <button className=" bg-[#38B6FF] rounded-lg px-4 py-2 font-semibold text-white inline-flex items-center gap-2">
              Export
              <Image src="/export.svg" alt="live" width={17} height={17} />
            </button> */}
          </div>
        </div>
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {activities.map((activity, index) => (
            <div key={index} className="rounded-lg bg-slate-50 border">
              <div className="flex  p-2.5  items-center justify-between">
                <h2 className=" font-bold 2xl:text-lg capitalize">
                  {activity.title}
                </h2>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="2xl:h-8 2xl:w-8 w-6 h-6 p-0"
                    >
                      <Image
                        src="/menu.svg"
                        alt="live"
                        width={20}
                        height={20}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="px-4 py-4 w-48 bg-white "
                  >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="mb-3" />

                    <EditEvent id={activity._id} users={users} />

                    <hr
                      className="pt-2 border-t-1 block w-full"
                      style={{ borderColor: "#CCCCCD" }}
                    />
                    <Dialog>
                      <DialogTrigger
                        ref={modalRef}
                        className="bg-[#D3175233] text-sm py-2.5 text-red-500 font-semibold w-full rounded-md mb-2"
                      >
                        Remove Event
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to remove this event?
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center pt-4 justify-center gap-3">
                          <Button
                            variant="outline"
                            onClick={async () => {
                              await deleteActivity(activity._id, "/activity");
                              toast.success("Event Removed");
                              if (modalRef.current) modalRef.current.click();
                            }}
                            className="bg-[#D31752] text-white font-semibold w-full  py-3 text-sm rounded-md"
                          >
                            Yes
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              if (modalRef.current) modalRef.current.click();
                            }}
                            className="bg-[#38B6FF] text-white font-semibold w-full  py-3 text-sm rounded-md"
                          >
                            Cancel
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className=" w-full border-x border-b rounded-lg px-4 flex items-center gap-4 py-5  bg-white">
                <div className=" w-[100px] h-[100px]  object-cover">
                  {activity.isVideo ? (
                    <Image
                      src={"/streaming2.svg"}
                      alt="live"
                      className="rounded-lg object-cover object-center w-full h-full"
                      width={84}
                      height={84}
                    />
                  ) : (
                    <Image
                      src={activity.media || "/streaming2.svg"}
                      alt="live"
                      className="rounded-lg object-cover object-center w-full h-full"
                      width={84}
                      height={84}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2.5">
                  {
                    <p className=" bg-[#38B6FF]/10 p-1.5 px-3 capitalize rounded-full text-blue-500 font-semibold text-xs 2xl:text-sm w-fit">
                      {activity.type === "quick" ? (
                        <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                          <Image
                            src="/calender.svg"
                            alt="live"
                            width={15}
                            height={15}
                          />
                          Happening Now
                        </p>
                      ) : (
                        <div className="flex items-center gap-4">
                          <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                            <Image
                              src="/clock2.svg"
                              alt="live"
                              width={16}
                              height={16}
                            />
                            {activity.startTime}{" "}
                          </p>
                          <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                            <Image
                              src="/calender.svg"
                              alt="live"
                              width={15}
                              height={15}
                            />
                            {activity.scheduleDate}
                          </p>
                        </div>
                      )}
                    </p>
                  }
                  <p className=" text-sm 2xl:text-base">
                    {activity.description.length > 100
                      ? activity.description.substring(0, 100) + "..."
                      : activity.description}
                  </p>
                  <div className="bg-[#007AFF]/15  w-fit text-xs 2xl:text-sm  rounded-full px-3 py-1.5 gap-2 inline-flex items-center">
                    <Image src="/link.svg" alt="live" width={15} height={15} />
                    {activity.externalLink}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className=" w-full col-span-2  items-center justify-center">
              <h2 className="text-lg font-semibold text-center">
                No Activities Found!
              </h2>
            </div>
          )}
        </div>
        <div className=" w-full mt-4">
          <Pagination page={page} totalPages={totalPages} urlParamName="page" />
        </div>
      </div>
    </div>
  );
};

export default Live;
