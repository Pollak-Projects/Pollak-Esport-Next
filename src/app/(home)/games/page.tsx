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
import React from "react";
import img from "../../../tempimg/r6 card (1v1).png";
const page = () => {
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 mx-auto max-w-[1500px] ">
        {games.map((game, i) => {
          return (
            <Link key={game.title} href={`/games/${i}`}>
              <Card className="shadow-md shadow-purple-900 hover:scale-105 transition-all ease-in-out hover:shadow-2xl hover:shadow-purple-900 border-b-purple-900 border-b-4 bg-black/20">
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
          );
        })}
      </div>
    </>
  );
};

export default page;
