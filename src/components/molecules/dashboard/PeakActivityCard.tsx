import { Box } from "@/components/atoms/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, CalendarDays } from "lucide-react";

interface PeakActivityCardProps {
  highestDate: string;
  lowestDate: string;
  formatDate: (date: string) => string;
}

export function PeakActivityCard({
  highestDate,
  lowestDate,
  formatDate,
}: PeakActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          Peak Activity Dates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Box className="flex flex-col space-y-1">
          <Box className="flex items-center justify-between">
            <Box className="flex items-center gap-2">
              <ArrowUp className="w-4 h-4 text-green-500" />
              <Box className="text-sm text-muted-foreground">Highest:</Box>
            </Box>
            <Box className="font-semibold">{formatDate(highestDate)}</Box>
          </Box>
        </Box>
        <Box className="flex flex-col space-y-1">
          <Box className="flex items-center justify-between">
            <Box className="flex items-center gap-2">
              <ArrowDown className="w-4 h-4 text-red-500" />
              <Box className="text-sm text-muted-foreground">Lowest:</Box>
            </Box>
            <Box className="font-semibold">{formatDate(lowestDate)}</Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
