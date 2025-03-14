"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Search from "@/components/shared/Search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LuCalendarDays } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import AddGroup from "@/components/shared/modal/AddGroup";
import Link from "next/link";
import Pagination from "./Pagination";
import { HiDotsVertical } from "react-icons/hi";
import DeletePost from "@/components/shared/modal/DeletePost";
import axios from "axios";
const FeedandLearn = ({ groups, totalPages, page }) => {
  const [tab, setTab] = useState("learn");
  const [learnPosts, setLearnPosts] = useState([]);
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (type) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${type}`
      );
      console.log("🚀 ~ fetchData ~ res:", res.data);
      if (type === "learn") {
        setLearnPosts(res.data);
      } else {
        setFeedPosts(res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      (tab === "learn" && learnPosts.length === 0) ||
      (tab === "feed" && feedPosts.length === 0)
    ) {
      fetchData(tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const onDeleteSuccess = () => {
    fetchData(tab);
  };

  return (
    <div className=" p-1.5 md:p-3 2xl:p-5 w-full bg-slate-50 ">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between w-full">
        <div className="flex flex-col">
          <h2 className=" font-bold text-xl mb-2 2xl:text-2xl">
            Manage Feed & Learn Post
          </h2>
          <p>You can manage the feed and learn posts here</p>
        </div>
        <div className="flex items-center w-full md:w-fit gap-2">
          <Link
            href={
              tab === "learn"
                ? "/feed-learn/learn/create"
                : "/feed-learn/feed/create"
            }
          >
            <button className="bg-[#38B6FF] inline-flex items-center gap-2 border-2 border-[#38B6FF] text-white font-bold px-5 py-3.5 text-sm  rounded-md">
              Create Post{" "}
              <Image src="/add.svg" alt="plus" width={20} height={20} />
            </button>{" "}
          </Link>
        </div>
      </div>
      <div className="flex items-center my-5 2xl:my-6  gap-2">
        <button
          onClick={() => setTab("learn")}
          className={
            tab === "learn"
              ? "text-[#38B6FF]  font-bold px-3 py-1.5 text-sm 2xl:text-base border-b-4 border-[#38B6FF]  rounded-md"
              : "text-[#474E56] font-bold px-5 py-3.5 text-sm 2xl:text-base  rounded-md"
          }
        >
          Learn Posts
        </button>
        <button
          onClick={() => setTab("feed")}
          className={
            tab === "feed"
              ? "text-[#38B6FF]  font-bold px-3 py-1.5 text-sm 2xl:text-base border-b-4 border-[#38B6FF]  rounded-md"
              : "text-[#474E56] font-bold px-5 py-3.5 text-sm 2xl:text-base  rounded-md"
          }
        >
          Feed Posts
        </button>
      </div>
      <div className=" w-full  bg-white  rounded-lg p-2 md:p-4 2xl:p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-lg font-semibold">
            Manage
            {tab === "learn" ? " Learn " : " Feed "} Posts
          </h2>

          <div className="hidden md:flex items-center gap-2">
            {/* <Search /> */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className=" px-4 py-2 ml-4 inline-flex items-center rounded-lg font-bold border-2"
                >
                  Today
                  <LuCalendarDays className=" text-lg 2xl:text-xl ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="px-4 bg-white">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="mb-3" />

                <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                  View all Details
                </Button>

                <hr
                  className="pt-2 border-t-1 block w-full"
                  style={{ borderColor: "#CCCCCD" }}
                />
                <Button
                  className="bg-[#D3175233] w-full rounded-md mb-2"
                  style={{ color: "#D31752" }}
                >
                  Delete
                </Button>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
        {tab === "learn" &&
          (learnPosts && learnPosts.length ? (
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {learnPosts.map((learn) => (
                <div key={learn._id} className="rounded-lg bg-[#FAFAFA] border">
                  <div className="flex  p-3.5 py-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className=" font-bold capitalize 2xl:text-lg">
                        {learn.title}
                      </h2>
                      <p className=" w-2 h-2 rounded-full bg-[#D9D9D9]"></p>
                      <h2 className=" font-bold capitalize 2xl:text-lg">
                        {learn.category}
                      </h2>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <HiDotsVertical className="2xl:text-lg" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="px-4 bg-white"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="mb-3" />

                        <Link href={`/feed-learn/${tab}/${learn._id}`}>
                          <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                            View Details
                          </Button>
                        </Link>

                        <hr
                          className="pt-2 border-t-1 block w-full"
                          style={{ borderColor: "#CCCCCD" }}
                        />
                        <DeletePost
                          id={learn._id}
                          type="learn"
                          onDeleteSuccess={onDeleteSuccess}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className=" w-full border-x border-b rounded-lg px-4 flex items-center gap-4 py-5 bg-white">
                    <div className=" w-[135px] 2xl:w-[150px] h-[120px] 2xl:h-[154px] rounded-lg overflow-hidden ">
                      {learn.isVideo ? (
                        <Image
                          src={"/streaming2.svg"}
                          alt="live"
                          width={124}
                          height={124}
                          className=" w-full h-full object-cover object-center"
                        />
                      ) : (
                        <Image
                          src={learn.media}
                          alt="live"
                          width={124}
                          height={124}
                          className=" w-full h-full object-cover object-center"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2.5 w-fit">
                      {learn.tags && learn.tags.length ? (
                        <div className="flex gap-2">
                          {learn.tags.map((tag, idx) => (
                            <p
                              key={idx}
                              className="text-xs 2xl:text-sm bg-[#F6F6F6] px-2 py-1 rounded-md"
                            >
                              #{tag}
                            </p>
                          ))}
                        </div>
                      ) : null}

                      <p className=" text-sm 2xl:text-base max-w-[20rem] w-full">
                        {learn.description}
                      </p>
                      <div className=" flex gap-1 items-center">
                        <div className="bg-[#FFDDDD] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
                          <Image
                            src="/likes.svg"
                            alt="live"
                            width={18}
                            height={18}
                          />
                          <p className="text-xs 2xl:text-sm font-semibold">
                            {learn.likes.length}
                          </p>
                        </div>
                        <div className="bg-[#F6F6F6] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
                          <Image
                            src="/comment.svg"
                            alt="live"
                            width={20}
                            height={20}
                          />
                          <p className="text-xs 2xl:text-sm font-semibold">
                            {learn.comments.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className=" w-full  items-center justify-center">
              <h2 className="text-lg font-semibold text-center">
                No Post Found!
              </h2>
            </div>
          ))}
        {tab === "feed" &&
          (feedPosts && feedPosts.length ? (
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {feedPosts.map((feed) => (
                <div key={feed._id} className="rounded-lg bg-[#FAFAFA] border">
                  <div className="flex  p-3.5 py-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className=" font-bold capitalize 2xl:text-lg">
                        {feed.title}
                      </h2>
                      <p className=" w-2 h-2 rounded-full bg-[#D9D9D9]"></p>
                      <h2 className=" font-bold capitalize 2xl:text-lg">
                        {feed.category}
                      </h2>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <HiDotsVertical className="2xl:text-lg" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="px-4 bg-white"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="mb-3" />
                        <Link href={`/feed-learn/${tab}/${feed._id}`}>
                          <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                            View Details
                          </Button>
                        </Link>
                        <hr
                          className="pt-2 border-t-1 block w-full"
                          style={{ borderColor: "#CCCCCD" }}
                        />
                        <DeletePost
                          id={feed._id}
                          type="feed"
                          onDeleteSuccess={onDeleteSuccess}
                        />{" "}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className=" w-full border-x border-b rounded-lg px-4 flex items-center gap-4 py-5 bg-white">
                    <div className=" w-[135px] 2xl:w-[150px] h-[120px] 2xl:h-[154px] rounded-lg overflow-hidden ">
                      {feed.isVideo ? (
                        <Image
                          src={"/streaming2.svg"}
                          alt="live"
                          width={124}
                          height={124}
                          className=" w-full h-full object-cover object-center"
                        />
                      ) : (
                        <Image
                          src={feed.media}
                          alt="live"
                          width={124}
                          height={124}
                          className=" w-full h-full object-cover object-center"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2.5 w-fit">
                      {feed.tags && feed.tags.length ? (
                        <div className="flex gap-2">
                          {feed.tags.map((tag, idx) => (
                            <p
                              key={idx}
                              className="text-xs 2xl:text-sm bg-[#F6F6F6] px-2 py-1 rounded-md"
                            >
                              {tag}
                            </p>
                          ))}
                        </div>
                      ) : null}

                      <p className=" text-sm 2xl:text-base max-w-[20rem] w-full">
                        {feed.description}
                      </p>
                      <div className=" flex gap-1 items-center">
                        <div className="bg-[#FFDDDD] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
                          <Image
                            src="/likes.svg"
                            alt="live"
                            width={18}
                            height={18}
                          />
                          <p className="text-xs 2xl:text-sm font-semibold">
                            {feed.likes.length}
                          </p>
                        </div>
                        <div className="bg-[#F6F6F6] rounded-xl flex items-center justify-center gap-2 px-3 py-2">
                          <Image
                            src="/comment.svg"
                            alt="live"
                            width={20}
                            height={20}
                          />
                          <p className="text-xs 2xl:text-sm font-semibold">
                            {feed.comments.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className=" w-full  items-center justify-center">
              <h2 className="text-lg font-semibold text-center">
                No Feed Found!
              </h2>
            </div>
          ))}

        <div className=" w-full mt-4">
          <Pagination page={page} totalPages={totalPages} urlParamName="page" />
        </div>
      </div>
    </div>
  );
};

export default FeedandLearn;
