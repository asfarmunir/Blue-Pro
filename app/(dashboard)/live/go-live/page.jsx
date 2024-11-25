"use client";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { createIngress } from "@/database/actions/stream.action";
import { useSession } from "next-auth/react";
import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { generatePermittedFileTypes } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const GoLive = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({
    title: "",
    tags: "",
    externalUrl: "",
    description: "",
  });

  const router = useRouter();

  const session = useSession();

  let uploadedImageUrl = [];

  if (files.length > 0) {
    if (files.length > 1) {
      toast.error("You can only upload one image for product");
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

  const validateFields = () => {
    const newErrors = {
      title: "",
      tags: "",
      externalUrl: "",
      description: "",
    };
    if (!title) newErrors.title = "Title is required.";
    if (!tags) newErrors.tags = "Tags are required.";
    if (externalUrl && !/^https?:\/\/[^\s]+$/.test(externalUrl))
      newErrors.externalUrl = "Invalid URL format.";
    if (!description) newErrors.description = "Description is required.";
    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    if (files.length === 0) {
      toast.error("Please upload an image");
      return;
    }

    setLoading(true);
    let uploadedImagesUrl = [];

    toast.loading("Creating Live Stream...");

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        setLoading(false);
        return;
      }
      uploadedImages.map((img) => uploadedImagesUrl.push(img.url));
    }

    const data = {
      name: title,
      tags: tags.split(" "),
      externalUrl,
      description,
      thumbnail: uploadedImagesUrl[0],
    };
    toast.dismiss();
    try {
      const res = await createIngress(session.data?.user._id, data);
      if (res.status !== 200) {
        toast.error("Failed to create stream");
        setLoading(false);
        return;
      }
      toast.success("Stream created successfully");
      router.push("/live");
      setLoading(false);
    } catch (error) {
      console.error("Failed to create stream:", error);
    }
  };

  return (
    <div className="w-full p-3 2xl:p-4 space-y-4 bg-slate-50 pb-16">
      <Link href={"/live"} className="flex items-center gap-2">
        <FaArrowLeftLong className="text-xl" />
        <div className="text-lg font-semibold">Back </div>
      </Link>
      <h3 className="text-xl 2xl:text-2xl font-bold">Go Live</h3>

      <div className="w-full flex-col md:flex-row-reverse flex gap-5 mt-8 pb-10">
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-900 p-4 md:p-8 w-full md:w-[40%] rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-5 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h11M9 21V3m-6 7l3-3m6 0l3-3m6 7v7a2 2 0 002 2h2M7 16H5a2 2 0 00-2 2v5a2 2 0 002 2h2m10-7h2m-2 4h2m2-8a2 2 0 01-2 2h-6m2 8h2a2 2 0 002-2v-7a2 2 0 00-2-2h-2"
              />
            </svg>
            Instructions for Starting a Live Stream
          </h2>
          <ol className="list-decimal ml-5 space-y-2 text-sm">
            <li>
              <span className="font-medium">Create a live stream:</span> Fill
              out the form on this page and submit to create your live stream
              session.
            </li>
            <li>
              <span className="font-medium">Set up OBS:</span>- Open{" "}
              <strong>OBS</strong> and navigate to <em>Settings &gt; Stream</em>
              . - Choose <strong>Custom</strong> as the stream service. - Copy
              the <strong>Server URL</strong> and <strong>Stream Key</strong>{" "}
              from this dashboard into OBS.
            </li>
            <li>
              <span className="font-medium">Go Live from OBS:</span> Start
              streaming by clicking the <strong>Start Streaming</strong> button
              in OBS.
            </li>
            <li>
              <span className="font-medium">Start Live on Dashboard:</span> Once
              OBS is streaming, click the <strong>Start Live</strong> button on
              this dashboard to make the stream publicly visible.
            </li>
            <li>
              <span className="font-medium">End the Live Stream:</span>- Stop
              streaming from OBS by clicking the <strong>Stop Streaming</strong>{" "}
              button. - Return to this dashboard and click the{" "}
              <strong>End Livestream</strong> button to finalize the session.
            </li>
          </ol>
          <p className="mt-4 text-xs text-gray-700">
            <em>
              Note: Make sure your internet connection is stable to avoid
              interruptions during the live stream.
            </em>
          </p>
        </div>

        <div className="bg-white rounded-md shadow w-full h-fit md:w-[60%] p-6">
          <h2 className="text-lg border-b pb-4 2xl:text-xl font-bold">
            Session Details
          </h2>

          {/* Live Session Title */}
          <div className="flex flex-col gap-1 my-4 w-full">
            <label
              htmlFor="name"
              className="text-sm font-semibold 2xl:text-base"
            >
              Live Session Title
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 bg-[#38B6FF]/10 text-xs rounded-lg"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title}</p>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1 my-3 w-full">
            <label
              htmlFor="tag"
              className="text-sm font-semibold 2xl:text-base"
            >
              Tags
            </label>
            <input
              type="text"
              id="tag"
              placeholder="Enter tags (e.g., #tag)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-4 bg-[#38B6FF]/10 text-xs rounded-lg"
            />
            {errors.tags && (
              <p className="text-red-500 text-xs">{errors.tags}</p>
            )}
          </div>

          {/* External URL */}
          <div className="flex flex-col gap-1 my-3 w-full">
            <label
              htmlFor="externalUrl"
              className="text-sm font-semibold 2xl:text-base"
            >
              External URL
            </label>
            <input
              type="text"
              id="externalUrl"
              placeholder="Enter URL (e.g., www.facebook.com)"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              className="w-full p-4 bg-[#38B6FF]/10 text-xs rounded-lg"
            />
            {errors.externalUrl && (
              <p className="text-red-500 text-xs">{errors.externalUrl}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1 my-3 w-full">
            <label
              htmlFor="description"
              className="text-sm font-semibold 2xl:text-base"
            >
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 bg-[#38B6FF]/10 text-xs h-28 rounded-lg"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col gap-1 my-3 w-full">
            <label
              htmlFor="thumbnail"
              className="text-sm font-semibold 2xl:text-base"
            >
              Upload Thumbnail
            </label>
            {files.length > 0 ? (
              <div className="w-full flex justify-center  pt-4 items-center gap-2 mt-2">
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
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-blue-500 disabled:opacity-40 w-full font-semibold my-3 p-2.5 text-white rounded-lg"
          >
            Create Stream
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoLive;
