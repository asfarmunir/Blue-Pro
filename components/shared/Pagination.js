"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { formUrlQuery } from "@/lib/utils";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { ChevronLeft, ChevronRight } from "lucide-react";


const Pagination = ({ page, totalPages, urlParamName } ) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      className={` w-full flex items-center justify-between
        ${totalPages > 1 ? "flex items-center" : "hidden"}
     gap-4 `}
    >
      <button
        className=" bg-none disabled:opacity-50 flex items-center gap-2 border font-semibold border-[#D0D5DD]  py-1.5 px-3 rounded-md"
        onClick={() => onClick("prev")}
        disabled={Number(page) <= 1}
      >
        <ChevronLeft className="w-5 h-5 2xl:w-6 2xl:h-6 text-primary-50" />
        Previous
      </button>
      <p className="text-primary-50 text-xs 2xl:text-sm">{`${page} of ${totalPages}`}</p>

      <button
        onClick={() => onClick("next")}
        className=" bg-none disabled:opacity-50 flex items-center gap-2 border font-semibold border-[#D0D5DD]  py-1.5 px-3 rounded-md"
        disabled={Number(page) >= totalPages}
      >
     <ChevronRight className="w-5 h-5 2xl:w-6 2xl:h-6 text-primary-50" />
        Next      
    </button>
    </div>
  );
};

export default Pagination;
