"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

const getGames = async () => {
  const res = await fetch(`https://esportbackend.gemes.eu/game`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};
const Games = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  if (isLoading) {
    return (
      <div className="grid pt-[140px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 mx-auto max-w-[1400px] ">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="shadow-md shadow-purple-900 w-[400px] border-b-purple-900 border-b-4 bg-black/20"
          >
            <div className="relative w-full h-[130px]">
              <Skeleton className="w-full h-full" />
            </div>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
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
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid pt-[140px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 mx-auto max-w-[1400px] ">
        {data.data.map((game: any, i: number) => (
          <Link key={game.name} href={`/games/${game.id}`}>
            <Card className="shadow-md shadow-purple-900 border-[0px] w-[400px] hover:scale-105 duration-300 transition-all ease-in-out hover:shadow-2xl  hover:shadow-purple-900 border-b-purple-900 border-b-4 bg-black/[0] backdrop-blur-xl ">
              <div className="relative w-full h-[130px]">
                {/* <Image
                  src={game.img}
                  alt={game.name}
                  fill
                  className="object-cover rounded-se-lg rounded-ss-lg object-center"
                /> */}
              </div>
              <CardHeader>
                <CardTitle>{game.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{game.description || "nincs leírás"}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p>
                  {game.startDate} - {game.endDate}
                </p>
                <div className="italic">
                  További információk <span className=" font-black">{"⭢"}</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Games;
