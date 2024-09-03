"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CustomPagination from "@/components/shared/CustomPagination";

function DataTable({ columns, data, pagination, title }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section className="w-full overflow-hidden no-scroll">
      <div style={{ backgroundColor: "white" }} className="pr-2 md:pr-4">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4 pr-2 md:pr-4">
        <div className="flex-1 text-sm" style={{ fontWeight: "500" }}>
          {title}: {pagination?.totalRecords}
        </div>
        <div className="flex-1 flex justify-end items-center space-x-4">
          <div className="hidden md:block text-xs">
            {pagination.pageNo}-{pagination.totalPages} pages
          </div>
          <div className="">
            <CustomPagination
              page={pagination.pageNo}
              CurentPage={pagination.pageNo}
              totalPages={pagination.totalPages}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataTable;
