"use client";
import { columns, removeJob } from "./columns";
import DataTable from "@/components/shared/DataTable";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuCalendarDays } from "react-icons/lu";
import Image from "next/image";
import FeedPosts from "@/components/shared/FeedPosts";
import LearnPosts from "@/components/shared/LearnPost";

const Main = ({ data, pagination, recentUsers }) => {
  console.log("🚀 ~ Main ~ recentUsers:", recentUsers);
  return (
    <div style={{ backgroundColor: "white" }} className="pb-8">
      <div className="border rounded-xl p-5 mb-6 ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Recent Activities</h2>
          {/* <Search /> */}

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild> */}
          <p
            variant="outline"
            className=" px-4 py-2 text-xs 2xl:text-sm  inline-flex items-center rounded-lg font-bold border-2"
          >
            Today
            <LuCalendarDays className=" 2xl:text-lg ml-2" />
          </p>
          {/* </DropdownMenuTrigger>
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
        <Tabs defaultValue="feed" className="w-full">
          <TabsList>
            <TabsTrigger value="feed">Feed Posts</TabsTrigger>
            <TabsTrigger value="learning">Learning Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="feed">
            <FeedPosts />
          </TabsContent>
          <TabsContent value="learning">
            <LearnPosts />
          </TabsContent>
        </Tabs>
      </div>
      <div className="border rounded-xl p-5 mb-8  ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">New User Registrations</h2>
          {/* <Search /> */}

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
        <Table>
          <TableHeader className="bg-[#F9FAFB] border">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Bluepoints</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentUsers?.users?.map((user, index) => {
              if (user.isAdmin) return null;
              const date = new Date(user.createdAt);
              const month = date.toLocaleString("default", {
                month: "long",
              });
              const year = date.getFullYear();
              return (
                <TableRow key={index}>
                  <TableCell className=" capitalize text-xs max-w-[120px]  2xl:text-sm  font-semibold">
                    {user.creator_information}
                  </TableCell>
                  <TableCell className="text-xs max-w-[200px] 2xl:text-sm">
                    <p className="bg-[#E6F7F8] text-[#00A3B4] flex items-center  justify-center w-fit gap-2 text-center font-bold px-3  py-2 rounded-full">
                      <span className=" h-2 w-2 capitalize  rounded-full bg-[#00A3B4]"></span>
                      {user.userType}
                    </p>
                  </TableCell>
                  <TableCell className=" text-xs max-w-[100px]  2xl:text-sm  ">
                    {month} {year}
                  </TableCell>
                  <TableCell className=" text-xs  max-w-[180px]  2xl:text-sm  ">
                    {user.totalGems}
                  </TableCell>
                  {/* <TableCell className="  max-w-[130px] text-xs 2xl:text-sm  ">
                    <div className=" flex items-center gap-2">
                      <button className="bg-[#FEF3F2] text-red-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                        <Image
                          src="/reject.svg"
                          alt="eye"
                          width={18}
                          height={18}
                        />
                        Decline
                      </button>
                      <button className="bg-[#E6F6EE] text-green-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full">
                        <Image
                          src="/accept.svg"
                          alt="eye"
                          width={18}
                          height={18}
                        />
                        Accept
                      </button>
                    </div>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Main;
