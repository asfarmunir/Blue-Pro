"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import {
  createActivity,
  getSingleActivity,
  updateActivity,
} from "@/database/actions/activity.action";

const AddEvent = ({ id }) => {
  const [eventType, setEventType] = useState("quick");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const modalRef = useRef(null);

  let uploadedImageUrl = [];

  if (files.length > 0) {
    if (files.length > 1) {
      toast.error("You can only upload one image ");
      setFiles([]);
      uploadedImageUrl = [];
    }
    files.forEach((file) => {
      const url = convertFileToUrl(file);
      uploadedImageUrl.push(url);
    });
  }
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      setFiles([]);
      uploadedImageUrl = [];
    },
    onUploadError: () => {
      toast.error("problem uploading image!");
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

  const handleSubmit = async () => {
    setLoading(true);
    let uploadedImagesUrl = [];

    toast.loading("Updating Event...");

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        setLoading(false);
        return;
      }
      uploadedImages.map((img) => uploadedImagesUrl.push(img.url));
    }

    const eventData = {
      name,
      type: eventType,
      description,
      link,
      scheduleDate,
      scheduleTime,
      image: uploadedImagesUrl.length > 0 ? uploadedImagesUrl[0] : image,
    };

    const response = await updateActivity(id, eventData, "/activity");
    if (response.status !== 200) {
      toast.dismiss();
      toast.error("Failed to Edit event");
      setLoading(false);
      return;
    }

    toast.dismiss();
    toast.success("Event Updated successfully");
    setName("");
    setDescription("");
    setLink("");
    setScheduleDate("");
    setScheduleTime("");
    setFiles([]);

    if (modalRef.current) modalRef.current.click();
    setLoading(false);
  };

  const fetchActivity = async (id) => {
    const res = await getSingleActivity(id);
    if (res.status === 200) {
      const { activity } = res;
      setEventType(activity.type);
      setName(activity.name);
      setDescription(activity.description);
      setLink(activity.link);
      setScheduleDate(activity.scheduleDate);
      setScheduleTime(activity.scheduleTime);
      setImage(activity.image);
    }
  };

  useEffect(() => {
    if (id) {
      fetchActivity(id);
      // Fetch product details
    }
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger
        ref={modalRef}
        className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black text-sm font-semibold  py-2 hover:text-white"
      >
        Edit Event
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[750px] text-sm text-black"
        style={{ backgroundColor: "white" }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Edit Event</DialogTitle>
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
          {/* {files.length > 0 ? (
            <div className="w-full flex  pt-4 items-center gap-2 mt-2">
              {files.map((file, index) => (
                <div key={index} className="w-32 h-32 relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Upload"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ))}
              <button
                type="button"
                className={`text-xs  2xl:text-sm font-semibold h-fit text-white bg-red-600
                      transition-all duration-500 
                       px-6 py-2 rounded-md
                }`}
                onClick={() => {
                  setFiles([]);
                  uploadedImageUrl = [];
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className="w-full p-4 pt-8 justify-center flex flex-col items-center gap-2 border border-dotted rounded-lg"
            >
              <>
                <input {...getInputProps()} className=" bg-red-400" />
                <Image
                  src="/upload.svg"
                  alt="Upload"
                  width={30}
                  height={30}
                  className=" cursor-pointer"
                />
              </>
              <h2 className="2xl:text-lg font-semibold">Upload Media Here</h2>
              <p className="text-sm">
                Supported media files:
                <span className="px-1 text-red-600"> jpg, mp4, webp</span>
              </p>
            </div>
          )} */}

          {files.length > 0 ? (
            <div className="w-full flex pt-4 items-center gap-2 mt-2">
              {files.map((file, index) => (
                <div key={index} className="w-32 h-32 relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Upload"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ))}
              <button
                type="button"
                className={`text-xs  2xl:text-sm font-semibold h-fit text-white bg-red-600
                      transition-all duration-500 
                       px-6 py-2 rounded-md
                }`}
                onClick={() => {
                  setFiles([]);
                  uploadedImageUrl = [];
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className="w-full p-4 pt-8 justify-center flex flex-col items-center gap-2 border border-dotted rounded-lg"
            >
              <>
                <Image
                  src={image}
                  alt="Upload"
                  width={70}
                  height={70}
                  className=" cursor-pointer rounded-md"
                />
                <input {...getInputProps()} className=" bg-red-400" />
                <h2 className="2xl:text-lg font-semibold cursor-pointer">
                  Change Image
                </h2>
              </>
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full disabled:opacity-50 rounded-lg py-3 bg-[#38B6FF] inline-flex capitalize items-center justify-center text-white gap-3 font-semibold"
        >
          {loading ? "Updating Event..." : "Update Event"}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;
