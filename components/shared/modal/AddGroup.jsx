"use client";
import React, { useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuMoveRight } from "react-icons/lu";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { toast } from "react-toastify";
import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { generatePermittedFileTypes } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import { createGroup } from "@/database/actions/connect.action";

const AddReward = () => {
  // Form state
  const [groupType, setGroupType] = useState("");
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  let uploadedImageUrl = [];

  if (files.length > 0) {
    if (files.length > 1) {
      toast.error("You can only upload one image for connect cover");
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
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!groupType) {
      newErrors.groupType = "Group Type is required";
    }
    if (!groupName) {
      newErrors.groupName = "Group Name is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Logic for form submission (e.g., API request)

      if (files.length === 0) {
        return toast.error("Please upload an image");
      }

      setLoading(true);
      let uploadedImagesUrl = [];

      toast.loading("Creating Connect...");

      if (files.length > 0) {
        const uploadedImages = await startUpload(files);
        if (!uploadedImages) {
          setLoading(false);
          return;
        }
        uploadedImages.map((img) => uploadedImagesUrl.push(img.url));
      }

      const data = {
        name: groupName,
        about: description,
        type: groupType,
        bannerImage: uploadedImagesUrl[0],
        category: "general",
      };
      const res = await createGroup(data);
      if (res.status !== 200) {
        toast.dismiss();
        setLoading(false);
        return toast.error("Failed to create connect");
      }
      toast.dismiss();
      toast.success(" Connect created successfully");

      setGroupType("");
      setGroupName("");
      setDescription("");
      setFiles([]);
      setLoading(false);
      uploadedImageUrl = [];
      setErrors({
        groupType: "",
        groupName: "",
        description: "",
      });
      if (modalRef.current) {
        modalRef.current.click();
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        ref={modalRef}
        className="bg-[#38B6FF] border-2 border-[#38B6FF] text-white font-bold px-4 py-2.5 text-sm rounded-md"
      >
        Add Group
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[600px] text-sm text-black "
        style={{ backgroundColor: "white" }}
      >
        <DialogHeader className={`flex justify-start items-start `}>
          <DialogTitle className="text-lg font-bold">Add Group</DialogTitle>
          <p className="text-sm text-slate-600">
            You can add the groups from here to list
          </p>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="h-96 2xl:h-full pr-2 space-y-4 overflow-auto"
        >
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="groupType">Group Type</label>
            <select
              id="groupType"
              value={groupType}
              onChange={(e) => setGroupType(e.target.value)}
              className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
            >
              <option value="">Select Group Type</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>

            {errors.groupType && (
              <p className="text-red-600 text-xs">{errors.groupType}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="groupName">Group Name</label>
            <input
              placeholder="name"
              id="groupName"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
            />
            {errors.groupName && (
              <p className="text-red-600 text-xs">{errors.groupName}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full mb-2">
            <label htmlFor="description">Description</label>
            <Textarea
              placeholder="Enter Event Description here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-[#38B6FF]/10 text-xs h-28 rounded-md"
            />
            {errors.description && (
              <p className="text-red-600 text-xs">{errors.description}</p>
            )}
          </div>

          {files.length > 0 ? (
            <div className="w-full flex justify-center  pt-4 items-center gap-2 mt-2">
              {files.map((file, index) => (
                <div key={index} className=" w-full h-40 2xl:h-44 relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Upload"
                    width={400}
                    height={400}
                    objectFit="cover"
                    className="rounded-md w-full h-full object-cover object-center"
                  />
                  <button
                    type="button"
                    className={`text-xs  2xl:text-sm font-semibold absolute top-3 right-3 h-fit text-white bg-red-600
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
              ))}
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
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg py-3 bg-[#38B6FF] inline-flex items-center justify-center text-white gap-3 font-semibold"
          >
            Add Group
            <LuMoveRight size={20} />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReward;
