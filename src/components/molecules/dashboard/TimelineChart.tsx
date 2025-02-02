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
import dayjs from "dayjs";
import { ExternalLink, RefreshCcw } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TimelineChartProps {
  filteredChartData: any[];
  timeRange: string;
  setTimeRange: (value: string) => void;
  refetchDailyReport: () => void;
}

export function TimelineChart({
  filteredChartData,
  timeRange,
  setTimeRange,
  refetchDailyReport,
}: TimelineChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refetchDailyReport}
            className="gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
          </Button>

          <Box className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild variant="default" size="sm" className="gap-2">
              <a
                href="https://lookerstudio.google.com/u/0/reporting/c6301162-7c93-42b3-a630-a7404eab6b4e/page/3RR3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </Box>
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Box className="h-[400px] w-full min-w-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={date => dayjs(date).format("D MMM,YY")}
                angle={-45}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip />
              <Legend
                payload={[
                  { value: "App", type: "rect", color: "#3b82f6" },
                  { value: "Bot", type: "rect", color: "#10b981" },
                ]}
              />
              <Bar
                dataKey="count"
                name="Interactions"
                label={
                  timeRange === "7days"
                    ? {
                        position: "top",
                        formatter: (value: number) => value.toLocaleString(),
                      }
                    : false
                }
              >
                {filteredChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.platform === "app" ? "#3b82f6" : "#10b981"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
