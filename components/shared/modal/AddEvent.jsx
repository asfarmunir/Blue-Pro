"use client";
import React, { useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { generatePermittedFileTypes } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import { toast } from "react-toastify";
import { createActivity } from "@/database/actions/activity.action";
import { AiFillMinusCircle } from "react-icons/ai";
import { Checkbox } from "@/components/ui/checkbox";
import { RxCross2 } from "react-icons/rx";

const AddEvent = ({ users }) => {
  const [eventType, setEventType] = useState("quick");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState(null);
  console.log("🚀 ~ AddEvent ~ files:", files);
  const [loading, setLoading] = useState(false);

  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      (user.creator_information?.toLowerCase() || "").includes(
        search.toLowerCase()
      ) && !user.isAdmin
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

  const removeFromSelected = (userId) => {
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };
  const modalRef = useRef(null);

  const handleUpload = async () => {
    if (!files) return null;

    // setUploading(true);
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "bluepro");
    data.append("cloud_name", "dbfn18wm7");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbfn18wm7/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const fileData = await res.json();
      // setUploading(false);
      return fileData.secure_url;
    } catch (error) {
      // setUploading(false);
      toast.error("Media upload failed");
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!name || !description || !link) {
      return toast.error("Please fill all fields");
    }

    if (eventType === "schedule" && (!scheduleDate || !scheduleTime)) {
      return toast.error("Please fill all fields");
    }

    if (files.length === 0) {
      return toast.error("Please upload an image");
    }
    if (selectedUsers.length === 0) {
      return toast.error("Please select at least one user");
    }
    setLoading(true);

    toast.loading("Adding Event...");

    // if (files.length > 0) {
    //   const uploadedImages = await startUpload(files);
    //   if (!uploadedImages) {
    //     setLoading(false);
    //     return;
    //   }
    //   uploadedImages.map((img) => uploadedImagesUrl.push(img.url));
    // }
    const mediaUrl = await handleUpload();
    if (files && !mediaUrl) return;
    const eventData = {
      title: name,
      type: eventType,
      description,
      externalLink: link,
      scheduleDate,
      startTime: scheduleTime,
      media: mediaUrl,
      usersToShow: selectedUsers,
      isVideo: files.type.includes("video"),
    };

    const response = await createActivity(eventData, "/activity");
    if (response.status !== 201) {
      toast.dismiss();
      toast.error("Failed to add event");
      setLoading(false);
      return;
    }

    toast.dismiss();
    toast.success("Event added successfully");
    console.log("Event data to submit:", eventData);
    setName("");
    setDescription("");
    setLink("");
    setScheduleDate("");
    setScheduleTime("");
    setFiles(null);

    if (modalRef.current) modalRef.current.click();
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger
        ref={modalRef}
        className="bg-[#38B6FF] text-white font-bold inline-flex items-center gap-2 px-4 py-3.5 text-sm 2xl:text-base rounded-md"
      >
        Add Event
        <BiSolidMessageSquareAdd className="ml-2" size={24} />
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[750px] max-h-[95svh] overflow-y-auto text-sm text-black"
        style={{ backgroundColor: "white" }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {eventType === "quick" ? "Add Quick Event" : "Schedule Event"}
          </DialogTitle>
        </DialogHeader>
        <div className="md:h-72 2xl:h-full overflow-y-auto px-3 pb-5">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="type" className="font-semibold">
              Event Type
            </label>
            <select
              id="type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full p-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-md"
            >
              <option value="quick">Quick Event</option>
              <option value="schedule">Schedule Event</option>
            </select>
          </div>
          <div className="w-full mt-4 flex flex-col md:flex-row items-center gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="name" className="font-semibold">
                Enter Title
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Event Title here"
                type="text"
                className="w-full p-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="link" className="font-semibold">
                External Link
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="URL"
                id="link"
                className="w-full p-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-md"
              />
            </div>
          </div>
          <div className="relative w-full mt-4">
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
          <div className="inline-flex items-center gap-2 my-3">
            <Checkbox
              className="w-5 h-5 rounded-full"
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
                  <p className="text-xs 2xl:text-sm capitalize">
                    {user.creator_information}
                  </p>
                </div>
                <Checkbox
                  className="w-5 h-5 rounded-full"
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
                    {user.creator_information}
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
          <div className="w-full mt-2 flex items-center gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Event Description here"
                className="w-full p-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm h-28 rounded-md"
              />
            </div>
          </div>
          {eventType === "schedule" && (
            <div className="w-full mt-2 flex items-center gap-5">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="scheduleDate" className="font-semibold">
                  Choose Date
                </label>
                <input
                  id="scheduleDate"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  type="date"
                  className="w-full p-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="scheduleTime" className="font-semibold">
                  Choose Time
                </label>
                <input
                  id="scheduleTime"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  type="time"
                  className="w-full p-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-md"
                />
              </div>
            </div>
          )}
          {/* <div className="w-full p-4 justify-center flex flex-col items-center mt-3 gap-2 border border-dotted rounded-lg">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <h2 className="2xl:text-lg font-semibold">Upload Media Here</h2>
            <p className="text-sm text-center">
              Supported media files:{" "}
              <span className="px-1 text-red-600">jpg, mp4, webp</span>
            </p>
          </div> */}
          {files ? (
            <div className="w-full relative flex justify-center overflow-hidden h-[200px] pt-4 items-center gap-2 mt-2">
              {files && files.type.includes("image") ? (
                <Image
                  src={URL.createObjectURL(files)}
                  width={300}
                  height={200}
                  alt="media"
                  className="rounded-md"
                />
              ) : files && files.type.includes("video") ? (
                <video
                  src={URL.createObjectURL(files)}
                  width={300}
                  height={200}
                  controls
                  className="rounded-md w-full h-full object-contain"
                />
              ) : null}
              <button
                type="button"
                className={`text-xs absolute right-4 top-4  2xl:text-sm font-semibold h-fit text-white bg-red-600
                      transition-all duration-500 
                       px-2  py-2 rounded-full
                }`}
                onClick={() => setFiles(null)}
              >
                <RxCross2 />
              </button>
            </div>
          ) : (
            <div className="w-full border mt-4 border-dashed border-[#38B6FF] relative p-4 pt-8 justify-center flex flex-col items-center gap-2  rounded-lg">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFiles(e.target.files[0])} // Store only the first file
                placeholder="public"
                className="w-full opacity-0 p-3.5 py-12 absolute top-0 bg-[#38B6FF]/10 text-xs rounded-md"
              />
              <Image
                src="/upload.svg"
                alt="Upload"
                width={30}
                height={30}
                className=" cursor-pointer"
              />
              <h2 className="2xl:text-lg font-semibold">Upload Media Here</h2>
              <p className="text-sm">
                Supported media files:
                <span className="px-1 text-red-600"> jpg, mp4, webp</span>
              </p>
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full disabled:opacity-50 rounded-lg py-3 bg-[#38B6FF] inline-flex capitalize items-center justify-center text-white gap-3 font-semibold"
        >
          {eventType === "quick" ? "Add" : "Schedule"} Event
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;
