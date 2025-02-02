import { Box } from "@/components/atoms/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioLines, Bot, Smartphone } from "lucide-react";

interface PlatformPeaksCardProps {
  highestAppCount: number;
  highestBotCount: number;
  formatNumber: (num: number) => string;
}

export function PlatformPeaksCard({
  highestAppCount,
  highestBotCount,
  formatNumber,
}: PlatformPeaksCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AudioLines className="w-5 h-5" />
          Platform Peaks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Box className="flex flex-col space-y-1">
          <Box className="flex items-center justify-between">
            <Box className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-500" />
              <Box className="text-sm text-muted-foreground">App Peak:</Box>
            </Box>
            <Box className="font-semibold">{formatNumber(highestAppCount)}</Box>
          </Box>
        </Box>
        <Box className="flex flex-col space-y-1">
          <Box className="flex items-center justify-between">
            <Box className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-green-500" />
              <Box className="text-sm text-muted-foreground">Bot Peak:</Box>
            </Box>
            <Box className="font-semibold">{formatNumber(highestBotCount)}</Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
