import { Box } from "@/components/atoms/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetDailyReport } from "@/hooks/networking/analytics/daily-report";
import { useGetDailySummary } from "@/hooks/networking/analytics/daily-report-summary";
import { useGetGameScores } from "@/hooks/networking/analytics/game-scores";
import { useGetPlatformStatus } from "@/hooks/networking/content/status";
import dayjs from "dayjs";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Title } from "../atoms/typography/title";
import { AppUsersCard } from "../molecules/dashboard/AppUsersCard";
import { DistributionChart } from "../molecules/dashboard/DistributionChart";
import { GameScoresCard } from "../molecules/dashboard/GameScoresCard";
import { PeakActivityCard } from "../molecules/dashboard/PeakActivityCard";
import { PlatformPeaksCard } from "../molecules/dashboard/PlatformPeaksCard";
import { PlatformStatusCard } from "../molecules/dashboard/PlatformStatusCard";
import { PlatformUsageCard } from "../molecules/dashboard/PlatformUsageCard";
import { TimelineChart } from "../molecules/dashboard/TimelineChart";
import { TodayChart } from "../molecules/dashboard/TodayChart";
import { TopContentCards } from "../molecules/dashboard/TopContentCards";

function ChartsSkeleton() {
  return (
    <Box className="space-y-4">
      <Skeleton className="h-10 w-[300px]" />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <Skeleton className="h-5 size-[30px]" />
          <Box className="flex gap-2">
            <Skeleton className="h-9 w-[180px]" />
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
    <Box className="grid max-w-full grid-cols-1 gap-2 xs:grid-cols-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map(i => (
        <Card
          key={i}
          className="relative min-w-[240px] xs:min-w-[200px] xs:max-w-[200px]"
        >
          <CardHeader className="p-3 xs:p-4">
            <Skeleton className="h-5 w-[120px] xs:w-[100px] max-w-[100px]" />
          </CardHeader>
          <CardContent className="p-3 space-y-2 xs:p-4">
            <Skeleton className="h-4 w-[100px] xs:w-[100px] max-w-[100px]" />
            <Skeleton className="h-4 w-[80px] xs:w-[100px] max-w-[100px]" />
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
  const { data: gameScores, isLoading: isLoadingGameScores } =
    useGetGameScores();

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
    <Box className="w-full max-w-screen-xl p-4 space-y-4">
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

          <PlatformPeaksCard
            highestAppCount={dailySummary?.kpi.highestAppPlatformCount ?? 0}
            highestBotCount={dailySummary?.kpi.highestBotPlatformCount ?? 0}
            formatNumber={formatNumber}
          />

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
            {/* <TabsTrigger value="today">Today</TabsTrigger> */}
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            <Box className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-4">
              <TimelineChart
                filteredChartData={filteredChartData}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                refetchDailyReport={refetchDailyReport}
              />
              <TodayChart
                selectedDayData={selectedDayData}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                refetchDailyReport={refetchDailyReport}
              />
            </Box>
          </TabsContent>

          {/* <TabsContent value="today">
            <TodayChart
              selectedDayData={selectedDayData}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              refetchDailyReport={refetchDailyReport}
            />
          </TabsContent> */}

          <TabsContent value="distribution">
            <DistributionChart pieChartData={pieChartData} COLORS={COLORS} />
          </TabsContent>
        </Tabs>
      )}

      <AppUsersCard />

      <Box className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TopContentCards />
        <GameScoresCard
          scores={gameScores?.hof ?? []}
          isLoading={isLoadingGameScores}
        />
      </Box>
    </Box>
  );
}
