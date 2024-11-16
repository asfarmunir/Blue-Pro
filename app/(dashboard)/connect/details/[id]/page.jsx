import React from "react";
import ConnectDetails from "@/components/shared/ConnectDetails";
import {
  createJoinRequest,
  getGroupById,
} from "@/database/actions/connect.action";
import { getPostsOfGroup } from "@/database/actions/post.action";
const page = async ({ params: { id } }) => {
  const connectDetails = await getGroupById(id);
  const connectPosts = await getPostsOfGroup(id);
  console.log("🚀 ~ page ~ connectPosts:", connectPosts);

  return (
    <ConnectDetails details={connectDetails.group} posts={connectPosts.posts} />
  );
};

export default page;
