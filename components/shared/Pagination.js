"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { formUrlQuery } from "@/lib/utils";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";


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
      className={`
        ${totalPages > 1 ? "flex items-center" : "hidden"}
     gap-4 `}
    >
      <button
        className=" bg-none  disabled:opacity-50"
        onClick={() => onClick("prev")}
        disabled={Number(page) <= 1}
      >
        <BsArrowLeftCircle className="w-4 h-4 2xl:w-6 2xl:h-6 text-primary-50" />
      </button>
      <p className="text-primary-50 text-xs 2xl:text-sm">{`${page} of ${totalPages}`}</p>

      <button
        onClick={() => onClick("next")}
        className=" bg-none  disabled:opacity-50"
        disabled={Number(page) >= totalPages}
      >
        <BsArrowRightCircle className="w-4 h-4 2xl:w-6 2xl:h-6 text-primary-50" />
      </button>
    </div>
  );
};

export default Pagination;
