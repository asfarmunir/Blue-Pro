"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import PostCreation from "@/components/shared/PostCreation";
const page = ({ details, posts }) => {
  console.log("🚀 ~ page ~ posts:", details);
  return (
    <div className=" w-full bg-[#F6F6F6]  py-3 md:p-3 2xl:p-4 mb-8">
      <div className=" w-full relative h-60 2xl:h-72 bg-[#38B6FF]/10">
        <Image
          src={details.bannerImage}
          alt="connect"
          width={200}
          height={200}
          className=" w-full h-full object-contain object-center"
        />
        <Link
          href={"/connect"}
          className=" p-2 absolute top-5 left-5 rounded-md bg-slate-100"
        >
          <FaArrowLeft className=" " />
        </Link>
        <div className=" p-0.5 py-1.5 absolute top-5 right-5 rounded-lg bg-slate-100">
          <Image src="/menu.svg" alt="connect" width={20} height={20} />
        </div>
        <Link
          href={`/connect/details/${details._id}/request`}
          className=" p-1.5 absolute top-5 right-16 rounded-md bg-slate-100"
        >
          <Image
            src="/group-members.svg"
            alt="connect"
            width={20}
            height={20}
          />
        </Link>
        <div className=" hidden md:block p-4 absolute bottom-5 left-5 rounded-md bg-slate-50  bg-opacity-80">
          <p className="bg-[#38B6FF]/10 capitalize text-[#38B6FF] text-xs px-4 w-fit text-center font-semibold  py-1.5 mb-2 rounded-full">
            {details.about}
          </p>
          <h2 className="2xl:text-2xl text-xl capitalize font-bold">
            {details.name}
          </h2>{" "}
          <div className="flex items-center gap-4 mt-2">
            <p className="text-xs inline-flex items-center gap-1 2xl:text-sm ">
              <Image src="/globe.svg" alt="live" width={16} height={16} />
              {details.type}
            </p>
            <p className="text-xs inline-flex items-center gap-1 2xl:text-sm ">
              <Image src="/members.svg" alt="live" width={18} height={18} />
              {details.members.length} Members
            </p>
            <p className="text-xs inline-flex items-center gap-1 2xl:text-sm ">
              Created{" "}
              {new Date(details.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className=" p-4 md:hidden rounded-md bg-white  absolute bottom-5  w-full bg-opacity-80">
          <p className="bg-[#38B6FF]/10 text-[#38B6FF] text-xs px-4 w-fit text-center font-semibold  py-1.5 mb-2 rounded-full">
            {details.category}
          </p>
          <h2 className="text-xl font-bold">{details.name}</h2>{" "}
          <div className="flex items-center flex-wrap gap-4 mt-2">
            <p className="text-xs inline-flex items-center gap-1 2xl:text-sm ">
              <Image src="/globe.svg" alt="live" width={16} height={16} />
              {details.type}
            </p>
            <p className="text-xs inline-flex items-center gap-1 2xl:text-sm ">
              <Image src="/members.svg" alt="live" width={18} height={18} />
              {details.members.length} Members
            </p>
            <p className="text-xs inline-flex font-semibold items-center gap-1 2xl:text-sm ">
              Created{" "}
              {new Date(details.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
            </p>
          </div>
        </div>
      </div>
      <div className=" my-6 w-full flex items-center justify-center gap-4 flex-col md:flex-row ">
        <button className=" py-4 px-24 w-full md:w-fit justify-center  rounded-full font-semibold text-sm 2xl:text-base bg-[#38B6FF] text-white inline-flex items-center gap-2">
          <Image src="/feed.svg" alt="live" width={23} height={23} />
          <p> Group Feed</p>
        </button>
        <button className=" py-4 px-24 w-full md:w-fit justify-center rounded-full text-sm font-semibold 2xl:text-base border-2 border-[#38B6FF]  inline-flex items-center gap-2">
          <Image src="/alert-black.svg" alt="live" width={23} height={23} />
          <p> About </p>
        </button>
      </div>
      <PostCreation id={details._id} />

      <div className="flex flex-col gap-4 my-5">
        {posts &&
          posts.map((post, index) => (
            <div
              key={index}
              className=" flex flex-col mx-auto  w-full max-w-3xl 2xl:max-w-4xl  my-8 bg-white p-7 rounded-lg"
            >
              <div className="flex items-center justify-between w-full border-b mb-4 pb-4">
                <div className="flex items-center gap-2">
                  <Image src="/avatar.svg" alt="live" width={48} height={48} />
                  <div className="flex flex-col ">
                    <h2 className=" font-bold 2xl:text-lg capitalize">
                      {post.creator.username}
                    </h2>
                    <p className=" text-xs 2xl:text-sm text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>{" "}
                <Image
                  src={"/watch.svg"}
                  width={50}
                  alt="live"
                  height={50}
                  className="cursor-pointer"
                />
              </div>
              <h2 className=" font-bold 2xl:text-lg capitalize mb-2">
                {post.title}
              </h2>
              <p className="text-xs 2xl:text-sm mb-2 max-w-3xl 2xl:max-w-4xl">
                {post.description}
              </p>
              {post.image && (
                <div className=" w-full h-64 ">
                  <Image
                    alt="live"
                    src={post.image}
                    width={500}
                    height={300}
                    className="rounded-lg my-2 w-full h-full object-contain object-center"
                  />
                </div>
              )}
              <div className="flex  items-center justify-between mt-3">
                <div className=" flex gap-1 items-center">
                  {post.tags.map((tag, index) => (
                    <p
                      key={index}
                      className="bg-[#38B6FF]/15 px-2 py-1 rounded-full text-xs 2xl:text-sm text-[#38B6FF]"
                    >
                      #{tag}
                    </p>
                  ))}
                </div>
                <div className=" flex gap-1 items-center">
                  <div className="bg-[#FFDDDD] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
                    <Image src="/likes.svg" alt="live" width={20} height={20} />
                    <p className="text-xs 2xl:text-sm font-semibold">0</p>
                  </div>
                  <div className="bg-[#F6F6F6] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
                    <Image
                      src="/comment.svg"
                      alt="live"
                      width={22}
                      height={22}
                    />
                    <p className="text-xs 2xl:text-sm font-semibold">0</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {!posts ||
          (!posts.length && (
            <div className="w-full flex flex-col items-center justify-center  my-6 gap-2">
              <p className=" 2xl:text-xl font-bold">
                No posts found in this group
              </p>
              <p className="text-sm text-slate-600">Lets create first post!</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
