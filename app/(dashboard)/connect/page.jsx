import React from "react";
import Connects from "@/components/shared/Connects";
import { getAllGroups } from "@/database/actions/connect.action";

const page = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 1;
  const name = searchParams.name || undefined;

  const allGroups = await getAllGroups({ page, limit: 6, name });
  return (
    <Connects
      groups={allGroups.groups}
      totalPages={allGroups.totalPages}
      page={page}
    />
  );
};

export default page;
