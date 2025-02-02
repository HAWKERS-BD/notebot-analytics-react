"use client";

import { useGetAppUsers } from "@/hooks/networking/analytics/app-users";

import { Title } from "@/components/atoms/typography/title";
import { DataTable } from "@/components/organisms/data-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, Eye, RotateCw } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export function AppUsersCard() {
  const { data, isLoading, refetch, isRefetching } = useGetAppUsers(1, 8);

  const columns: ColumnDef<Record<string, any>>[] = [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return (
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>{email.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>{email}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "dept",
      header: "Department",
      cell: ({ row }) => {
        const value = row.getValue("dept");
        return value === "null" ? "-" : value;
      },
    },
    {
      accessorKey: "batch",
      header: "Batch",
      cell: ({ row }) => {
        const value = row.getValue("batch");
        return value === 0 ? "-" : value;
      },
    },
    {
      accessorKey: "uni_id",
      header: "University ID",
      cell: ({ row }) => {
        const value = row.getValue("uni_id");
        const id = value === "null" ? "-" : value;
        return (
          <div className="flex items-center gap-2">
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
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const value = row.getValue("role");
        return value === "admin" ? "Admin" : "User";
      },
    },
  ];

  if (isLoading || isRefetching) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <Title className="text-xl">App Users</Title>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RotateCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Link to="/users">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={data?.users ?? []}
          showSearch={false}
          showPagination={false}
        />
      </CardContent>
    </Card>
  );
}
