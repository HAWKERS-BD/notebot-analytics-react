import { Box } from "@/components/atoms/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCcw } from "lucide-react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface TodayChartProps {
  selectedDayData: any[];
  selectedDay: string;
  setSelectedDay: (value: string) => void;
  refetchDailyReport: () => void;
}

export function TodayChart({
  selectedDayData,
  selectedDay,
  setSelectedDay,
  refetchDailyReport,
}: TodayChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <Box className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refetchDailyReport}
              className="gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
            </Button>
          </Box>
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedDayData.length > 0 ? (
          <Box className="h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={selectedDayData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ platform, count }) =>
                    `${platform}: ${count.toLocaleString()}`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="platform"
                >
                  {selectedDayData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.platform === "app" ? "#3b82f6" : "#10b981"}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={value => value.toLocaleString()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        ) : (
          <Box className="h-[300px] md:h-[400px] w-full flex items-center justify-center text-muted-foreground">
            No data available for {selectedDay}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
