import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GrLanguage } from "react-icons/gr";
import { PiUsersThree } from "react-icons/pi";
import { AiOutlineRight } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";

const Card = () => {
  return (
    <div
      className="p-4 rounded-xl"
      style={{ boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.1)" }}
    >
      <div
        class="w-full flex flex-col md:flex-row rounded-xl"
        style={{ height: "260px" }}
      >
        <div className="relative py-2 rounded-xl overflow-hidden">
          <Image
            src={"https://tailwindcss.com/img/card-left.jpg"}
            width={500}
            height={500}
            alt="cover"
            className="rounded-xl cover"
          />
        </div>
        <div class="px-4 flex flex-col justify-between">
          <div class="space-y-1">
            <div className="flex justify-between items-center">
              <div class="text-xs text-[#38B6FF] flex items-center">
                Category
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <HiDotsVertical size={28} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div class="text-black font-bold">
              Group Name Goes here. Group Name Goes here.
            </div>
            <div>
              <div className="flex text-xs space-x-2 items-center">
                <GrLanguage />
                <div>Public</div>
              </div>
              <div className="flex text-xs space-x-2 items-center">
                <PiUsersThree />
                <div>2k members</div>
              </div>
              <div className="text-[#868686] text-xs">Created May 20, 2024</div>
            </div>
            <div className="text-sm">
              Join a thriving community of professional and aspiring live
              streamers and creators...
            </div>
            <div className="text-[#38B6FF] w-full flex justify-end">
              <button className="border-2 border-[#38B6FF] flex items-center rounded-md px-3 py-1">
                View <AiOutlineRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
