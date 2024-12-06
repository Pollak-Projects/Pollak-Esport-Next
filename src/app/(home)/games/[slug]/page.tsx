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
import { team } from "@/app";
import TeamCard from "../../components/TeamCard";
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
  const teams: team[] = [
    {
      name: "jaa",
      image: "https://placehold.co/125x125",
      competition: "R6 2v2",
      players: [
        {
          name: "Árpi",
          image: "https://placehold.co/75x75",
          isTeamLeader: true,
        },
        {
          name: "Feri",
          image: "https://placehold.co/75x75",
          isTeamLeader: false,
        },
      ],
    },
    {
      name: "das",
      image: "https://placehold.co/125x125",
      competition: "R6 2v2",
      players: [
        {
          name: "Dominik",
          image: "https://placehold.co/75x75",
          isTeamLeader: true,
        },
        {
          name: "Dániel",
          image: "https://placehold.co/75x75",
          isTeamLeader: false,
        },
      ],
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="w-full max-md:w-fit flex pt-[150px] flex-col md:px-32 overflow-x-scroll">
        <div className="border-b-[1px] whitespace-nowrap w-full border-b-white/20 text-3xl pb-2">
          Ranbow Six Seige - 1v1 - 2024.11.1
        </div>
        {loading ? (
          <Skeleton className="w-full h-96" />
        ) : (
          <Bracket
            bracketClassName="flex justify-center w-fit pb-10"
            roundTitleComponent={(
              title: React.ReactNode,
              roundIndex: number
            ) => {
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
        )}
      </div>
      <div className="w-full flex flex-grow bg-black px-20 justify-between">
        <div className="">
          <div className="text-5xl">Leírás</div>
          <div className="text-slate-300">
            Blaa blaah blahh vmi játlk ebmerekkel és csapatokkal Lorem ipsum,
            dolor sit amet consectetur adipisicing elit. Iste, qui?
          </div>
        </div>
        <div className="">
          {teams.map((team) => {
            return <TeamCard team={team} key={team.name} />;
          })}
        </div>
      </div>
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
            {seed.date}
          </div>
        </div>
      </SeedItem>
    </Seed>
  );
};

export default BracketsPage;
