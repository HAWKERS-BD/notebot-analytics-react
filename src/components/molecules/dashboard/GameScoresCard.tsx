import { Box } from "@/components/atoms/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Copy, Eye, Trophy } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type GameScore = {
  date: string;
  score: number;
  email: string;
  user_name: string;
};

type GameScoresCardProps = {
  scores: GameScore[];
  isLoading: boolean;
};

export function GameScoresCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Trophy className="w-5 h-5" />
        <Skeleton className="h-5 w-[150px]" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3].map(i => (
          <Box key={i} className="flex items-center justify-between">
            <Box className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-4 w-[120px]" />
            </Box>
            <Skeleton className="h-4 w-[60px]" />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export function GameScoresCard({ scores, isLoading }: GameScoresCardProps) {
  if (isLoading) {
    return <GameScoresCardSkeleton />;
  }

  const topScores = scores.slice(0, 3);

  const getTrophyColor = (index: number) => {
    switch (index) {
      case 0:
        return "text-yellow-400";
      case 1:
        return "text-gray-400";
      case 2:
        return "text-amber-600";
      default:
        return "text-gray-500";
    }
  };

  const truncateName = (name: string, maxLength: number = 15) => {
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <Box className="flex items-center gap-2">
          {/* <Trophy className="w-5 h-5" /> */}
          <h3 className="text-lg font-semibold">
            🏆 NoteBird Scores
          </h3>
        </Box>
        <Link to="/game-score">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {topScores.map((score, index) => (
          <Box key={index} className="flex items-center justify-between">
            <Box className="flex items-center gap-2">
              <Box
                className={`flex items-center justify-center size-8 rounded-full bg-muted ${getTrophyColor(
                  index
                )}`}
              >
                {index + 1}
              </Box>
              <Box className="font-medium" title={score.user_name}>
                {truncateName(score.user_name)}
              </Box>
            </Box>
            <Box className="flex items-center gap-2">
              <span className="font-semibold">
                {score.score.toLocaleString()}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopyEmail(score.email)}
                title={`Copy ${score.user_name}'s email`}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
