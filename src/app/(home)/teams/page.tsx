"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import TeamCard from "../components/TeamCard";
import { type team } from "@/app";

const page = () => {
  const [inputValue, setInputValue] = useState("");

  function handleChange(e: any) {
    setInputValue(e.target!.value);
    console.log(e);
  }

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
    <div className="pt-[140px] max-w-[1500px] h-screen mx-auto flex flex-col">
      <div className="w-full border-b-white border-b-2 mb-10">
        <div className="bg-white max-w-[600px] h-[50px] mb-2 flex rounded-xl">
          <div className="text-black h-full w-[50px] flex justify-center items-center">
            <AiOutlineSearch className="" size={30} />
          </div>
          <input
            type="text"
            id="search"
            placeholder="keresés"
            className="text-2xl pl-5 h-full flex-grow rounded-e-xl text-black"
            onChange={handleChange}
            value={inputValue}
          />
        </div>
      </div>
      <div className="flex flex-col gap-10 w-full">
        {teams
          .filter((team) => team.name.startsWith(inputValue))
          .map((team) => (
            <TeamCard team={team} key={team.name} />
          ))}
      </div>
    </div>
  );
};

export default page;
