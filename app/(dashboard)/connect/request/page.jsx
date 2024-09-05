import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import Search from "@/components/shared/Search";
import { CiCircleChevDown, CiFilter } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LuCalendarDays } from "react-icons/lu";
import Image from "next/image";

const page = () => {
  return (
    <div className=" p-3 2xl:p-4 bg-slate-50">
      <Link href={"/live"} className="flex items-center gap-2 mb-3">
        <FaArrowLeftLong className="text-xl" />
        <div className="text-lg font-semibold">Back </div>
      </Link>
      <h3 className=" text-xl 2xl:text-2xl font-bold  ">View Requests</h3>
      <div className="border rounded-xl p-5 my-8 bg-white  ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Group Requests</h2>
          <div className="flex items-center gap-5">
            <Search />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className=" px-4 py-2  inline-flex items-center rounded-lg font-bold border-2"
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
          </div>
        </div>
        <Table>
          <TableHeader className="bg-[#F9FAFB] border">
            <TableRow>
              <TableHead>PID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Group Name</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className=" text-xs max-w-[120px]  2xl:text-sm  font-semibold">
                #1236
              </TableCell>
              <TableCell className="text-xs max-w-[130px] 2xl:text-sm">
                <div className="flex items-center gap-2">
                  <Image src="/avatar.svg" alt="user" width={34} height={34} />
                  <p className=" font-semibold">Olivia Daddario</p>
                </div>
              </TableCell>
              <TableCell className=" text-xs max-w-[100px] font-semibold  2xl:text-sm  ">
                Group Name Goes here.
              </TableCell>
              <TableCell className=" text-xs max-w-[180px]  2xl:text-sm text-slate-600  ">
                Jan 13, 2022
              </TableCell>
              <TableCell className="  max-w-[130px] text-xs 2xl:text-sm  ">
                <div className=" flex items-center gap-2">
                  <button className="bg-[#FEF3F2] text-red-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                    <Image src="/reject.svg" alt="eye" width={18} height={18} />
                    Decline
                  </button>
                  <button className="bg-[#E6F6EE] text-green-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                    <Image src="/accept.svg" alt="eye" width={18} height={18} />
                    Approve
                  </button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" text-xs max-w-[120px]  2xl:text-sm  font-semibold">
                #1236
              </TableCell>
              <TableCell className="text-xs max-w-[130px] 2xl:text-sm">
                <div className="flex items-center gap-2">
                  <Image src="/avatar.svg" alt="user" width={34} height={34} />
                  <p className=" font-semibold">Olivia Daddario</p>
                </div>
              </TableCell>
              <TableCell className=" text-xs max-w-[100px] font-semibold  2xl:text-sm  ">
                Group Name Goes here.
              </TableCell>
              <TableCell className=" text-xs max-w-[180px]  2xl:text-sm text-slate-600  ">
                Jan 13, 2022
              </TableCell>
              <TableCell className="  max-w-[130px] text-xs 2xl:text-sm  ">
                <div className=" flex items-center gap-2">
                  <button className="bg-[#FEF3F2] text-red-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                    <Image src="/reject.svg" alt="eye" width={18} height={18} />
                    Decline
                  </button>
                  <button className="bg-[#E6F6EE] text-green-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                    <Image src="/accept.svg" alt="eye" width={18} height={18} />
                    Approve
                  </button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" text-xs max-w-[120px]  2xl:text-sm  font-semibold">
                #1236
              </TableCell>
              <TableCell className="text-xs max-w-[130px] 2xl:text-sm">
                <div className="flex items-center gap-2">
                  <Image src="/avatar.svg" alt="user" width={34} height={34} />
                  <p className=" font-semibold">Olivia Daddario</p>
                </div>
              </TableCell>
              <TableCell className=" text-xs max-w-[100px] font-semibold  2xl:text-sm  ">
                Group Name Goes here.
              </TableCell>
              <TableCell className=" text-xs max-w-[180px]  2xl:text-sm text-slate-600  ">
                Jan 13, 2022
              </TableCell>
              <TableCell className="  max-w-[130px] text-xs 2xl:text-sm  ">
                <div className=" flex items-center gap-2">
                  <button className="bg-[#FEF3F2] text-red-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                    <Image src="/reject.svg" alt="eye" width={18} height={18} />
                    Decline
                  </button>
                  <button className="bg-[#E6F6EE] text-green-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                    <Image src="/accept.svg" alt="eye" width={18} height={18} />
                    Approve
                  </button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" text-xs max-w-[120px]  2xl:text-sm  font-semibold">
                #1236
              </TableCell>
              <TableCell className="text-xs max-w-[130px] 2xl:text-sm">
                <div className="flex items-center gap-2">
                  <Image src="/avatar.svg" alt="user" width={34} height={34} />
                  <p className=" font-semibold">Olivia Daddario</p>
                </div>
              </TableCell>
              <TableCell className=" text-xs max-w-[100px] font-semibold  2xl:text-sm  ">
                Group Name Goes here.
              </TableCell>
              <TableCell className=" text-xs max-w-[180px]  2xl:text-sm text-slate-600  ">
                Jan 13, 2022
              </TableCell>
              <TableCell className="  max-w-[130px] text-xs 2xl:text-sm  ">
                <div className=" flex items-center gap-2">
                  <button className="bg-[#FEF3F2] text-red-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                    <Image src="/reject.svg" alt="eye" width={18} height={18} />
                    Decline
                  </button>
                  <button className="bg-[#E6F6EE] text-green-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                    <Image src="/accept.svg" alt="eye" width={18} height={18} />
                    Approve
                  </button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
