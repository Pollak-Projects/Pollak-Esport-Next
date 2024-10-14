"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import img from "../../../tempimg/r6 card (1v1).png";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  const [loading, setLoading] = useState(true);
  const games = [
    {
      title: "R6 1v1",
      description:
        "Azonnali kieséses rendszerben, 3 körig tartó meccs. A játékosok a meccs előtt egyeztetnek a mapról és a karakterekről.",
      image: img,
      sub: "subtitle",
    },
    {
      title: "R6 1v4",
      description:
        "Azonnali kieséses rendszerben, 3 körig tartó meccs. A játékosok a meccs előtt egyeztetnek a mapról és a karakterekről.",
      image:
        "https://i.ytimg.com/vi/drxNwPIosUM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCZ9Bt_b9O7-PBI5yVFM3C-tfvSFQ",
      sub: "subtitle",
    },
    {
      title: "R6 1v2",
      description:
        "Azonnali kieséses rendszerben, 3 körig tartó meccs. A játékosok a meccs előtt egyeztetnek a mapról és a karakterekről.",
      image:
        "https://i.ytimg.com/vi/drxNwPIosUM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCZ9Bt_b9O7-PBI5yVFM3C-tfvSFQ",
      sub: "subtitle",
    },
    {
      title: "R6 1v5",
      description:
        "Azonnali kieséses rendszerben, 3 körig tartó meccs. A játékosok a meccs előtt egyeztetnek a mapról és a karakterekről.",
      image:
        "https://i.ytimg.com/vi/drxNwPIosUM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCZ9Bt_b9O7-PBI5yVFM3C-tfvSFQ",
      sub: "subtitle",
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 mx-auto max-w-[1500px] ">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                className="shadow-md shadow-purple-900 border-b-purple-900 border-b-4 bg-black/20"
              >
                <div className="relative w-full h-[150px]">
                  <Skeleton className="w-full h-full" />
                </div>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-2" />
                  <Skeleton className="h-4 w-2/3 mt-2" />
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </CardFooter>
              </Card>
            ))
          : games.map((game, i) => (
              <Link key={game.title} href={`/games/${i}`}>
                <Card className="shadow-md shadow-purple-900 hover:scale-105 transition-all ease-in-out hover:shadow-2xl hover:shadow-purple-900 border-b-purple-900 border-b-4 bg-black/20 peer peer-hover:hidden">
                  <div className="relative w-full h-[150px]">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover rounded-se-lg rounded-ss-lg object-center"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{game.title}</CardTitle>
                    <CardDescription>{game.sub}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{game.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <p>2024.09.01 - 2024.09.10</p>
                    <div className="italic">
                      További információk{" "}
                      <span className=" font-black">{"⭢"}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
      </div>
    </>
  );
};

export default page;
