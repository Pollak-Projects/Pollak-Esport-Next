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
import { useParams } from "next/navigation";
const BracketsPage = () => {
  const params = useParams<{ tag: string; item: string }>();
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
              teams: [
                { name: "Team B", score: 3 },
                { name: "Team V", score: 1 },
              ],
            },
            {
              id: 3,
              date: new Date(2024, 11, 20, 3, 0, 0).toLocaleString("hu-HU", {
                hour12: false,
              }),
              teams: [
                { name: "Team A", score: 3 },
                { name: "Team F", score: 1 },
              ],
            },
            {
              id: 2,
              date: new Date(2024, 11, 20, 3, 0, 0).toLocaleString("hu-HU", {
                hour12: false,
              }),
              teams: [
                { name: "Team C", score: 3 },
                { name: "Team G", score: 1 },
              ],
            },
            {
              id: 4,
              date: new Date(2024, 11, 20, 3, 0, 0).toLocaleString("hu-HU", {
                hour12: false,
              }),
              teams: [
                { name: "Team D", score: 3 },
                { name: "Team E", score: 1 },
              ],
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
              teams: [
                { name: "Team A", score: 3 },
                { name: "Team B", score: 1 },
              ],
            },
            {
              id: 2,
              date: new Date(2024, 11, 20, 3, 0, 0).toLocaleString("hu-HU", {
                hour12: false,
              }),
              teams: [
                { name: "Team C", score: 3 },
                { name: "Team D", score: 1 },
              ],
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
              teams: [
                { name: "Team A", score: 3 },
                { name: "Team C", score: 1 },
              ],
            },
          ],
        },
      ]);
      setLoading(false);
    }, 1000); // Simulate a 2-second loading time
  }, []);

  return (
    <div className="w-full h-full flex pt-[150px] flex-col px-32">
      <div className="border-b-[1px] border-b-white/20 w-full text-3xl pb-2">
        Ranbow Six Seige - 1v1 - 2024.11.1
      </div>
      {loading ? (
        <Skeleton className="w-full h-96" />
      ) : (
        <Bracket
          bracketClassName="flex justify-center"
          roundTitleComponent={(title: React.ReactNode, roundIndex: number) => {
            return (
              <div className="text-center bg-slate-900 p-2 border-r-2 border-black mb-14">
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

const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
  return (
    <Seed mobileBreakpoint={breakpoint}>
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
        </div>
      </SeedItem>
      <div className="text-xs mt-1 text-slate-400">{seed.date}</div>
    </Seed>
  );
};

export default BracketsPage;
