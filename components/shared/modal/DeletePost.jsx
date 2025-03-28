"use client";
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import axios from "axios";
const AddPost = ({ id, type, onDeleteSuccess }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (type === "feed") {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/feed/deleteFeed/${id}`
        );
      } else {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/learn/deleteLearn/${id}`
        );
      }

      toast.success("Post deleted successfully");
      if (modalRef.current) modalRef.current.click();
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      console.error("Error deleting Post:", error);
      toast.error("Failed to delete Post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger ref={modalRef} asChild>
        <Button className="bg-[#D3175233] w-full hover:text-white rounded-md mb-2 text-red-600">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[550px] text-sm text-black"
        style={{ backgroundColor: "white" }}
      >
        <div className="flex items-center justify-start flex-col gap-3 py-5">
          <Image src="/delete.svg" alt="delete" width={60} height={60} />
          <h2 className="font-semibold text-lg capitalize 2xl:text-xl">
            Are You Sure You want to delete?
          </h2>
          <p className="text-sm text-slate-600">
            Do you really want to delete the Post?
          </p>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full rounded-lg py-3 mt-5 bg-[#38B6FF] inline-flex items-center justify-center text-white gap-3 font-semibold"
          >
            {loading ? "Deleting..." : "Yes"}
          </button>
          <button
            onClick={() => {
              if (modalRef.current) modalRef.current.click();
            }}
            className="w-full rounded-lg mb-3 text-[#38B6FF] inline-flex items-center justify-center underline gap-3 font-semibold"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPost;
