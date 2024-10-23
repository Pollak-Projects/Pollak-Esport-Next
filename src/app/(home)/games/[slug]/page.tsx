"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Bracket,
  IRoundProps,
  Seed,
  SeedItem,
  SeedTeam,
  IRenderSeedProps,
} from "react-brackets";
import { Skeleton } from "@/components/ui/skeleton";

const page = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(true);
  const [rounds, setRounds] = useState<IRoundProps[]>([]);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setRounds([
        {
          title: "Negyeddöntő",
          seeds: [
            {
              id: 1,
              date: new Date(2024, 11, 20, 3, 0, 0).toLocaleString("hu-HU", {
                hour12: false,
              }),
              teams: [{ name: "Team B" }, { name: "Team V" }],
            },
            {
              id: 3,
              date: new Date(2024, 11, 20, 3, 0, 0).toLocaleString("hu-HU", {
                hour12: false,
              }),
              teams: [{ name: "Team A" }, { name: "Team F" }],
            },
            {
              id: 2,
              date: new Date(2024, 11, 20, 3, 0, 0).toLocaleString("hu-HU", {
                hour12: false,
              }),
              teams: [{ name: "Team C" }, { name: "Team G" }],
            },
            {
              id: 4,
              date: new Date(2024, 11, 20, 3, 0, 0).toLocaleString("hu-HU", {
                hour12: false,
              }),
              teams: [{ name: "Team D" }, { name: "Team E" }],
            },
          ],
        },
        {
          title: "Elődöntő",
          seeds: [
            {
              id: 1,
              date: new Date(2024, 11, 20, 3, 0, 0).toLocaleString("hu-HU", {
                hour12: false,
              }),
              teams: [{ name: "Team A" }, { name: "Team B" }],
            },
            {
              id: 2,
              date: new Date(2024, 11, 20, 3, 0, 0).toLocaleString("hu-HU", {
                hour12: false,
              }),
              teams: [{ name: "Team C" }, { name: "Team D" }],
            },
          ],
        },
        {
          title: "Döntő",
          seeds: [
            {
              id: 3,
              date: new Date(2024, 11, 20, 3, 0, 0).toLocaleString("hu-HU", {
                hour12: false,
              }),
              teams: [{ name: "Team A" }, { name: "Team C" }],
            },
          ],
        },
      ]);
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
  }, []);

  return (
    <div className="w-full h-full flex gap-20 pt-[50px] flex-col px-32">
      <div className="border-b-[1px] border-b-white/20 w-full text-3xl pb-5">
        Ranbow Six Seige - 1v1 - 2024.11.1
      </div>
      {loading ? (
        <Skeleton className="w-full h-96" />
      ) : (
        <Bracket
          roundTitleComponent={(title: React.ReactNode, roundIndex: number) => {
            return (
              <div className="text-center bg-slate-900 p-2 mx-2 mb-14">
                {title}
              </div>
            );
          }}
          rounds={rounds}
          renderSeedComponent={CustomSeed}
        />
      )}
    </div>
  );
};

const CustomSeed = ({
  seed,
  breakpoint,
  roundIndex,
  seedIndex,
}: IRenderSeedProps) => {
  return (
    <Seed mobileBreakpoint={breakpoint}>
      <SeedItem>
        <div>
          <SeedTeam>
            <Image
              src={"https://placehold.co/25x25"}
              alt={"team logo"}
              width={25}
              height={25}
              className="rounded-full"
            />
            {seed.teams[0]?.name || "NO TEAM "}
          </SeedTeam>
          <SeedTeam className="text-white/20">
            <Image
              src={"https://placehold.co/25x25"}
              alt={"team logo"}
              width={25}
              height={25}
              className="rounded-full"
            />
            {seed.teams[1]?.name || "NO TEAM "}
          </SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

export default page;
