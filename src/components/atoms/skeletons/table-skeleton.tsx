import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Box } from "../layout/box";

export default function TableSkeleton() {
  return (
    <Box className="flex flex-col items-center min-h-screen p-6 space-y-4">
      <Card className="w-full max-w-screen-xl">
        <CardHeader>
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    </Box>
  );
}
