"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Circle } from "lucide-react";
import {
  Bracket,
  IRoundProps,
  Seed,
  SeedItem,
  SeedTeam,
  IRenderSeedProps,
} from "react-brackets";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Plus, Save, Pencil, Trash2 } from "lucide-react";
import AddGameModal from "@/app/(dashboard)/components/addGameModal";
import Spinner from "@/components/Spinner";

const getGames = async () => {
  const res = await fetch(`https://esportbackend.gemes.eu/game`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

const BracketsPage = () => {
  const params = useParams<{ slug: string }>();
  const currentId = params.slug;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: currentGame,
    error: currentGameError,
    isLoading: currentGameLoading,
  } = useQuery({
    queryKey: ["games", currentId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/${currentId}`
      );
      return res.json();
    },
  });

  const {
    data: games,
    error: gamesError,
    isLoading: gamesLoading,
  } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = async () => {
    // TODO: Implement save functionality
    console.log("Saving bracket changes...");
  };

  if (currentGameLoading || gamesLoading) {
    return <Spinner />;
  }

  const rounds: IRoundProps[] = [];
  currentGame.data[0].bracket
    .replaceAll(`\\`, "")
    .split(";")
    .map((round: string) => {
      rounds.push(JSON.parse(round));
    });

  return (
    <div className="w-full h-full flex pt-[100px] flex-row pl-12 pb-24">
      <div className="fixed left-12 top-[100px] bottom-0 w-64 items-center pt-4 pr-12 border-r-[1px] border-r-border flex flex-col gap-5 text-2xl">
        {games.data.length > 0 ? (
          games.data.map((game) => (
            <Link
              href={`/admin/games/${game.id}`}
              key={game.id}
              className="text-center hover:text-purple-500 transition-colors"
            >
              {game.name || "Unnamed Game"}
            </Link>
          ))
        ) : (
          <div className="text-gray-500">No games available</div>
        )}
      </div>
      <div className="w-full flex flex-col relative ml-64">
        <div className="border-b-[1px] whitespace-nowrap w-full border-b-white/20 text-3xl flex justify-between items-center mb-8">
          <div className="flex gap-10 items-center">
            <div className="flex justify-start gap-2 items-center bg-slate-900 py-2 px-5">
              <Circle
                fill={
                  currentGame.data[0].status === "Hamarosan"
                    ? "gray"
                    : currentGame.data[0].status === "Vége"
                    ? "red"
                    : "green"
                }
                size={15}
                color={
                  currentGame.data[0].status === "Hamarosan"
                    ? "gray"
                    : currentGame.data[0].status === "Vége"
                    ? "red"
                    : "green"
                }
              />
              {currentGame.data[0].status}
            </div>
            <div>
              {currentGame.data[0].name +
                " - " +
                currentGame.data[0].playerPerTeam +
                "v" +
                currentGame.data[0].playerPerTeam}
            </div>
          </div>
          <div>
            {currentGame.data[0].startDate.split("T")[0].replaceAll("-", ".") +
              " - " +
              currentGame.data[0].endDate.split("T")[0].replaceAll("-", ".")}
          </div>
        </div>
        <Bracket
          bracketClassName="flex"
          roundTitleComponent={(title: React.ReactNode) => (
            <div className="text-center bg-slate-900 p-2 border-r-2 border-black mb-14">
              {title}
            </div>
          )}
          rounds={rounds}
          renderSeedComponent={CustomSeed}
        />
        <div className="fixed right-8 bottom-8 flex gap-4">
          <button
            onClick={handleModalToggle}
            className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
          >
            <Plus />
          </button>
          <button
            onClick={() => console.log("Edit clicked")}
            className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Pencil />
          </button>
          <button
            onClick={handleSave}
            className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            <Save />
          </button>
          <button
            onClick={() => console.log("Delete clicked")}
            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
          >
            <Trash2 />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <AddGameModal onClose={handleModalToggle} onSuccess={handleModalToggle}>
          <div className="p-4">{/* Modal content goes here */}</div>
        </AddGameModal>
      )}
    </div>
  );
};

const CustomSeed = ({ seed }: IRenderSeedProps) => {
  const [team1Score, setTeam1Score] = useState(seed.teams[0]?.score || 0);
  const [team2Score, setTeam2Score] = useState(seed.teams[1]?.score || 0);
  const [team1Name, setTeam1Name] = useState(seed.teams[0]?.name || "NO TEAM");
  const [team2Name, setTeam2Name] = useState(seed.teams[1]?.name || "NO TEAM");

  const handleScoreChange = (teamIndex: number, score: number) => {
    if (teamIndex === 0) {
      setTeam1Score(score);
    } else {
      setTeam2Score(score);
    }
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
    <Seed mobileBreakpoint={0}>
      <SeedItem className="!rounded-xl">
        <div>
          <SeedTeam className="!py-0 !px-0 h-full">
            <div className="flex flex-shrink-0 gap-2 items-center">
              <select
                value={team1Score}
                onChange={(e) => handleScoreChange(0, parseInt(e.target.value))}
                className="px-2 py-1 bg-slate-800 text-white rounded border border-gray-600 w-12"
                style={{ color: "white", backgroundColor: "#1e293b" }}
              >
                {[0, 1, 2, 3, 4, 5].map((score) => (
                  <option
                    key={score}
                    value={score}
                    style={{ backgroundColor: "#1e293b" }}
                  >
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
                className="truncate bg-slate-800 text-white border border-gray-600 rounded px-2 py-1"
                style={{ color: "white", backgroundColor: "#1e293b" }}
              >
                {teamOptions.map((team) => (
                  <option
                    key={team}
                    value={team}
                    style={{ backgroundColor: "#1e293b" }}
                  >
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
                className="px-2 py-1 bg-slate-800 text-white rounded border border-gray-600 w-12"
                style={{ color: "white", backgroundColor: "#1e293b" }}
              >
                {[0, 1, 2, 3, 4, 5].map((score) => (
                  <option
                    key={score}
                    value={score}
                    style={{ backgroundColor: "#1e293b" }}
                  >
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
                className="truncate bg-slate-800 text-white border border-gray-600 rounded px-2 py-1"
                style={{ color: "white", backgroundColor: "#1e293b" }}
              >
                {teamOptions.map((team) => (
                  <option
                    key={team}
                    value={team}
                    style={{ backgroundColor: "#1e293b" }}
                  >
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
          <div className="text-[10px] mt-1 text-slate-400 absolute w-full">
            {seed.date}
          </div>
        </div>
      </SeedItem>
    </Seed>
  );
};

export default BracketsPage;
