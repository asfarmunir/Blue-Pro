"use client";
import React from "react";
import { Button } from "../ui/button";
import { blockUser } from "@/database/actions/user.action";
import { toast } from "react-toastify";

const BlockUser = ({ id, isBlocked }) => {
  const handleSubmit = async () => {
    const res = await blockUser(id);
    if (res.status !== 200) {
      toast.error("something went wrong");
      return;
    }
    toast.info("User Status Updated!");
  };

  return (
    <Button
      onClick={handleSubmit}
      className={` ${
        isBlocked ? " bg-green-500" : "bg-red-600"
      } w-full px-12 rounded-md mb-2 font-bold hover:text-white`}
    >
      {isBlocked ? "Unblock User" : "Block User"}
    </Button>
  );
};

export default BlockUser;
