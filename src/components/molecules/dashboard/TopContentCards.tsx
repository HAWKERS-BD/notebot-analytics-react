import { Box } from "@/components/atoms/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetTopLabs,
  useGetTopNotes,
} from "@/hooks/networking/analytics/top-content";

function TopContentSkeleton() {
  return (
    <Box className="grid max-w-full grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2">
      {[1, 2].map(i => (
        <Card key={i}>
          <CardHeader className="p-3 xs:p-4">
            <Skeleton className="h-5 w-[120px]" />
          </CardHeader>
          <CardContent className="p-3 space-y-2 xs:p-4">
            {[1, 2, 3].map(j => (
              <Skeleton key={j} className="w-full h-4" />
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export function TopContentCards() {
  const { data: topNotes, isLoading: isLoadingTopNotes } = useGetTopNotes();
  const { data: topLabs, isLoading: isLoadingTopLabs } = useGetTopLabs();

  if (isLoadingTopNotes || isLoadingTopLabs) {
    return <TopContentSkeleton />;
  }

  return (
    <Box className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">📗 Top Notes</h3>
        </CardHeader>
        <CardContent className="space-y-2">
          {topNotes?.topNoteSubjects.map(note => (
            <Box key={note.id} className="flex items-center justify-between">
              <span>{note.sub_name}</span>
              <span className="text-muted-foreground">
                Level {note.level} • {note.count.toLocaleString()} views
              </span>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">📄 Top Labs</h3>
        </CardHeader>
        <CardContent className="space-y-2">
          {topLabs?.topLabSubjects.map(lab => (
            <Box key={lab.id} className="flex items-center justify-between">
              <span>{lab.lab_name}</span>
              <span className="text-muted-foreground">
                Level {lab.level} • {lab.count.toLocaleString()} views
              </span>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
