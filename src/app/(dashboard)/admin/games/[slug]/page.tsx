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
import Link from "next/link";
import { Plus } from "lucide-react";
import AddGameModal from "@/components/ui/addGameModal"; // Import the modal component

const BracketsPage = () => {
  const params = useParams<{ tag: string; item: string }>();
  const [loading, setLoading] = useState(true);
  const [rounds, setRounds] = useState<IRoundProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const games = [
    {
      id: 1,
      name: "Rainbow",
    },
    {
      id: 2,
      name: "Game 2",
    },
    {
      id: 3,
      name: "Game 3",
    },
    {
      id: 4,
      name: "Game 4",
    },
  ];

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
    <div className="w-full h-full flex pt-[100px] flex-row pl-12 pb-24">
      <div className="relative w-64 items-center pt-4 pr-12 h-full border-r-[1px] border-r-border flex flex-col gap-5 text-2xl mr-44 justify-center">
        <Link
          href="#"
          onClick={handleModalToggle} // Toggle modal on click
          className="absolute bottom-0 right-0 mb-4 mr-4 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center"
        >
          <Plus />
        </Link>
        {games.map((game) => {
          return (
            <Link
              href={`/admin/games/${game.id}`}
              key={game.id}
              className="text-center"
            >
              {game.name}
            </Link>
          );
        })}
      </div>
      {loading ? (
        <Skeleton className="w-full h-96" />
      ) : (
        <Bracket
          bracketClassName="flex"
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
      {isModalOpen && (
        <AddGameModal onClose={handleModalToggle} onSuccess={handleModalToggle}>
          <div className="p-4">{/* Modal content goes here */}</div>
        </AddGameModal>
      )}
    </div>
  );
};

const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
  const [team1Score, setTeam1Score] = useState(seed.teams[0]?.score || 0);
  const [team2Score, setTeam2Score] = useState(seed.teams[1]?.score || 0);
  const [chosenTime, setChosenTime] = useState(
    new Date().toLocaleString("hu-HU", { hour12: false })
  );
  const [team1Name, setTeam1Name] = useState(seed.teams[0]?.name || "NO TEAM");
  const [team2Name, setTeam2Name] = useState(seed.teams[1]?.name || "NO TEAM");

  const handleScoreChange = (teamIndex: number, score: number) => {
    if (teamIndex === 0) {
      setTeam1Score(score);
    } else {
      setTeam2Score(score);
    }
    setChosenTime(new Date().toLocaleString("hu-HU", { hour12: false }));
  };

  const handleNameChange = (teamIndex: number, name: string) => {
    if (teamIndex === 0) {
      setTeam1Name(name);
    } else {
      setTeam2Name(name);
    }
  };

  const teamOptions = [
    "Team A",
    "Team B",
    "Team C",
    "Team D",
    "Team E",
    "Team F",
    "Team G",
    "Team H",
  ];

  const getScoreIndicator = (teamIndex: number) => {
    if (team1Score > team2Score && teamIndex === 0) return "1";
    if (team2Score > team1Score && teamIndex === 1) return "1";
    return "0";
  };

  const getScoreIndicatorClass = (teamIndex: number) => {
    if (team1Score > team2Score && teamIndex === 0)
      return "bg-purple-900 text-white";
    if (team2Score > team1Score && teamIndex === 1)
      return "bg-purple-900 text-white";
    return "bg-slate-600 text-slate-400";
  };

  return (
    <Seed mobileBreakpoint={breakpoint}>
      <SeedItem className="!rounded-xl">
        <div className="">
          <SeedTeam className="!py-0 !px-0 h-full">
            <div className="flex flex-shrink-0 gap-2 items-center">
              <select
                value={team1Score}
                onChange={(e) => handleScoreChange(0, parseInt(e.target.value))}
                className="px-2 py-1 bg-transparent text-white rounded border border-gray-600 w-12"
              >
                {[0, 1, 2, 3, 4, 5].map((score) => (
                  <option key={score} value={score}>
                    {score}
                  </option>
                ))}
              </select>
              <Image
                src={"https://placehold.co/25x25"}
                alt={"team logo"}
                width={25}
                height={25}
                className="rounded-full"
              />
              <select
                value={team1Name}
                onChange={(e) => handleNameChange(0, e.target.value)}
                className="truncate bg-transparent text-white border border-gray-600 rounded px-2 py-1"
              >
                {teamOptions.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={`${getScoreIndicatorClass(
                0
              )} h-full py-2 px-2 rounded-se-xl`}
            >
              {getScoreIndicator(0)}
            </div>
          </SeedTeam>
          <SeedTeam className="!py-0 !px-0 h-full text-slate-400 border-t-slate-900 border-t-[1px]">
            <div className="flex flex-shrink-0 gap-2 items-center">
              <select
                value={team2Score}
                onChange={(e) => handleScoreChange(1, parseInt(e.target.value))}
                className="px-2 py-1 bg-transparent text-white rounded border border-gray-600 w-12"
              >
                {[0, 1, 2, 3, 4, 5].map((score) => (
                  <option key={score} value={score}>
                    {score}
                  </option>
                ))}
              </select>
              <Image
                src={"https://placehold.co/25x25"}
                alt={"team logo"}
                width={25}
                height={25}
                className="rounded-full"
              />
              <select
                value={team2Name}
                onChange={(e) => handleNameChange(1, e.target.value)}
                className="truncate bg-transparent text-white border border-gray-600 rounded px-2 py-1"
              >
                {teamOptions.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={`${getScoreIndicatorClass(
                1
              )} h-full py-2 px-2 rounded-ee-xl`}
            >
              {getScoreIndicator(1)}
            </div>
          </SeedTeam>
        </div>
      </SeedItem>
      <div className="text-xs mt-1 text-slate-400">{chosenTime}</div>
    </Seed>
  );
};

export default BracketsPage;
