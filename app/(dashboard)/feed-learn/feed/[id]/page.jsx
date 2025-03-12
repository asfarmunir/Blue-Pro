"use client";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoArrowDown } from "react-icons/io5";
import axios from "axios";
import { Loader } from "lucide-react";

const Page = ({ params: { id } }) => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPostData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/feed/${id}`
      );
      const data = res.data;
      console.log("🚀 ~ getPostData ~ data:", data);
      setPostData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return (
    <div className=" w-full p-3 2xl:p-4 space-y-4 bg-slate-50 pb-16">
      <Link href={"/feed-learn"} className="flex items-center gap-2">
        <FaArrowLeftLong className="text-xl" />
        <div className="text-lg font-semibold">Back </div>
      </Link>
      <h3 className=" text-xl 2xl:text-2xl font-bold ">View Details</h3>

      {!loading ? (
        postData && (
          <div className=" w-full flex-col md:flex-row flex gap-5 mt-8 pb-10">
            <div className=" bg-white rounded-md shadow w-full h-fit md:w-[60%] p-6">
              <div className="flex items-center justify-between w-full border-b mb-4 pb-4">
                <h2 className=" text-lg font-bold 2xl:text-xl">Post Preview</h2>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className=" font-bold capitalize 2xl:text-lg">
                  {postData.title}
                </h2>
                <p className=" w-2 h-2 rounded-full bg-[#D9D9D9]"></p>
                <h2 className=" font-bold capitalize 2xl:text-lg">
                  {postData.category}
                </h2>
              </div>{" "}
              <p className="text-xs 2xl:text-sm mb-2">{postData.description}</p>
              <div className=" w-full py-4 rounded-[10px]">
                {postData.isVideo ? (
                  <video
                    src={postData.media}
                    controls
                    className="w-full h-full rounded-[10px]"
                  />
                ) : (
                  <Image
                    src={postData.media}
                    width={600}
                    height={400}
                    alt="post"
                    className="rounded-[10px]"
                  />
                )}
              </div>
              <div className="flex  items-center justify-between my-3">
                <div className=" flex gap-1 items-center">
                  {postData.tags.map((tag, index) => (
                    <p
                      key={index}
                      className="bg-[#38B6FF]/15 px-2 py-1 rounded-full text-xs 2xl:text-sm text-[#38B6FF]"
                    >
                      {tag}
                    </p>
                  ))}
                </div>
                <div className=" flex gap-1 items-center">
                  <div className="bg-[#FFDDDD] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
                    <Image src="/likes.svg" alt="live" width={20} height={20} />
                    <p className="text-xs 2xl:text-sm font-semibold">
                      {postData.likes.length}
                    </p>
                  </div>
                  <div className="bg-[#F6F6F6] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
                    <Image
                      src="/comment.svg"
                      alt="live"
                      width={22}
                      height={22}
                    />
                    <p className="text-xs 2xl:text-sm font-semibold">
                      {postData.comments.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" bg-white rounded-md shadow w-full  md:w-[40%] p-6">
              <div className="my-2">
                <h2 className="flex items-center gap-2 mb-4 font-bold 2xl:text-lg">
                  Comments
                  <IoArrowDown className="text-lg" />
                </h2>
                <div className="space-y-4">
                  {postData.comments.map((comment, index) => (
                    <div
                      key={index}
                      className=" w-full flex  items-start  justify-between mb-2 gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="rounded-full overflow-hidden w-[40px] h-[40px]">
                          <Image
                            src={comment.userImage || "/avatar.svg"}
                            width={40} // Keep width and height consistent
                            height={40}
                            alt="User Avatar"
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <p className="text-xs 2xl:text-sm">{comment.text}</p>
                          <span className="text-xs 2xl:text-sm text-slate-600">
                            {new Date(comment.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                      <Image
                        src="/menu.svg"
                        width={20}
                        height={20}
                        alt="like"
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                <div className=" w-full flex mt-6 bg-[#38B6FF]/15 p-2 px-3  rounded-xl  items-center  justify-between mb-2 gap-4">
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
          </div>
        )
      ) : (
        <div className="w-full flex flex-col items-center gap-4 justify-center h-[40vh]">
          <Loader size={50} color="blue" className=" animate-spin" />
          <p className="text-lg font-bold tracking-wide">
            Please wait for a moment
          </p>
        </div>
      )}
      {!loading && !postData && (
        <div className="w-full flex flex-col items-center gap-4 justify-center h-[40vh]">
          <p className="text-lg font-bold tracking-wide">No data found</p>
        </div>
      )}
    </div>
  );
};

export default Page;
