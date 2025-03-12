"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getVehiclesByOrigin } from "../api/get-vehicles-by-origin";
import Loader from "@/components/loading";

const chartConfig = {
  total: {
    label: "Quantidade",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function VehiclesByOriginChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoading(true);
        const data = await getVehiclesByOrigin();
        setChartData(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Veículos por Origem</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="origin"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  width={200}
                />
                <XAxis dataKey="total" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="total"
                  layout="vertical"
                  fill="var(--color-amount)"
                  radius={4}
                >
                  <LabelList
                    dataKey="total"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
