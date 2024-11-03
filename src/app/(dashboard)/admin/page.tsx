"use client";
import React, { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component

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

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-10 p-10">
        <Card className="w-80 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-center">
              Regisztrált felhasználók
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-16 w-full bg-slate-700" />
            ) : (
              <p className="text-6xl text-center">365</p>
            )}
          </CardContent>
        </Card>
        <Card className="w-80 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-center">Regisztrált csapatok</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-16 w-full bg-slate-700" />
            ) : (
              <p className="text-6xl text-center">23</p>
            )}
          </CardContent>
        </Card>
        <Card className="w-80 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-center">Lejátszott meccsek</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-16 w-full bg-slate-700" />
            ) : (
              <p className="text-6xl text-center">28</p>
            )}
          </CardContent>
        </Card>
        <Card className="w-80 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-center">
              Live nézők
              <span className="relative inline-flex ml-2">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-red-500 opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-16 w-full bg-slate-700" />
            ) : (
              <p className="text-6xl text-center">1 207</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-wrap">
        <div className="flex flex-col gap-10 p-10 py-0">
          <Card className="w-80 max-h-40 bg-slate-800">
            <CardHeader>
              <CardTitle className="text-center">Összes nézettség</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-16 w-full bg-slate-700" />
              ) : (
                <p className="text-6xl text-center">105 263</p>
              )}
            </CardContent>
          </Card>
          <Card className="w-80 max-h-40 bg-slate-800">
            <CardHeader>
              <CardTitle className="text-center">
                Összes nézettség eszközönként
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-16 w-full bg-slate-700" />
              ) : (
                <div className="flex justify-center gap-5">
                  <p className="text-3xl text-center">72 805</p>
                  <Separator orientation="vertical" />
                  <p className="text-3xl text-center">32 458</p>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="w-80 max-h-40 bg-slate-800">
            <CardHeader>
              <CardTitle className="text-center">
                Átlag nézettség eszközönként havonta
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-16 w-full bg-slate-700" />
              ) : (
                <div className="flex justify-center gap-5">
                  <p className="text-3xl text-center">6 067</p>
                  <Separator orientation="vertical" />
                  <p className="text-3xl text-center">2 074</p>
                </div>
              )}
            </CardContent>
          </Card>
{/* use min-h to make it responsive */}
          <div className="py-0">
            <Card className="bg-slate-800">
              <ChartContainer config={chartConfig} className="h-[70dvh] w-full">
                <BarChart width={1100} height={600} data={chartData}>
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
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
