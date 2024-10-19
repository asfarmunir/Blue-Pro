import Summary from "@/components/dashboard/summary/Summary";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import users from "./users.json";
import Main from "@/components/dashboard/Activities/Main";
import { getRecentUsers } from "@/database/actions/user.action";

const jobSeekers = async (pageNo = 1) => {
  const jobs = await users;
  const limit = 10;
  const startIndex = (pageNo - 1) * limit;
  const endIndex = startIndex + limit;
  const slicedData = jobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(jobs.length / limit);

  return {
    data: slicedData,
    pagination: {
      pageNo,
      limit,
      totalPages,
      totalRecords: jobs.length,
    },
  };
};

const Dashboard = async ({ searchParams }) => {
  const { page } = searchParams;
  const { data, pagination } = await jobSeekers(page);
  const session = await getServerSession(authOptions);

  const recentUsers = await getRecentUsers();
  return (
    <div className="  space-y-4">
      <Summary />
        
            <Main data={data} pagination={pagination} recentUsers={recentUsers} />
      
    </div>
  );
};

export default Dashboard;
