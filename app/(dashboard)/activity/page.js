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
import AddEvent from "@/components/shared/modal/AddEvent";
import Link from "next/link";
const Live = () => {
  return (
    <div className="p-3 2xl:p-5 w-full bg-slate-50 ">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between w-full">
        <div className="flex flex-col">
          <h2 className=" font-bold text-xl 2xl:text-2xl">Activity Management</h2>
          <p>You can check th e activity management details here</p>
        </div>
        <div className="flex items-center w-full md:w-fit gap-2">
          <AddEvent/>
        </div>
      </div>
      <div className=" w-full my-8 bg-white  rounded-lg p-4 2xl:p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-lg font-semibold">Event Details</h2>

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
                    >
                  Delete
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
            <button className=" bg-[#38B6FF] rounded-lg px-4 py-2 font-semibold text-white inline-flex items-center gap-2">
              Export
              <Image src="/export.svg" alt="live" width={17} height={17} />
            </button>
          </div>
        </div>
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="rounded-lg bg-slate-50 border">
            <div className="flex  p-2.5  items-center justify-between">
              <h2 className=" font-bold 2xl:text-lg">
                Title Goes Here, Title Goes Here
              </h2>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    className="2xl:h-8 2xl:w-8 w-6 h-6 p-0"
                  >
                    <Image src="/menu.svg" alt="live" width={20} height={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="px-4 py-4 w-48 bg-white"
                >
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator className="mb-3" />

                  <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                    View User
                  </Button>

                  <hr
                    className="pt-2 border-t-1 block w-full"
                    style={{ borderColor: "#CCCCCD" }}
                  />
                  <Button
                    className="bg-[#D3175233] w-full rounded-md mb-2"
                    style={{ color: "#D31752" }}
                  >
                    Archive Live
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className=" w-full border-x border-b rounded-lg px-4 flex items-center gap-4 py-5 bg-white">
              <Image src="/live-stream.svg" alt="live" width={84} height={84} />
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-4">
                  <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                    <Image
                      src="/clock2.svg"
                      alt="live"
                      width={16}
                      height={16}
                    />
                    09:00 AM - 10:00 AM
                  </p>
                  <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                    <Image
                      src="/calender.svg"
                      alt="live"
                      width={15}
                      height={15}
                    />
                    22 Jan 2024
                  </p>
                </div>
                <p className=" text-sm 2xl:text-base">
                  Join a thriving community of professional and aspiring live
                  streamers and creators...
                </p>
                <div className="bg-[#007AFF]/15 w-fit text-xs 2xl:text-sm  rounded-full px-3 py-1.5 gap-2 inline-flex items-center">
                  <Image src="/link.svg" alt="live" width={15} height={15} />
                  www.facebook.com
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 border">
            <div className="flex  p-2.5  items-center justify-between">
              <h2 className=" font-bold 2xl:text-lg">
                Title Goes Here, Title Goes Here
              </h2>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    className="2xl:h-8 2xl:w-8 w-6 h-6 p-0"
                  >
                    <Image src="/menu.svg" alt="live" width={20} height={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="px-4 py-4 w-48 bg-white"
                >
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator className="mb-3" />

                  <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                    View User
                  </Button>

                  <hr
                    className="pt-2 border-t-1 block w-full"
                    style={{ borderColor: "#CCCCCD" }}
                  />
                  <Button
                    className="bg-[#D3175233] w-full rounded-md mb-2"
                    style={{ color: "#D31752" }}
                  >
                    Archive Live
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className=" w-full border-x border-b rounded-lg px-4 flex items-center gap-4 py-5 bg-white">
              <Image src="/live-stream.svg" alt="live" width={84} height={84} />
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-4">
                  <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                    <Image
                      src="/clock2.svg"
                      alt="live"
                      width={16}
                      height={16}
                    />
                    09:00 AM - 10:00 AM
                  </p>
                  <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                    <Image
                      src="/calender.svg"
                      alt="live"
                      width={15}
                      height={15}
                    />
                    22 Jan 2024
                  </p>
                </div>
                <p className=" text-sm 2xl:text-base">
                  Join a thriving community of professional and aspiring live
                  streamers and creators...
                </p>
                <div className="bg-[#007AFF]/15 w-fit text-xs 2xl:text-sm  rounded-full px-3 py-1.5 gap-2 inline-flex items-center">
                  <Image src="/link.svg" alt="live" width={15} height={15} />
                  www.facebook.com
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 border">
            <div className="flex  p-2.5  items-center justify-between">
              <h2 className=" font-bold 2xl:text-lg">
                Title Goes Here, Title Goes Here
              </h2>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    className="2xl:h-8 2xl:w-8 w-6 h-6 p-0"
                  >
                    <Image src="/menu.svg" alt="live" width={20} height={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="px-4 py-4 w-48 bg-white"
                >
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator className="mb-3" />

                  <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                    View User
                  </Button>

                  <hr
                    className="pt-2 border-t-1 block w-full"
                    style={{ borderColor: "#CCCCCD" }}
                  />
                  <Button
                    className="bg-[#D3175233] w-full rounded-md mb-2"
                    style={{ color: "#D31752" }}
                  >
                    Archive Live
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className=" w-full border-x border-b rounded-lg px-4 flex items-center gap-4 py-5 bg-white">
              <Image src="/live-stream.svg" alt="live" width={84} height={84} />
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-4">
                  <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                    <Image
                      src="/clock2.svg"
                      alt="live"
                      width={16}
                      height={16}
                    />
                    09:00 AM - 10:00 AM
                  </p>
                  <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                    <Image
                      src="/calender.svg"
                      alt="live"
                      width={15}
                      height={15}
                    />
                    22 Jan 2024
                  </p>
                </div>
                <p className=" text-sm 2xl:text-base">
                  Join a thriving community of professional and aspiring live
                  streamers and creators...
                </p>
                <div className="bg-[#007AFF]/15 w-fit text-xs 2xl:text-sm  rounded-full px-3 py-1.5 gap-2 inline-flex items-center">
                  <Image src="/link.svg" alt="live" width={15} height={15} />
                  www.facebook.com
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 border">
            <div className="flex  p-2.5  items-center justify-between">
              <h2 className=" font-bold 2xl:text-lg">
                Title Goes Here, Title Goes Here
              </h2>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    className="2xl:h-8 2xl:w-8 w-6 h-6 p-0"
                  >
                    <Image src="/menu.svg" alt="live" width={20} height={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="px-4 py-4 w-48 bg-white"
                >
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator className="mb-3" />

                  <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                    View User
                  </Button>

                  <hr
                    className="pt-2 border-t-1 block w-full"
                    style={{ borderColor: "#CCCCCD" }}
                  />
                  <Button
                    className="bg-[#D3175233] w-full rounded-md mb-2"
                    style={{ color: "#D31752" }}
                  >
                    Archive Live
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className=" w-full border-x border-b rounded-lg px-4 flex items-center gap-4 py-5 bg-white">
              <Image src="/live-stream.svg" alt="live" width={84} height={84} />
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-4">
                  <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                    <Image
                      src="/clock2.svg"
                      alt="live"
                      width={16}
                      height={16}
                    />
                    09:00 AM - 10:00 AM
                  </p>
                  <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                    <Image
                      src="/calender.svg"
                      alt="live"
                      width={15}
                      height={15}
                    />
                    22 Jan 2024
                  </p>
                </div>
                <p className=" text-sm 2xl:text-base">
                  Join a thriving community of professional and aspiring live
                  streamers and creators...
                </p>
                <div className="bg-[#007AFF]/15 w-fit text-xs 2xl:text-sm  rounded-full px-3 py-1.5 gap-2 inline-flex items-center">
                  <Image src="/link.svg" alt="live" width={15} height={15} />
                  www.facebook.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
