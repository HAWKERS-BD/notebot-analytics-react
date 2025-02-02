import { Box } from "@/components/atoms/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

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
          <Bot className="w-5 h-5" />
          Platform Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Box className="flex items-center gap-2">
          <Box className="text-sm text-muted-foreground">Analytics:</Box>
          <Box className="font-semibold">{analyticsStatus}</Box>
        </Box>
        <Box className="flex items-center gap-2">
          <Box className="text-sm text-muted-foreground">Notebot:</Box>
          <Box className="font-semibold">{notebotStatus}</Box>
        </Box>
      </CardContent>
    </Card>
  );
}
