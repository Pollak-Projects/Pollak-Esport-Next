"use client";
import { useEffect } from "react";
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
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

const getGames = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/game`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

const Games = () => {
  const [hover, setHover] = React.useState<number>();
  const [showAnimation, setShowAnimation] = React.useState(false);
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudio(
      new Audio(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/sounds/secret.mp3`
      )
    );
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  const playSound = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 2000);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {showAnimation && (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/sounds/secret.jpg`}
            alt="Flying"
            width={1000}
            height={1000}
            className="absolute animate-fly"
          />
        </div>
      )}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={playSound}
          className="select-none pointer-events-auto"
          tabIndex={-1}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/sounds/secret.jpg`}
            alt="secret"
            width={1}
            height={1}
            className="object-cover select-none pointer-events-none"
            draggable="false"
          />
        </button>
      </div>
      <div className="grid pt-[140px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 mx-auto max-w-[1400px] ">
        {data.data.map((game: any, i: number) => (
          <Link key={game.name} href={`/games/${game.id}`}>
            <Card
              className={cn(
                "shadow-md relative shadow-purple-900 border-[0px] w-[400px] hover:scale-105 duration-300 transition-all ease-in-out hover:shadow-2xl  hover:shadow-purple-900 border-b-purple-900 border-b-4 bg-black/20",
                { "opacity-5": hover !== game.id && hover != undefined }
              )}
              onMouseEnter={() => setHover(game.id)}
              onMouseLeave={() => setHover(undefined)}
            >
              <div className="w-full h-[30px] absolute z-30 top-2 flex justify-start px-4 gap-2 items-center">
                <Circle
                  fill={
                    game.status === "Hamarosan"
                      ? "gray"
                      : game.status === "Vége"
                      ? "red"
                      : "green"
                  }
                  size={15}
                  color={
                    game.status === "Hamarosan"
                      ? "gray"
                      : game.status === "Vége"
                      ? "red"
                      : "green"
                  }
                ></Circle>
                {game.status}
              </div>
              <div className="relative w-full h-[130px]">
                <Image
                  src={game.image}
                  alt={game.name}
                  fill
                  className="object-cover rounded-se-lg rounded-ss-lg object-center"
                />
              </div>
              <CardHeader>
                <CardTitle>
                  {game.name +
                    " - " +
                    game.playerPerTeam +
                    "v" +
                    game.playerPerTeam}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  {game.description || "nincs leírás"}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center mt-5">
                <p>
                  {game.startDate.split("T")[0].replaceAll("-", ".")} -{" "}
                  {game.endDate.split("T")[0].replaceAll("-", ".")}
                </p>
                {game.status !== "Hamarosan" && (
                  <div className="italic">
                    További információk{" "}
                    <span className=" font-black">{"⭢"}</span>
                  </div>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Games;
