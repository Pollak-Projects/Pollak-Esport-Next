import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const page = () => {
  const games = [
    {
      title: "R6 1v1",
      description:
        "Azonnali kieséses rendszerben, 3 körig tartó meccs. A játékosok a meccs előtt egyeztetnek a mapról és a karakterekről.",
      image:
        "https://i.ytimg.com/vi/drxNwPIosUM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCZ9Bt_b9O7-PBI5yVFM3C-tfvSFQ",
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
      <Navbar active="/games"></Navbar>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 mx-32">
        {games.map((game) => {
          return <div className="w-full h-[200px] " key={game.title}></div>;
        })}
      </div>
    </>
  );
};

export default page;
