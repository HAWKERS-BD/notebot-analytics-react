import { Box } from "@/components/atoms/layout";
import { Title } from "@/components/atoms/typography/title";
import { DataTable } from "@/components/organisms/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetGameScores } from "@/hooks/networking/analytics/game-scores";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Copy, RotateCw, Trophy } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export default function GameScore() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 600); // 600ms delay

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, refetch, isRefetching } = useGetGameScores(
    page,
    pageSize,
    debouncedSearch
  );

  const getTrophyColor = (index: number) => {
    switch (index) {
      case 0:
        return "text-yellow-400";
      case 1:
        return "text-gray-400";
      case 2:
        return "text-amber-600";
      default:
        return "text-gray-500";
    }
  };

  const columns: ColumnDef<Record<string, any>>[] = [
    {
      accessorKey: "rank",
      header: "Rank",
      cell: ({ row }) => {
        const index = row.index;
        return (
          <Box className="flex items-center gap-2">
            {index < 3 ? (
              <Box
                className={`flex items-center justify-center size-8 rounded-full bg-muted ${getTrophyColor(
                  index
                )}`}
              >
                {index + 1}
              </Box>
            ) : (
              <Box className="ml-3">{index + 1}</Box>
            )}
          </Box>
        );
      },
    },
    {
      accessorKey: "user_name",
      header: "Player Name",
      cell: ({ row }) => {
        return <Box className="font-medium">{row.getValue("user_name")}</Box>;
      },
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => {
        const score = row.getValue("score") as number;
        return <Box className="font-semibold">{score.toLocaleString()}</Box>;
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = row.getValue("date") as string;
        return <Box>{dayjs(date).format("MMM DD, YYYY")}</Box>;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return (
          <Box className="flex items-center gap-2">
            <Box>{email}</Box>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6"
              onClick={() => {
                navigator.clipboard.writeText(email);
                toast.success("Email copied to clipboard");
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
  //       <Box className="flex flex-col items-center min-h-screen p-6 space-y-4 ">
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
            <Trophy className="w-5 h-5" />
            <Title className="text-xl">NoteBird Scores</Title>
          </Box>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RotateCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data?.hof ?? []}
            showSearch={true}
            showPagination={true}
            showRowsPerPage={true}
            onPageChange={page => setPage(page)}
            onPageSizeChange={pageSize => setPageSize(pageSize)}
            onSearch={search => setSearch(search)}
            totalPages={data?.total_pages}
            currentPage={data?.current_page}
            isLoading={isLoading || isRefetching}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
