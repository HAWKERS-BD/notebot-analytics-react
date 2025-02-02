import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { X as XIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box } from "../atoms/layout";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showSearch?: boolean;
  showPagination?: boolean;
  showRowsPerPage?: boolean;
  searchColumn?: string;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSearch?: (search: string) => void;
  totalPages?: number;
  currentPage?: number;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showSearch = true,
  showPagination = true,
  showRowsPerPage = false,
  searchColumn = "email",
  onPageChange,
  onPageSizeChange,
  onSearch,
  totalPages,
  currentPage,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams;
    },
    [searchParams]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      pagination: {
        pageIndex: Math.max(0, (Number(searchParams.get("page")) || 1) - 1),
        pageSize: Number(searchParams.get("size")) || 10,
      },
    },
    manualPagination: true,
  });

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      table.getColumn(searchColumn)?.setFilterValue(search);
    }
  }, [searchParams, table, searchColumn]);

  const handleSearch = (value: string) => {
    const newParams = createQueryString({
      search: value || null,
      page: null,
    });
    setSearchParams(newParams);
    onSearch?.(value);
  };

  const handlePageChange = (page: number) => {
    const newParams = createQueryString({
      page: Math.max(1, page + 1),
    });
    setSearchParams(newParams);
    onPageChange?.(page + 1);
  };

  const handlePageSizeChange = (newSize: string) => {
    const newParams = createQueryString({
      size: newSize,
      page: 1, // Reset to first page when changing page size
    });
    setSearchParams(newParams);
    onPageSizeChange?.(Number(newSize));
  };

  return (
    <Box>
      {showSearch && (
        <Box className="flex items-center py-4">
          <Box className="relative w-full max-w-sm">
            <Input
              placeholder={`Search ${searchColumn}...`}
              value={
                (table.getColumn(searchColumn)?.getFilterValue() as string) ??
                ""
              }
              onChange={event => handleSearch(event.target.value)}
              className="max-w-[300px] pr-8"
            />
            {searchParams.get("search") && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute p-1 rounded-full right-[90px] top-2 hover:bg-red-500 size-5"
                onClick={() => handleSearch("")}
              >
                <XIcon className="w-6 h-6" />
              </Button>
            )}
          </Box>
        </Box>
      )}
      <Box className="border rounded-md min-h-[400px] lg:min-w-[600px] max-w-screen-xl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
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
            {isLoading ? (
              Array.from({ length: table.getState().pagination.pageSize }).map(
                (_, idx) => (
                  <TableRow key={`loading-${idx}`}>
                    {columns.map((_, cellIdx) => (
                      <TableCell key={`loading-cell-${cellIdx}`}>
                        <Box className="w-full h-6 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="max-w-[200px]">
                      <div className="truncate">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
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
      </Box>
      {showPagination && (
        <Box className="flex flex-col items-center gap-4 py-4 sm:flex-row">
          {showRowsPerPage && (
            <Box className="flex items-center space-x-2">
              <p className="text-sm font-medium">Items per page</p>
              <Select
                value={table.getState().pagination.pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 25, 50, 100].map(pageSize => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Box>
          )}
          <Box className="flex items-center space-x-2 sm:ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage! - 2)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Box className="flex items-center gap-1">
              {Array.from({ length: Math.min(3, totalPages || 0) }).map(
                (_, idx) => (
                  <Button
                    key={idx}
                    variant={currentPage === idx + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(idx)}
                  >
                    {idx + 1}
                  </Button>
                )
              )}
              {totalPages! > 3 && <span className="px-2">...</span>}
              {totalPages! > 3 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(totalPages! - 1)}
                >
                  {totalPages}
                </Button>
              )}
            </Box>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage!)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
