import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const CustomPagination = ({
  page,
  totalPages,

  CurentPage,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${parseInt(page) - 1}`} />
          </PaginationItem>
        )}

        {/* Display dynamic pagination */}
        {Array.from({ length: totalPages }).map((_, index) => {
          // Display only the current page and surrounding pages
          if (
            index + 1 === CurentPage || // Current page
            Math.abs(index + 1 - CurentPage) <= 1 || // Pages around the current page
            index + 1 === 1 // First page
          ) {
            console.log("CurrentPage:", CurentPage, "\nindex", index);
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`?page=${index + 1}`}
                  isActive={index + 1 === CurentPage}
                  className={
                    index + 1 == CurentPage ? "bg-[#38B6FF] text-white" : ""
                  }
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}

        {page < totalPages && (
          <PaginationItem>
            <PaginationNext href={`?page=${parseInt(page) + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
