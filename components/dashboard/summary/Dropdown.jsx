import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex justify-center items-center space-x-2 border rounded-lg px-2 py-1">
          <div className="text-xs">Last Monthly</div>
          <IoIosArrowDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>This Month</DropdownMenuItem>
        <DropdownMenuItem>Last Month</DropdownMenuItem>
        <DropdownMenuItem>All Users</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
