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
import Link from "next/link";
import { getAllStreams } from "@/database/actions/stream.action";
import Pagination from "@/components/shared/Pagination";
import DeleteStream from "@/components/shared/DeleteStream";
const Live = async ({ searchParams }) => {
  const name = searchParams.name || undefined;
  const page = Number(searchParams.page) || 1;

  const streams = await getAllStreams({ page, limit: 8, name });
  console.log("🚀 ~ Live ~ streams:", streams);

  return (
    <div className="p-3 2xl:p-5 w-full bg-slate-50 ">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between w-full">
        <div className="flex flex-col">
          <h2 className=" font-bold text-xl 2xl:text-2xl">Go Live</h2>
          <p>You can check th e activity management details here</p>
        </div>
        <div className="flex items-center w-full md:w-fit gap-2">
          {/* <Link
            href={"/live/schedule"}
            className=" border-2 border-[#38B6FF] rounded-lg font-semibold px-4 py-2.5 text-[#38B6FF] inline-flex items-center gap-2"
          >
            Schedule Stream
            <Image src="/clock.svg" alt="live" width={20} height={20} />
          </Link> */}
          <Link
            href={"/live/go-live"}
            className="border-2 flex-grow md:flex-grow-0 justify-center border-[#38B6FF]  bg-[#38B6FF] rounded-lg font-semibold px-4 py-2.5 text-white inline-flex items-center gap-2"
          >
            Go Live
            <Image src="/go-live.svg" alt="live" width={20} height={20} />
          </Link>
        </div>
      </div>
      <div className=" w-full my-8 bg-white  rounded-lg p-4 2xl:p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-lg font-semibold">Live Sessions</h2>

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
            </DropdownMenu>
            <button className=" bg-[#38B6FF] rounded-lg px-4 py-2 font-semibold text-white inline-flex items-center gap-2">
              Export
              <Image src="/export.svg" alt="live" width={17} height={17} />
            </button> */}
          </div>
        </div>
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {streams && streams.data.length > 0 ? (
            streams.data.map((stream, index) => (
              <div key={index} className="rounded-lg bg-slate-50 border">
                <div className="flex  p-2.5 px-4  items-center justify-between">
                  <h2 className=" font-bold 2xl:text-lg">{stream.name}</h2>

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
                      className="px-4 py-4 w-48 bg-white"
                    >
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator className="mb-3" />

                      {/* <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                        View User
                      </Button>

                      <hr
                        className="pt-2 border-t-1 block w-full"
                        style={{ borderColor: "#CCCCCD" }}
                      /> */}
                      <DeleteStream id={stream._id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link href={`/live/go-live/${stream._id}`}>
                  <div className=" w-full border-x border-b rounded-lg px-4 flex items-center gap-4 py-5 bg-white">
                    <div className=" w-[155px] h-[110px] bg-blue-50 overflow-hidden">
                      <Image
                        src={stream.thumbnail}
                        alt="live"
                        width={84}
                        height={84}
                        className=" w-full h-full object-cover rounded-lg object-center"
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-4">
                        <p className="text-xs inline-flex items-center gap-1 2xl:text-sm text-slate-500">
                          <Image
                            src="/calender.svg"
                            alt="live"
                            width={15}
                            height={15}
                          />
                          {
                            new Date(stream.createdAt)
                              .toLocaleString()
                              .split(",")[0]
                          }
                        </p>
                        <div>
                          {stream.isLive ? (
                            <div className="bg-red-600 text-white rounded-full px-3 py-1.5 gap-2 text-xs 2xl:text-sm inline-flex items-center">
                              <p className="w-2 h-2 bg-white rounded-full animate-pulse"></p>
                              Live
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <p className=" text-sm 2xl:text-base max-w-[15rem] truncate 2xl:max-w-[23rem] ">
                        {stream.description}
                      </p>
                      {/* <div
                      className="bg-[#007AFF]/15 w-fit text-xs 2xl:text-sm  rounded-full px-3 py-1.5 gap-2 inline-flex items-center"
                    >
                      <Image
                        src="/link.svg"
                        alt="live"
                        width={15}
                        height={15}
                      />
                      link
                    </div> */}
                      <div className="flex items-center gap-2 w-full flex-wrap">
                        {stream.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="bg-[#007AFF]/15 w-fit text-xs 2xl:text-sm  rounded-full px-3 py-1.5 gap-2 inline-flex items-center"
                          >
                            #{tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="w-full flex col-span-2 items-center justify-center">
              <p>No Live Streams Found</p>
            </div>
          )}
        </div>
        <div className=" w-full mt-4">
          <Pagination
            page={page}
            totalPages={streams.total}
            urlParamName="page"
          />
        </div>
      </div>
    </div>
  );
};

export default Live;
