import React from "react";
import { getAllGroups } from "@/database/actions/connect.action";
import FeedandLearn from "@/components/shared/FeedAndLearn";

const Page = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 1;
  const name = searchParams.name || undefined;

  const allGroups = await getAllGroups({ page, limit: 6, name });
  return (
    <FeedandLearn
      groups={allGroups.groups}
      totalPages={allGroups.totalPages}
      page={page}
    />
  );
};

export default Page;
