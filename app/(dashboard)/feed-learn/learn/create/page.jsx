"use client";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoArrowDown } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { useSession } from "next-auth/react";
const CreateLearn = () => {
  const { data } = useSession();
  console.log("🚀 ~ CreateLearn ~ data:", data);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "public",
    tags: "",
    media: null,
  });
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, media: e.target.files[0] }));
  };

  const handleUpload = async () => {
    if (!formData.media) return null;

    setUploading(true);
    const data = new FormData();
    data.append("file", formData.media);
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
      setUploading(false);
      return fileData.secure_url;
    } catch (error) {
      setUploading(false);
      toast.error("Media upload failed");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mediaUrl = await handleUpload();
    if (formData.media && !mediaUrl) return;

    const payload = {
      title: formData.title,
      description: formData.desc,
      category: formData.category,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      media: mediaUrl,
      isVideo: formData.media.type.includes("video"),
      userId: data.user._id,
    };
    console.log("🚀 ~ handleSubmit ~ payload:", payload);

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/learn/addLearn`,
        payload
      );
      const data = res.data;
      console.log("🚀 ~ handleSubmit ~ data:", data);
      toast.success("Post created successfully!");
      setLoading(false);
      router.push("/feed-learn");
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className=" w-full p-3 2xl:p-4 space-y-4 bg-slate-50 pb-16">
      <Link href={"/feed-learn"} className="flex items-center gap-2">
        <FaArrowLeftLong className="text-xl" />
        <div className="text-lg font-semibold">Back </div>
      </Link>
      <h3 className=" text-xl 2xl:text-2xl font-bold ">Create Learn Post</h3>

      <div className=" w-full flex-col md:flex-row flex gap-5 mt-8 pb-10">
        <div className=" bg-white rounded-md shadow w-full md:w-[60%] p-6">
          <div className="flex items-center justify-between w-full border-b mb-4 pb-4">
            <h2 className=" text-lg font-bold 2xl:text-xl">Post Preview</h2>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className=" font-bold capitalize 2xl:text-lg">
              {formData.title || "Post Title"}
            </h2>
            <p className=" w-2 h-2 rounded-full bg-[#D9D9D9]"></p>
            <h2 className=" font-bold capitalize 2xl:text-lg">
              {formData.category || "Category"}
            </h2>
          </div>{" "}
          <h2 className=" font-bold mb-2 2xl:text-lg"></h2>
          <p className="text-xs 2xl:text-sm mb-2">
            {formData.desc || "Post Description goes here..."}
          </p>
          <div className=" w-full flex items-center py-4 justify-center">
            {formData.media && formData.media.type.includes("image") ? (
              <Image
                src={URL.createObjectURL(formData.media)}
                width={300}
                height={200}
                alt="media"
                className="rounded-md"
              />
            ) : formData.media && formData.media.type.includes("video") ? (
              <video
                src={URL.createObjectURL(formData.media)}
                width={300}
                height={200}
                controls
                className="rounded-md w-full h-full"
              />
            ) : (
              <div className=" w-full h-40 bg-[#38B6FF]/10 rounded-md flex items-center justify-center">
                <p className="text-xs 2xl:text-sm text-[#38B6FF]">
                  No media uploaded
                </p>
              </div>
            )}
          </div>
          <div className="flex  items-center justify-between my-3">
            <div className=" flex gap-1 items-center">
              {formData.tags &&
                formData.tags.split(",").map((tag) => (
                  <p
                    key={tag}
                    className="bg-[#38B6FF]/15 px-2 py-1 rounded-full text-xs 2xl:text-sm text-[#38B6FF]"
                  >
                    #{tag}
                  </p>
                ))}
            </div>
            <div className=" flex gap-1 items-center">
              <div className="bg-[#FFDDDD] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
                <Image src="/no-like.svg" alt="live" width={20} height={20} />
                <p className="text-xs 2xl:text-sm font-semibold">0</p>
              </div>
              <div className="bg-[#F6F6F6] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
                <Image src="/comment.svg" alt="live" width={22} height={22} />
                <p className="text-xs 2xl:text-sm font-semibold">0</p>
              </div>
            </div>
          </div>
          <div className="my-2">
            <h2 className="flex items-center gap-2 mb-4 font-bold 2xl:text-lg">
              Comments
              <IoArrowDown className="text-lg" />
            </h2>
            <div className=" w-full pb-16 pt-12 flex flex-col items-center gap-3">
              <Image
                src="/info-circle.svg"
                width={56}
                height={56}
                alt="avatar"
              />
              <p className="text-xs 2xl:text-sm text-center">
                No comments yet. Be the first to comment.
              </p>
            </div>
            <div className=" w-full flex bg-[#38B6FF]/15 p-2 px-3  rounded-xl  items-center  justify-between mb-2 gap-4">
              <div className="flex items-center gap-1.5">
                <Image
                  src="/avatar-blue.svg"
                  width={46}
                  height={46}
                  alt="profile"
                  className="rounded-full"
                />
                <input
                  type="text"
                  className=" border-none bg-transparent text-slate-600"
                  placeholder="Add a comment"
                />
              </div>
              <Image
                src="/export.svg"
                width={20}
                height={20}
                alt="like"
                className="cursor-pointer invert"
              />
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-md shadow w-full h-fit md:w-[40%] p-6">
          <h2 className="text-lg 2xl:text-xl font-bold">Post Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 my-5 w-full">
              <label
                htmlFor="name"
                className="text-sm font-semibold 2xl:text-base"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3.5 bg-[#38B6FF]/10 text-xs rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1 my-5 w-full">
              <label
                htmlFor="name"
                className="text-sm font-semibold 2xl:text-base"
              >
                Description
              </label>
              <Textarea
                value={formData.desc}
                onChange={handleChange}
                name="desc"
                placeholder="write a description"
                className="w-full p-3.5 bg-[#38B6FF]/10 text-xs rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1 my-5 w-full">
              <label
                htmlFor="name"
                className="text-sm font-semibold 2xl:text-base"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3.5 bg-[#38B6FF]/10 text-xs rounded-md"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 my-5 w-full">
              <label
                htmlFor="name"
                className="text-sm font-semibold 2xl:text-base"
              >
                Tags
              </label>
              <input
                type="text"
                name="tags"
                placeholder="Comma separated tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full p-3.5 bg-[#38B6FF]/10 text-xs rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1 my-5 w-full">
              <label
                htmlFor="name"
                className="text-sm font-semibold 2xl:text-base"
              >
                Upload Media
              </label>
              <div className=" p-3.5 relative bg-[#38B6FF]/10 flex flex-col py-5 gap-3 items-center justify-center ">
                <Image src="/upload.svg" width={40} height={40} alt="upload" />
                <p className="text-xs 2xl:text-sm font-bold">
                  {formData.media ? "Update " : "Upload "} Media
                </p>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  placeholder="public"
                  className="w-full opacity-0 p-3.5 py-12 absolute top-0 bg-[#38B6FF]/10 text-xs rounded-md"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading || loading}
              className=" w-full rounded-[12px] py-4 bg-[#38B6FF] text-white disabled:opacity-40 font-semibold"
            >
              {uploading || loading ? "Uploading..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLearn;
