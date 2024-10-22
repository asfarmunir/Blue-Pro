import React from "react";
import ConnectDetails from "@/components/shared/ConnectDetails";
import {
  createJoinRequest,
  getGroupById,
} from "@/database/actions/connect.action";
const page = async ({ params: { id } }) => {
  const connectDetails = await getGroupById(id);

  return <ConnectDetails details={connectDetails.group} />;
};

export default page;
