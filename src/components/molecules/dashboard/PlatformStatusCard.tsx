import { Box } from "@/components/atoms/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Heart } from "lucide-react";

interface PlatformStatusCardProps {
  analyticsStatus: string;
  notebotStatus: string;
}

export function PlatformStatusCard({
  analyticsStatus,
  notebotStatus,
}: PlatformStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Platform Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Box className="flex flex-col space-y-1">
          <Box className="flex items-center justify-between">
            <Box className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-500" />
              <Box className="text-sm text-muted-foreground">Analytics:</Box>
            </Box>
            <Box className="font-semibold">{analyticsStatus}</Box>
          </Box>
        </Box>
        <Box className="flex flex-col space-y-1">
          <Box className="flex items-center justify-between">
            <Box className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-green-500" />
              <Box className="text-sm text-muted-foreground">Notebot:</Box>
            </Box>
            <Box className="font-semibold">{notebotStatus}</Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
