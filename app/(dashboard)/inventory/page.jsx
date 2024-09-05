"use client";
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
import Summary from "@/components/dashboard/summary/Summary";
import AddReward from "@/components/shared/modal/AddReward";
import ViewReward from "@/components/shared/modal/ViewReward";
import AddProduct from "@/components/shared/modal/AddProduct";
import DeleteReward from "@/components/shared/modal/DeleteReward";

const Inventory = () => {
  return (
    <div style={{ backgroundColor: "white" }} className="pb-8">
      <Summary />

      <div className="border rounded-xl p-5 mb-6 ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Award List</h2>
          <Search />

          <div className="flex items-center gap-2">
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
            <AddReward />
          </div>
        </div>

        <Table>
          <TableHeader className="bg-[#F9FAFB] border">
            <TableRow>
              <TableHead>Award Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Bluprint Score</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Total Interactions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className=" text-xs max-w-[120px]  2xl:text-sm  font-semibold">
                Jumbo Reward
              </TableCell>
              <TableCell className="text-xs max-w-[200px] 2xl:text-sm">
                Join a thriving community of professionals.....{" "}
              </TableCell>
              <TableCell className=" text-xs max-w-[130px]  2xl:text-sm  ">
                10 points
              </TableCell>
              <TableCell className=" text-xs max-w-[150px]  2xl:text-sm  ">
                <Link
                  href="#"
                  className=" text-xs max-w-[150px]  2xl:text-sm text-nowrap font-semibold  text-blue-600 underline"
                >
                  Blupro.com
                </Link>
              </TableCell>
              <TableCell className=" text-xs max-w-[80px]  2xl:text-sm  ">
                <p className="bg-[#38B6FF]/10 text-[#38B6FF] text-center font-semibold px-1 py-2 rounded-full">
                  Category
                </p>
              </TableCell>

              <TableCell className=" text-xs max-w-[80px]  2xl:text-sm text-center  ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="2xl:h-8 2xl:w-8 w-6 h-6 p-0"
                    >
                      <CiCircleChevDown className="text-3xl" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="px-4 w-48 bg-white"
                  >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="mb-3" />

                    <ViewReward />
                    <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                      Edit Reward
                    </Button>

                    <hr
                      className="pt-2 border-t-1 block w-full"
                      style={{ borderColor: "#CCCCCD" }}
                    />
                    <DeleteReward />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="border rounded-xl p-5 mb-8  ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Product Details</h2>
          <Search />

          <div className="flex items-center gap-2">
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
            <AddProduct />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-[#F9FAFB] border">
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Attached Bluprint</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className=" text-xs max-w-[160px]  2xl:text-sm  font-semibold">
                <div className="flex items-center gap-2">
                  <Image
                    src="/product.svg"
                    alt="watch"
                    width={70}
                    height={70}
                  />
                  <p>Air Jordans 4</p>
                </div>
              </TableCell>

              <TableCell className=" text-xs max-w-[160px]  2xl:text-sm  ">
                Join a thriving community of professionals and for management...
              </TableCell>
              <TableCell className=" text-xs max-w-[50px] truncate  2xl:text-sm  ">
                10 points
              </TableCell>
              <TableCell className=" text-xs max-w-[50px]  2xl:text-sm text-center  ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="2xl:h-8 2xl:w-8 w-6 h-6 p-0"
                    >
                      <CiCircleChevDown className="text-3xl" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="px-4 w-48 bg-white"
                  >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="mb-3" />

                    <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                      View Reward
                    </Button>
                    <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                      Edit Reward
                    </Button>

                    <hr
                      className="pt-2 border-t-1 block w-full"
                      style={{ borderColor: "#CCCCCD" }}
                    />
                    <Button
                      className="bg-[#D3175233] w-full rounded-md mb-2"
                      style={{ color: "#D31752" }}
                    >
                      Delete Reward
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Inventory;
