import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CiCircleChevDown } from "react-icons/ci";
import Link from "next/link";
import axios from "axios";
const Feed = () => {
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
        setLearnPosts(res.data.slice(0, 3));
      } else {
        setFeedPosts(res.data.slice(0, 3));
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
    <>
      <Table>
        <TableHeader className="bg-[#F9FAFB] border">
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Tabs</TableHead>
            {/* <TableHead>Link</TableHead> */}
            <TableHead>Total Interactions</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {learnPosts.length
            ? learnPosts.map((post, idx) => (
                <TableRow key={idx}>
                  <TableCell className=" text-xs max-w-[120px]  2xl:text-sm  font-semibold">
                    {post.title}
                  </TableCell>
                  <TableCell className="text-xs max-w-[200px] 2xl:text-sm">
                    {post.description}
                  </TableCell>
                  <TableCell className=" text-xs max-w-[130px]  2xl:text-sm  ">
                    {post.tags.map((tag, idx) => (
                      <p
                        key={idx}
                        className="bg-[#38B6FF]/10 text-[#38B6FF] text-center font-semibold px-3 text-xs 2xl:text-xs my-1 w-fit py-2 rounded-full"
                      >
                        #{tag}
                      </p>
                    ))}
                  </TableCell>
                  {/* <TableCell className=" text-xs max-w-[150px]  2xl:text-sm  ">
                    <Link
                      href="#"
                      className=" text-xs max-w-[150px]  2xl:text-sm text-nowrap font-semibold  text-[#38B6FF] underline"
                    >
                      Blupro.com
                    </Link>
                  </TableCell> */}
                  <TableCell className=" text-xs max-w-[80px]  2xl:text-sm  ">
                    <p className=" text-xs 2xl:text-sm text-start  px-1 py-2 rounded-full">
                      {post.likes.length} Likes <br />
                      {post.comments.length} Comments
                    </p>
                  </TableCell>
                  <TableCell className=" text-xs max-w-[130px]  2xl:text-sm  ">
                    <p className="bg-[#38B6FF]/10 text-[#38B6FF] text-center font-semibold px-3  py-2 rounded-full">
                      {post.category}
                    </p>
                  </TableCell>

                  <TableCell className=" text-xs max-w-[80px]  2xl:text-sm text-center  ">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="2xl:h-8 2xl:w-8 w-6 h-6 p-0"
                        >
                          <CiCircleChevDown className="text-3xl" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="px-4 bg-white"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="mb-3" />
                        <Link
                          href={`/feed-learn/learn/${post._id}`}
                          className=" text-xs max-w-[150px]  2xl:text-sm text-nowrap font-semibold  text-blue-600 underline"
                        >
                          <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                            View all Details
                          </Button>
                        </Link>

                        {/* <hr
                          className="pt-2 border-t-1 block w-full"
                          style={{ borderColor: "#CCCCCD" }}
                        />
                        <Button
                          className="bg-[#D3175233] w-full rounded-md mb-2"
                          style={{ color: "#D31752" }}
                        >
                          Delete
                        </Button> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      {!learnPosts.length && (
        <div className="flex justify-center items-center h-40">
          <p className="text-sm text-gray-400">No posts available</p>
        </div>
      )}
    </>
  );
};

export default Feed;
