"use client";
import { handleJoinRequest } from "@/database/actions/connect.action";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RequestApproval = ({ groupId, userId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleClick = async (action) => {
    setLoading(true);
    const res = await handleJoinRequest(groupId, userId, action);
    if (res.status !== 200) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success(`Request has been ${action}`);
    router.refresh();
  };

  return (
    <div className=" flex items-center gap-2">
      <button
        disabled={loading}
        onClick={() => handleClick("disapprove")}
        className="bg-[#FEF3F2] text-red-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full"
      >
        <Image src="/reject.svg" alt="eye" width={18} height={18} />
        Decline
      </button>
      <button
        disabled={loading}
        onClick={() => handleClick("approve")}
        className="bg-[#E6F6EE] text-green-500 flex items-center  justify-center w-fit gap-1 text-center font-bold px-3  py-2 rounded-full"
      >
        <Image src="/accept.svg" alt="eye" width={18} height={18} />
        Approve
      </button>
    </div>
  );
};

export default RequestApproval;
