"use client";
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { MdMessage } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import { FaArrowRightLong } from "react-icons/fa6";
import { io } from "socket.io-client";
import { AiFillMinusCircle } from "react-icons/ai";

// Initialize Socket.IO
const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

const AddPost = ({ users }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const senderId = "bluProTeamId4fa3b926e43a"; // Admin sender ID

  // Search Filter
  const filteredUsers = users.filter(
    (user) =>
      (user.name?.toLowerCase() || "").includes(search.toLowerCase()) &&
      !user.isAdmin
  );

  // Handle User Selection
  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Select/Deselect All Users
  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user._id));
    }
  };

  // Handle Message Broadcast
  const sendMessage = async () => {
    const messageText = document
      .getElementById("broadcastMessage")
      .value.trim();
    if (!messageText) return toast.error("Message cannot be empty!");
    if (selectedUsers.length === 0)
      return toast.error("Select at least one user!");

    setLoading(true);
    try {
      socket.emit("broadcast-message", {
        sender: senderId,
        text: messageText,
        mediaUrl: "",
        userIds: selectedUsers,
      });

      toast.success("Message sent successfully!");
      setSelectedUsers([]); // Reset selection
      modalRef.current?.click(); // Close modal
    } catch (error) {
      console.error("Broadcast error:", error);
      toast.error("Failed to send message!");
    } finally {
      setLoading(false);
    }
  };

  const removeFromSelected = (userId) => {
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };

  return (
    <Dialog>
      <DialogTrigger ref={modalRef} asChild>
        <button className="px-3 bg-[#38B6FF] inline-flex items-center gap-2 text-white font-semibold text-center py-3.5 rounded-md">
          Broadcast Message <MdMessage className="text-xl" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-[90vw] sm:max-w-[850px] text-sm text-black max-h-[94vh] overflow-y-auto bg-white">
        <div className="flex flex-col gap-3 py-5">
          <h2 className="font-bold text-xl">Send Broadcast Message</h2>
          <p className="text-sm text-slate-600">
            Send a message to selected users
          </p>

          {/* Search Input */}
          <div className="relative w-full">
            <input
              className="appearance-none text-sm w-full pl-10 py-3 rounded-[8px] bg-[#F4F5F6] border border-gray-300"
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute left-3 inset-y-0 flex items-center">
              <Image src="/search.svg" alt="search" width={17} height={17} />
            </div>
          </div>

          {/* Select All */}
          <div className="inline-flex items-center gap-2">
            <Checkbox
              className="w-6 h-6 rounded-full"
              checked={selectedUsers.length === filteredUsers.length}
              onCheckedChange={toggleSelectAll}
            />
            <h4>Select All Users</h4>
          </div>

          {/* User List */}
          <div className="flex flex-col gap-2 max-h-[25svh] overflow-y-auto w-full">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="w-full flex border rounded-xl border-[#F1F2F3] px-4 py-4 items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl overflow-hidden">
                    <Image
                      src={user.imageUrl || "/avatar.svg"}
                      alt="avatar"
                      width={47}
                      height={47}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-xs 2xl:text-sm capitalize">{user.name}</p>
                </div>
                <Checkbox
                  className="w-6 h-6 rounded-full"
                  checked={selectedUsers.includes(user._id)}
                  onCheckedChange={() => toggleUser(user._id)}
                />
              </div>
            ))}
          </div>

          <div className="py-2 w-full">
            <h2 className="font-semibold mb-2">Selected Users</h2>
            <div className="flex flex-wrap gap-2">
              {filteredUsers
                .filter((user) => selectedUsers.includes(user._id))
                .map((user) => (
                  <div
                    key={user._id}
                    className=" border-[#D9D9D9] border flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs 2xl:text-sm capitalize"
                  >
                    {user.name}
                    <button
                      onClick={() => removeFromSelected(user._id)}
                      className="focus:outline-none"
                    >
                      <AiFillMinusCircle className="text-[#38B6FF] text-lg" />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* Message Input */}
          <h2 className="font-semibold ">Write Message</h2>
          <textarea
            id="broadcastMessage"
            className="w-full rounded-xl p-4 text-sm bg-[#38B6FF1A] border border-[#38B6FF] h-32"
            placeholder="Write your message here..."
          ></textarea>

          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-3 bg-[#38B6FF] inline-flex w-full justify-center items-center gap-2 text-white font-semibold py-3.5 rounded-xl"
          >
            {loading ? "Sending..." : "Send Message"}
            <FaArrowRightLong className="text-xl" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPost;
