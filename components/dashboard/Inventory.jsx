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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuCalendarDays } from "react-icons/lu";
import Image from "next/image";
import Summary from "@/components/dashboard/summary/Summary";
import AddReward from "@/components/shared/modal/AddReward";
import ViewReward from "@/components/shared/modal/ViewReward";
import AddProduct from "@/components/shared/modal/AddProduct";
import EditProduct from "@/components/shared/modal/EditProduct";
import DeleteReward from "@/components/shared/modal/DeleteReward";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProduct } from "@/database/actions/product.action";
import { toast } from "react-toastify";
import { useRef } from "react";
import EditReward from "@/components/shared/modal/EditReward";
import Pagination from "../shared/Pagination";

const Inventory = ({
  products,
  rewards,
  totalRewards,
  rewardPage,
  totalRewardPages,
  totalProducts,
  productPage,
  totalProductPages,
}) => {
  const modalRef = useRef(null);
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
            <AddReward allProducts={products} />
          </div>
        </div>

        <Table>
          <TableHeader className="bg-[#F9FAFB] border">
            <TableRow>
              <TableHead>Award Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Bluprint Score</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Total Interactions</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rewards.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-xs 2xl:text-sm"
                >
                  No rewards available
                </TableCell>
              </TableRow>
            ) : (
              rewards.map((reward, index) => (
                <TableRow key={index}>
                  <TableCell className=" text-xs max-w-[120px] capitalize  2xl:text-sm  font-semibold">
                    {reward.name}
                  </TableCell>
                  <TableCell className="text-xs max-w-[200px] capitalize  2xl:text-sm">
                    {reward.description.length > 100
                      ? reward.description.slice(0, 100) + "..."
                      : reward.description}
                  </TableCell>
                  <TableCell className=" text-xs max-w-[130px]  2xl:text-sm font-semibold text-center  ">
                    {reward.bluepoints} Points
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

                        <ViewReward rewardId={reward._id} />
                        <EditReward id={reward._id} />

                        <hr
                          className="pt-2 border-t-1 block w-full"
                          style={{ borderColor: "#CCCCCD" }}
                        />
                        <DeleteReward id={reward._id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className=" w-full mt-4">
          <Pagination
            page={rewardPage}
            totalPages={totalRewardPages}
            urlParamName="page"
          />
        </div>
      </div>
      <div className="border rounded-xl p-5 mb-8  ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Product Details</h2>
          {/* <Search /> */}

          <div className="flex items-center gap-2">
            {/* <DropdownMenu>
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
            </DropdownMenu> */}
            <AddProduct />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-[#F9FAFB] border">
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Attached Bluprint</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-xs 2xl:text-sm"
                >
                  No products available
                </TableCell>
              </TableRow>
            ) : (
              products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className=" text-xs max-w-[160px]  2xl:text-sm  font-semibold">
                    <div className="flex items-center gap-2">
                      <Image
                        src={product.image}
                        alt="watch"
                        width={70}
                        className="rounded-md"
                        height={70}
                      />
                      <p className=" capitalize">{product.name}</p>
                    </div>
                  </TableCell>

                  <TableCell className=" text-xs max-w-[160px] capitalize  2xl:text-sm  ">
                    {product.description.length > 100
                      ? product.description.slice(0, 100) + "..."
                      : product.description}
                  </TableCell>
                  <TableCell className=" text-xs max-w-[50px] font-semibold text-center truncate  2xl:text-sm  ">
                    {product.attachedBluePoints} Points
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

                        {/* <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                          View Reward
                        </Button> */}
                        <EditProduct id={product._id} />
                        {/* <Button
                          className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black
                         hover:text-white"
                        >
                          Edit Reward
                        </Button> */}

                        <hr
                          className="pt-2 border-t-1 block w-full"
                          style={{ borderColor: "#CCCCCD" }}
                        />

                        <Dialog>
                          <DialogTrigger
                            ref={modalRef}
                            className="bg-[#D3175233] text-sm py-2.5 text-red-500 font-semibold w-full rounded-md mb-2"
                          >
                            Delete Reward
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Delete this reward permanently?
                              </DialogTitle>
                            </DialogHeader>
                            <div className="flex items-center pt-4 justify-center gap-3">
                              <Button
                                variant="outline"
                                onClick={async () => {
                                  await deleteProduct(product._id);
                                  toast.success("Product deleted successfully");
                                  if (modalRef.current)
                                    modalRef.current.click();
                                }}
                                className="bg-[#D31752] text-white font-semibold w-full  py-3 text-sm rounded-md"
                              >
                                Yes
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  if (modalRef.current)
                                    modalRef.current.click();
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className=" w-full mt-4">
          <Pagination
            page={productPage}
            totalPages={totalProductPages}
            urlParamName="productPage"
          />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
