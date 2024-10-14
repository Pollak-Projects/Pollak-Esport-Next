"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Monitor, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const chartData = [
  { month: "Január", desktop: 186, mobile: 80 },
  { month: "Február", desktop: 305, mobile: 200 },
  { month: "Március", desktop: 237, mobile: 120 },
  { month: "Április", desktop: 73, mobile: 190 },
  { month: "Május", desktop: 209, mobile: 130 },
  { month: "Június", desktop: 214, mobile: 140 },
  { month: "Július", desktop: 186, mobile: 80 },
  { month: "Augusztus", desktop: 305, mobile: 200 },
  { month: "Szeptember", desktop: 237, mobile: 120 },
  { month: "Október", desktop: 73, mobile: 190 },
  { month: "November", desktop: 209, mobile: 130 },
  { month: "December", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    icon: Monitor,
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    icon: Phone,
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const page = () => {
  return (
    <>
      <div className="flex flex-wrap gap-10 p-10">
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-center">
              Regisztrált felhasználók
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-6xl text-center">365</p>
          </CardContent>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-center">Regisztrált csapatok</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-6xl text-center">23</p>
          </CardContent>
        </Card>
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-center">Lejátszott meccsek</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-6xl text-center">28</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-wrap">
        <div className="flex flex-col gap-10 p-10">
          <Card className="w-80 max-h-40">
            <CardHeader>
              <CardTitle className="text-center">Összes nézettség</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-6xl text-center">105 263</p>
            </CardContent>
          </Card>
          <Card className="w-80 max-h-40">
            <CardHeader>
              <CardTitle className="text-center">Összes nézettség eszközönként</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-5">
                <p className="text-3xl text-center">72 805</p>
                <Separator orientation="vertical" />
                <p className="text-3xl text-center">32 458</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="py-10">
          <Card>
            <ChartContainer config={chartConfig} className="h-[82dvh] w-full">
              <BarChart width={500} height={300} data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
