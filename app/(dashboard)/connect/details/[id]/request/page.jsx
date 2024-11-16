import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import Search from "@/components/shared/Search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPendingJoinRequestsOfGroup } from "@/database/actions/connect.action";
import RequestApproval from "@/components/shared/RequestApproval";

const page = async ({ params: { id } }) => {
  const requests = await getPendingJoinRequestsOfGroup(id);
  console.log("🚀 ~ page ~ requests:", requests);
  return (
    <div className=" p-3 2xl:p-4 bg-slate-50">
      <Link
        href={`/connect/details/${id}`}
        className="flex items-center gap-2 mb-3"
      >
        <FaArrowLeftLong className="text-xl" />
        <div className="text-lg font-semibold">Back </div>
      </Link>
      <h3 className=" text-xl 2xl:text-2xl font-bold  ">Group Requests</h3>
      <div className="border rounded-xl p-5 my-8 bg-white  ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Pending Approvals</h2>
          <div className="flex items-center gap-5">
            <Search />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-[#F9FAFB] border">
            <TableRow>
              <TableHead>PID</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Request Date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests &&
              requests.pendingRequests &&
              requests.pendingRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell className=" text-xs max-w-[120px]  2xl:text-sm  font-semibold">
                    #{index + 1}
                  </TableCell>
                  <TableCell className="text-xs max-w-[130px] 2xl:text-sm">
                    <div className="flex items-center  flex-col ">
                      <p className=" font-semibold text-lg capitalize">
                        {request.username}
                      </p>
                      <p className="  text-xs 2xl:text-sm">
                        {request.userEmail}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className=" text-xs max-w-[180px] text-center 2xl:text-sm text-slate-600  ">
                    {new Date(request.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="  max-w-[130px] text-xs 2xl:text-sm  ">
                    <RequestApproval
                      groupId={request.groupId}
                      userId={request.userId}
                      path={`/connect/details/${id}/request`}
                    />
                  </TableCell>
                </TableRow>
              ))}
            {!requests.pendingRequests.length && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No Pending Requests
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
