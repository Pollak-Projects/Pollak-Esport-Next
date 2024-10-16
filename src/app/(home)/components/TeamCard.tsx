import Image from "next/image";
import React from "react";
import { type team } from "@/app";
import { FaCrown } from "react-icons/fa";

const TeamCard = ({ team }: { team: team }) => {
  return (
    <div className="w-full bg-black/10 flex items-center justify-between border-black/20 border-[3px] backdrop-blur-3xl h-[170px] px-20 rounded-2xl shadow-sm shadow-purple-900">
      <div className="h-full">
        <div className="flex gap-5 items-center h-full">
          <Image
            src={team.image}
            alt="team image"
            width={125}
            height={125}
            className="rounded-full"
          />
          <div className="text-4xl">
            {team.name}
            <span className="text-2xl border-l-[2px] ml-4 pl-4 border-l-slate-600 text-slate-600">
              {team.competition}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {team.players.map((player) => {
          if (player.isTeamLeader) {
            return (
              <Image
                key={player.name}
                src={player.image}
                alt={player.name}
                width={75}
                height={75}
                className="rounded-full"
              />
            );
          } else {
            return (
              <div key={player.name} className="relative">
                <Image
                  src={player.image}
                  alt={player.name}
                  width={75}
                  height={75}
                  className="rounded-full border-4 border-yellow-400"
                />
                <FaCrown
                  className="absolute top-[-22px] left-[24px]"
                  color="#facc15"
                  size={25}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default TeamCard;
