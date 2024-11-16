"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { RxCross2 } from "react-icons/rx";
import { generatePermittedFileTypes } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import { toast } from "react-toastify";
import { createPost } from "@/database/actions/post.action";
import { useSession } from "next-auth/react";
const CreatePost = ({ id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
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
  // Handler for adding tags
  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  // Handler for submitting post
  const handleSubmit = async () => {
    // if (files.length === 0) {
    //   return toast.error("Please upload an image");
    // }

    setLoading(true);
    let uploadedImagesUrl = [];

    toast.loading("Creating Post...");

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        setLoading(false);
        return;
      }
      uploadedImages.map((img) => uploadedImagesUrl.push(img.url));
    }

    const postData = {
      title,
      description,
      image: uploadedImagesUrl[0],
      tags,
      url,
      creator: session.data.user.id,
      groupId: id,
    };

    console.log("🚀 ~ handleSubmit ~ formData:", postData);

    const res = await createPost(postData, `/connect/details/${id}`);
    toast.dismiss();
    if (res.status === 201) {
      toast.success(res.message);
      setLoading(false);
      setTitle("");
      setDescription("");
      setTags([]);
      setUrl("");
      setFiles([]);
      uploadedImageUrl = [];
    } else {
      toast.error(res.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-4">
      <div className="flex items-center gap-2">
        <Image src="/avatar.svg" alt="avatar" width={48} height={48} />
        <div className="flex flex-col ">
          <h2 className="font-bold 2xl:text-lg">Hello Admin</h2>
          <p className="text-xs 2xl:text-sm text-slate-500">
            Whats on your mind?
          </p>
        </div>
      </div>
      <input
        type="text"
        placeholder="Write your post title here ..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 my-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-lg"
      />
      <textarea
        placeholder="Write your post description here ..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 my-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-lg"
      />
      {tags.length > 0 && (
        <>
          <p className="text-xs 2xl:text-sm font-semibold text-slate-500">
            Tags:
          </p>
          <div className=" mt-1 w-full p-3 my-3 bg-[#38B6FF]/10 text-xs 2xl:text-sm rounded-lg text-slate-500">
            {tags.join(", ")}
          </div>
        </>
      )}

      <div className="w-full flex flex-col md:flex-row my-1 items-center justify-between gap-2">
        <div className="  border-2 border-slate-200  gap-2 rounded-lg   flex items-center justify-center w-full">
          <input
            type="text"
            placeholder="Add #tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="w-full p-2.5  2xl:p-3 text-sm rounded-lg "
          />
          <button
            onClick={handleAddTag}
            className=" shadow p-2.5 2xl:p-3 flex items-center justify-center w-full"
          >
            <Image src="/tag.svg" alt="tags" width={19} height={19} />
            <p className="text-xs 2xl:text-sm font-bold">Add Tag</p>
          </button>
        </div>

        <div
          {...getRootProps()}
          className="w-full justify-center flex flex-col items-center gap-2 border border-dotted rounded-lg"
        >
          <input {...getInputProps()} className=" bg-red-400" />
          <button className="border-2 border-slate- gap-2 rounded-lg shadow p-2.5 2xl:p-3 flex items-center justify-center w-full">
            <Image src="/image.svg" alt="add media" width={23} height={23} />
            <p className="text-xs 2xl:text-sm font-bold"> Add Image/Video</p>
          </button>
        </div>

        <div className="  border-2 border-slate-200  gap-2 rounded-lg   flex items-center justify-center w-full">
          <div className=" border-2  gap-2 py-2.5 2xl:py-3 px-6 2xl:px-8 flex items-center justify-center text-nowrap  ">
            <Image src="/link-black.svg" alt="live" width={23} height={23} />
            <p className=" text-xs 2xl:text-sm font-bold">Add URL</p>
          </div>
          <input
            type="text"
            placeholder="Add URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2.5 2xl:py-3 text-sm rounded-lg "
          />
        </div>
      </div>
      {files.length > 0 && (
        <div className="w-full flex  pt-4 items-center justify-center gap-2 mt-2">
          {files.map((file, index) => (
            <>
              <div key={index} className="w-52 h-52 relative">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Upload"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
                <button
                  type="button"
                  className={`text-xs  2xl:text-sm absolute top-0 right-0 font-semibold h-fit text-white bg-red-600
                      transition-all duration-500 
                       px-1 py-1 rounded-full
                }`}
                  onClick={() => {
                    setFiles([]);
                    uploadedImageUrl = [];
                  }}
                >
                  <RxCross2 className="text-lg" />
                </button>
              </div>
            </>
          ))}
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full disabled:opacity-30 bg-[#38B6FF] text-white font-bold py-4 mt-4 rounded-full shadow"
      >
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;
