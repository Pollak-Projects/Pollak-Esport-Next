"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import AddGameModal from "@/app/(dashboard)/components/addGameModal";
import Spinner from "@/components/Spinner";

const GamesPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { data: games, isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/game`);
      return res.json();
    },
  });

  useEffect(() => {
    if (games && games.data && games.data.length > 0) {
      router.push(`/admin/games/${games.data[0].id}`);
    }
  }, [games, router]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!games?.data?.length) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <h1 className="text-4xl font-semibold">No games available</h1>
        <button
          onClick={handleModalToggle}
          className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
        >
          <Plus />
        </button>
        {isModalOpen && (
          <AddGameModal onClose={handleModalToggle}>
            <div className="p-4">{/* Modal content goes here */}</div>
          </AddGameModal>
        )}
      </div>
    );
  }

  return null;
};

export default GamesPage;
