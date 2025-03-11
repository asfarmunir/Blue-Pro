"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import Image from "next/image";

const CustomersFilter = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [searchTerm, setSearchTerm] = useState(name || "");
  const router = useRouter();

  // Debounce delay in milliseconds
  const debounceDelay = 250;

  // Effect to handle the debounced search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const queryString = formUrlQuery({
        params: searchParams.toString(),
        key: "name",
        value: searchTerm ? searchTerm : null,
      });

      router.push(queryString, { scroll: false });
    }, debounceDelay);

    return () => clearTimeout(debounceTimer); // Cleanup timeout on component unmount or when searchTerm changes
  }, [searchTerm, searchParams, router]);

  // Input change handler
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative ">
      <input
        className="appearance-none text-sm 2xl:text-base  hover:border pl-10  hover:border-gray-400 transition-colors rounded-[8px] w-full py-3 2xl:py-4 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline bg-[#38B6FF]/10"
        id="username"
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {/* <div className="absolute right-0 inset-y-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div> */}

      <div className="absolute left-3 inset-y-0 flex items-center">
        <Image src="/search.svg" alt="search" width={17} height={17} />
      </div>
    </div>
  );
};

export default CustomersFilter;
