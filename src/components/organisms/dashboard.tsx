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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetDailyReport } from "@/hooks/networking/analytics/daily-report";
import { useGetDailySummary } from "@/hooks/networking/analytics/daily-report-summary";
import { useGetPlatformStatus } from "@/hooks/networking/content/status";
import dayjs from "dayjs";
import { AlertCircle, ExternalLink, RefreshCcw } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Title } from "../atoms/typography/title";
import { PeakActivityCard } from "../molecules/dashboard/PeakActivityCard";
import { PlatformPeaksCard } from "../molecules/dashboard/PlatformPeaksCard";
import { PlatformStatusCard } from "../molecules/dashboard/PlatformStatusCard";
import { PlatformUsageCard } from "../molecules/dashboard/PlatformUsageCard";

function ChartsSkeleton() {
  return (
    <Box className="space-y-4">
      <Skeleton className="h-10 w-[300px]" />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <Skeleton className="h-5 w-[150px]" />
          <Box className="flex gap-2">
            <Skeleton className="h-9 w-[180px]" />
            <Skeleton className="h-9 w-[140px]" />
          </Box>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    </Box>
  );
}

function SummaryCardsSkeleton() {
  return (
    <Box className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map(i => (
        <Card key={i} className="relative">
          <CardHeader>
            <Skeleton className="h-5 w-[140px]" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[100px]" />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default function Dashboard() {
  const {
    data,
    isLoading: isLoadingDailyReport,
    error,
    refetch: refetchDailyReport,
    isRefetching: isRefetchingDailyReport,
  } = useGetDailyReport();
  const {
    data: dailySummary,
    isLoading: isLoadingDailySummary,
    refetch: refetchDailySummary,
    isRefetching: isRefetchingDailySummary,
  } = useGetDailySummary();
  const { data: status, isLoading: isLoadingStatus } = useGetPlatformStatus();

  const analyticsStatus = status?.analytics?.db_connection
    ? "🟢 Live"
    : "🔴 Down";
  const notebotStatus = status?.notebot?.botStatus ? "🟢 Live" : "🔴 Down";

  const chartData = useMemo(() => data?.data ?? [], [data?.data]);

  const pieChartData = useMemo(
    () => [
      {
        name: "App",
        value: Number(dailySummary?.kpi.appPlatformPercentage ?? 0),
      },
      {
        name: "Bot",
        value: Number(dailySummary?.kpi.botPlatformPercentage ?? 0),
      },
    ],
    [dailySummary?.kpi]
  );

  const COLORS = ["#3b82f6", "#10b981"];

  const formatDate = (date: string) => {
    return dayjs(date).format("D MMMM, YYYY");
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const [timeRange, setTimeRange] = useState("7days");
  const [selectedDay, setSelectedDay] = useState("today");

  const selectedDayData = useMemo(() => {
    const today = dayjs().startOf("day");
    const targetDate =
      selectedDay === "today" ? today : today.subtract(1, "day");

    return chartData.filter(item =>
      dayjs(item.date).startOf("day").isSame(targetDate)
    );
  }, [chartData, selectedDay]);

  const filteredChartData = useMemo(() => {
    const now = dayjs();
    return chartData
      .filter(item => {
        switch (timeRange) {
          case "7days":
            return dayjs(item.date).isAfter(now.subtract(7, "days"));
          case "30days":
            return dayjs(item.date).isAfter(now.subtract(30, "days"));
          default:
            return true;
        }
      })
      .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
  }, [chartData, timeRange]);

  if (error)
    return (
      <Box className="flex items-center gap-2 p-4 text-red-500">
        <AlertCircle className="w-5 h-5" />
        Error loading dashboard data
      </Box>
    );

  return (
    <Box className="p-4 space-y-4">
      <Box className="flex items-center justify-between">
        <Title className="text-2xl font-bold">Analytics Dashboard</Title>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetchDailySummary()}
          className="z-10 gap-2 text-white right-2 top-2"
        >
          <RefreshCcw className="w-4 h-4" />
        </Button>
      </Box>

      {isLoadingDailySummary || isRefetchingDailySummary || isLoadingStatus ? (
        <SummaryCardsSkeleton />
      ) : (
        <Box className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
          <PlatformStatusCard
            analyticsStatus={analyticsStatus}
            notebotStatus={notebotStatus}
          />
          <PeakActivityCard
            highestDate={dailySummary?.kpi.highestApiCountDate ?? ""}
            lowestDate={dailySummary?.kpi.lowestApiCountDate ?? ""}
            formatDate={formatDate}
          />
          <Box className="relative">
            <PlatformPeaksCard
              highestAppCount={dailySummary?.kpi.highestAppPlatformCount ?? 0}
              highestBotCount={dailySummary?.kpi.highestBotPlatformCount ?? 0}
              formatNumber={formatNumber}
            />
          </Box>
          <PlatformUsageCard
            totalAppCount={dailySummary?.kpi.totalAppPlatformCount ?? 0}
            totalBotCount={dailySummary?.kpi.totalBotPlatformCount ?? 0}
            formatNumber={formatNumber}
          />
        </Box>
      )}

      {isLoadingDailyReport || isRefetchingDailyReport ? (
        <ChartsSkeleton />
      ) : (
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refetchDailyReport()}
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
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="gap-2"
                    >
                      <a
                        href="https://lookerstudio.google.com/u/0/reporting/c6301162-7c93-42b3-a630-a7404eab6b4e/page/3RR3D"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Show Full Report
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </Box>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Box className="h-[400px] w-full">
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
                          {
                            value: "App",
                            type: "rect",
                            color: "#3b82f6",
                          },
                          {
                            value: "Bot",
                            type: "rect",
                            color: "#10b981",
                          },
                        ]}
                      />
                      <Bar
                        dataKey="count"
                        name="Interactions"
                        label={
                          timeRange === "7days"
                            ? {
                                position: "top",
                                formatter: (value: number) =>
                                  value.toLocaleString(),
                              }
                            : false
                        }
                      >
                        {filteredChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.platform === "app" ? "#3b82f6" : "#10b981"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
                {timeRange === "all" && (
                  <Box className="mt-4 text-center">
                    <a
                      href="https://lookerstudio.google.com/u/0/reporting/c6301162-7c93-42b3-a630-a7404eab6b4e/page/3RR3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Full Report
                    </a>
                  </Box>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="today">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <Box className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetchDailyReport()}
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
                  <Box className="h-[400px] w-full">
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
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="platform"
                        >
                          {selectedDayData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.platform === "app" ? "#3b82f6" : "#10b981"
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={value => value.toLocaleString()} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                ) : (
                  <Box className="h-[400px] w-full flex items-center justify-center text-muted-foreground">
                    No data available for {selectedDay}
                  </Box>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms">
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Box className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pieChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#3b82f6" name="Interactions" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution">
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Box className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </Box>
  );
}
