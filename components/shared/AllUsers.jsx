"use client";

import { useState, useEffect } from "react";
import { CiCircleChevDown } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import BlockUser from "@/components/shared/BlockUser";
import BroadcastMessage from "@/components/shared/modal/BroadcastMessage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

function User({ allUsers = [] }) {
  const [users, setUsers] = useState(allUsers?.users || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (
      searchTerm &&
      searchTerm.length > 0 &&
      allUsers?.users &&
      allUsers?.users.length > 0
    ) {
      const filteredUsers = allUsers.users.filter((user) =>
        user.creator_information
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setUsers(filteredUsers);
    } else {
      setUsers(allUsers?.users || []);
    }
  }, [searchTerm, allUsers]);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log("🚀 ~ User ~ paginatedUsers:", paginatedUsers);

  return (
    <div className="bg-white">
      <div className="border rounded-xl py-7 mb-4 px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Users Details</h2>
          <div className="flex items-center gap-8">
            {/* Search Input */}
            <div className="relative ">
              <input
                className="appearance-none text-sm 2xl:text-base  hover:border pl-10  hover:border-gray-400 transition-colors rounded-[8px] w-full py-3 2xl:py-4 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline bg-[#38B6FF]/10"
                id="username"
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 inset-y-0 flex items-center">
                <Image src="/search.svg" alt="search" width={17} height={17} />
              </div>
            </div>

            <BroadcastMessage users={allUsers.users} />
          </div>
        </div>

        {/* Users Table */}
        <Table>
          <TableHeader className="bg-[#F9FAFB] border">
            <TableRow>
              <TableHead>PID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Monthly Live Duration</TableHead>
              <TableHead className="text-center">Bluepoints</TableHead>
              <TableHead className="text-center">Highest Rank</TableHead>
              <TableHead>Monthly Earning</TableHead>
              <TableHead>Monthly Followers</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => {
                if (user.isAdmin) return null;
                return (
                  <TableRow key={user._id}>
                    <TableCell className="capitalize text-xs max-w-[120px] 2xl:text-sm">
                      #{user.data_id}
                    </TableCell>
                    <TableCell className="capitalize text-xs max-w-[120px] 2xl:text-sm font-semibold">
                      {user.creator_information || "N/A"}
                    </TableCell>
                    <TableCell className="text-xs max-w-[120px] 2xl:text-sm">
                      <p className="bg-[#E6F7F8] text-[#00A3B4] flex items-center justify-center w-fit gap-2 text-center font-bold px-3 py-2 rounded-full">
                        <span className="h-2 w-2 rounded-full bg-[#00A3B4]"></span>
                        {user.userType || "User"}
                      </p>
                    </TableCell>
                    <TableCell className="text-xs max-w-[100px] text-center 2xl:text-sm">
                      {user.live_duration_this_month || 0} hours
                    </TableCell>
                    <TableCell className="text-xs max-w-[180px] 2xl:text-sm">
                      {user.diamonds_this_month || "N/A"}
                    </TableCell>
                    <TableCell className="text-xs max-w-[180px] text-center 2xl:text-sm">
                      {user.highest_blu_rank_in_last_3_months}
                    </TableCell>
                    <TableCell className="text-xs max-w-[180px] text-center 2xl:text-sm">
                      {user.earnings_this_month}
                    </TableCell>
                    <TableCell className="text-xs max-w-[180px] text-center 2xl:text-sm">
                      {user.live_followers_this_month || 0}
                    </TableCell>
                    <TableCell className="max-w-[130px] text-xs 2xl:text-sm">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <CiCircleChevDown className="text-3xl" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="px-4 pt-4 bg-white"
                        >
                          <Link href={`/user/${user._id}`}>
                            <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                              View User
                            </Button>
                          </Link>
                          <Link href={`/user/chat/${user._id}`}>
                            <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                              Chat with User
                            </Button>
                          </Link>
                          {/* <hr
                          className="pt-2 border-t-1 block w-full"
                          style={{ borderColor: "#CCCCCD" }}
                        />
                        <BlockUser
                          id={user.blu_id}
                          isBlocked={user.isBlocked}
                        /> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-sm text-gray-500 py-4"
                >
                  No User Record Found
                </td>
              </tr>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}

        {totalPages > 1 && (
          <div
            className={` w-full flex items-center justify-between my-6    gap-4 `}
          >
            <button
              className=" bg-none disabled:opacity-50 flex items-center gap-2 border font-semibold border-[#D0D5DD]  py-1.5 px-3 rounded-md"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5 2xl:w-6 2xl:h-6 text-primary-50" />
              Previous
            </button>
            <p className="text-primary-50 text-xs 2xl:text-sm">{`${currentPage} of ${totalPages}`}</p>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className=" bg-none disabled:opacity-50 flex items-center gap-2 border font-semibold border-[#D0D5DD]  py-1.5 px-3 rounded-md"
            >
              Next
              <ChevronRight className="w-5 h-5 2xl:w-6 2xl:h-6 text-primary-50" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
