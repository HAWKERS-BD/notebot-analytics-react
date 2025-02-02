import { Box } from "@/components/atoms/layout";
import { Title } from "@/components/atoms/typography/title";
import { DataTable } from "@/components/organisms/data-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetAppUsers } from "@/hooks/networking/analytics/app-users";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, RotateCw, User } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Users() {
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

  const { data, isLoading, refetch, isRefetching } = useGetAppUsers(
    page,
    pageSize,
    debouncedSearch
  );

  console.log(data);

  const columns: ColumnDef<Record<string, any>>[] = [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return (
          <Box className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>{email.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Box className="font-medium">{email}</Box>
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
    {
      accessorKey: "uni_id",
      header: "University ID",
      cell: ({ row }) => {
        const value = row.getValue("uni_id");
        const id = value === "null" ? "-" : value;
        return (
          <Box className="flex items-center gap-2">
            <span>{String(id)}</span>
            {id !== "-" && (
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={() => {
                  navigator.clipboard.writeText(id as string);
                  toast.success("ID copied to clipboard");
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            )}
          </Box>
        );
      },
    },
    {
      accessorKey: "dept",
      header: "Department",
    },
    {
      accessorKey: "batch",
      header: "Batch",
    },
    {
      accessorKey: "role",
      header: "Role",
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
            <User className="w-5 h-5" />
            <Title className="text-xl">App Users</Title>
          </Box>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RotateCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data?.users ?? []}
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
