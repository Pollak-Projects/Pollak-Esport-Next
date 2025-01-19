"use client";
import Image from "next/image";
import React from "react";
import {
  Bracket,
  IRoundProps,
  Seed,
  SeedItem,
  SeedTeam,
  IRenderSeedProps,
} from "react-brackets";
import { useParams } from "next/navigation";
// import { team } from "@/app";
// import TeamCard from "../../components/TeamCard";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { Circle } from "lucide-react";

const BracketsPage = () => {
  const params = useParams<{
    slug: any;
    tag: string;
    item: string;
  }>();
  const currentId = params.slug;

  const getRounds = async () => {
    const res = await fetch(
      `https://esportbackend.gemes.eu/game/${currentId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["games", currentId],
    queryFn: getRounds,
  });

  // const teams: team[] = [
  //   {
  //     name: "jaa",
  //     image: "https://placehold.co/125x125",
  //     competition: "R6 2v2",
  //     players: [
  //       {
  //         name: "Árpi",
  //         image: "https://placehold.co/75x75",
  //         isTeamLeader: true,
  //       },
  //       {
  //         name: "Feri",
  //         image: "https://placehold.co/75x75",
  //         isTeamLeader: false,
  //       },
  //     ],
  //   },
  //   {
  //     name: "das",
  //     image: "https://placehold.co/125x125",
  //     competition: "R6 2v2",
  //     players: [
  //       {
  //         name: "Dominik",
  //         image: "https://placehold.co/75x75",
  //         isTeamLeader: true,
  //       },
  //       {
  //         name: "Dániel",
  //         image: "https://placehold.co/75x75",
  //         isTeamLeader: false,
  //       },
  //     ],
  //   },
  // ];

  if (isLoading) {
    return <Spinner />;
  }

  const rounds: IRoundProps[] = [];
  data.data[0].bracket
    .replaceAll(`\\`, "")
    .split(";")
    .map((round: string) => {
      rounds.push(JSON.parse(round));
    });

  return (
    <div className="h-screen flex flex-col">
      <div className="w-full max-md:w-fit flex pt-[150px] flex-col md:px-32 overflow-x-scroll">
        <div className="border-b-[1px] whitespace-nowrap w-full border-b-white/20 text-3xl flex justify-between items-center">
          <div className="flex gap-10 items-center">
            <div className="flex justify-start gap-2 items-center bg-slate-900 py-2 px-5">
              <Circle
                fill={
                  data.data[0].status === "Hamarosan"
                    ? "gray"
                    : data.data[0].status === "Vége"
                    ? "red"
                    : "green"
                }
                size={15}
                color={
                  data.data[0].status === "Hamarosan"
                    ? "gray"
                    : data.data[0].status === "Vége"
                    ? "red"
                    : "green"
                }
              ></Circle>
              {data.data[0].status}
            </div>
            <div className="">
              {data.data[0].name +
                " - " +
                data.data[0].playerPerTeam +
                "v" +
                data.data[0].playerPerTeam}
            </div>
          </div>
          <div className="">
            {data.data[0].startDate.split("T")[0].replaceAll("-", ".") +
              " - " +
              data.data[0].endDate.split("T")[0].replaceAll("-", ".")}
          </div>
        </div>
        <Bracket
          bracketClassName="flex justify-center w-fit pb-10"
          roundTitleComponent={(title: React.ReactNode, roundIndex: number) => {
            return (
              <div className="text-center bg-slate-900 p-2 border-r-2 border-black mb-14">
                {title}
              </div>
            );
          }}
          rounds={rounds}
          mobileBreakpoint={0}
          renderSeedComponent={CustomSeed}
        />
      </div>
      <div className="w-full flex flex-grow bg-black/30 px-20 justify-between"></div>
    </div>
  );
};

const CustomSeed = ({ seed }: IRenderSeedProps) => {
  return (
    <Seed mobileBreakpoint={0}>
      <SeedItem className="!rounded-xl">
        <div className="">
          <SeedTeam className="!py-0 !px-0 h-full">
            <div className="flex flex-shrink-0 gap-2">
              <div className="px-2 py2">{seed.teams[0]?.score}</div>
              <Image
                src={"https://placehold.co/25x25"}
                alt={"team logo"}
                width={25}
                height={25}
                className="rounded-full"
              />
              {seed.teams[0]?.name || "NO TEAM "}
            </div>
            <div className="bg-purple-900 h-full py-2 px-2 rounded-se-xl">
              1
            </div>
          </SeedTeam>
          <SeedTeam className="!py-0 !px-0 h-full text-slate-400 border-t-slate-900 border-t-[1px]">
            <div className="flex flex-shrink-0 gap-2">
              <div className="px-2 py2">{seed.teams[1]?.score}</div>
              <Image
                src={"https://placehold.co/25x25"}
                alt={"team logo"}
                width={25}
                height={25}
                className="rounded-full"
              />
              {seed.teams[1]?.name || "NO TEAM "}
            </div>
            <div className="bg-slate-600 h-full py-2 px-2 rounded-ee-xl">0</div>
          </SeedTeam>
          <div className="text-[10px] mt-1 text-slate-400 absolute w-full">
            {seed.date?.replace("T", " ").replaceAll("-", ".")}
          </div>
        </div>
      </SeedItem>
    </Seed>
  );
};

export default BracketsPage;
