import { Box } from "@/components/atoms/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface DistributionChartProps {
  pieChartData: any[];
  COLORS: string[];
}

export function DistributionChart({
  pieChartData,
  COLORS,
}: DistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <Box className="h-[300px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={120}
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
  );
}
