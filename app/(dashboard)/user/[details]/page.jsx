import React from "react";
import UserDetails from "@/components/shared/UserDetails";
import { getUserById } from "@/database/actions/user.action";
const page = async ({ params: id }) => {
  const userDetails = await getUserById(id.details);
  return <UserDetails userDetails={userDetails.user} />;
};

export default page;
