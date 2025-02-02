import { Box } from "@/components/atoms/layout";
import { Title } from "@/components/atoms/typography/title";
import { DataTable } from "@/components/organisms/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetMissedWords } from "@/hooks/networking/analytics/missed-words";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle, Copy, RotateCw } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function MissedWords() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, refetch, isRefetching } = useGetMissedWords(
    page,
    pageSize,
    debouncedSearch
  );

  const columns: ColumnDef<Record<string, any>>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        return <Box>{row.getValue("id")}</Box>;
      },
    },
    {
      accessorKey: "missed_words",
      header: "Missed Words",
      cell: ({ row }) => {
        const words = row.getValue("missed_words") as string;
        return (
          <Box className="flex items-center gap-2">
            <Box>{words}</Box>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6"
              onClick={() => {
                navigator.clipboard.writeText(words);
                toast.success("Word copied to clipboard");
              }}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </Box>
        );
      },
    },
  ];

  //   if (isLoading || isRefetching) {
  //     return (
  //       <Box className="flex flex-col items-center min-h-screen p-6 space-y-4">
  //         <Card className="w-full max-w-screen-xl">
  //           <CardHeader>
  //             <Skeleton className="h-8 w-[200px]" />
  //           </CardHeader>
  //           <CardContent>
  //             <Skeleton className="h-[300px] w-full" />
  //           </CardContent>
  //         </Card>
  //       </Box>
  //     );
  //   }

  return (
    <Box className="flex flex-col items-center min-h-screen p-6 space-y-4">
      <Card className="w-full max-w-screen-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <Box className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <Title className="text-xl">Missed Words</Title>
          </Box>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RotateCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data?.missed_words ?? []}
            showSearch={true}
            showPagination={true}
            showRowsPerPage={true}
            onPageChange={page => setPage(page)}
            onPageSizeChange={pageSize => setPageSize(pageSize)}
            onSearch={search => setSearch(search)}
            totalPages={data?.pagination.total_pages}
            currentPage={data?.pagination.current_page}
            searchColumn="missed_words"
            isLoading={isLoading || isRefetching}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
