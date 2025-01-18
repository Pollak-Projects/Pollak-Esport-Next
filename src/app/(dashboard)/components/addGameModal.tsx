"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { v4 as uuidv4 } from "uuid";

interface AddGameModalProps {
  children: React.ReactNode;
  onClose: () => void;
  onSuccess: () => void; // New prop
}

const AddGameModal: React.FC<AddGameModalProps> = ({
  children,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState<string>("");
  const [playerPerTeam, setPlayerPerTeam] = useState<number>(5);
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const uploadUrl = `${process.env.NEXT_PUBLIC_STORAGE_URL}/gamepic/${fileName}`;

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": `image/${fileExt}`,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: file,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Image upload failed:", {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });
        throw new Error(
          `Kép feltöltése sikertelen (${response.status}): ${response.statusText}`
        );
      }

      return uploadUrl;
    } catch (error) {
      console.error("Image upload error:", error);
      if (error instanceof Error) {
        throw new Error(`Kép feltöltése sikertelen: ${error.message}`);
      }
      throw new Error("Ismeretlen hiba történt a kép feltöltése során");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (
        !name ||
        !description ||
        !playerPerTeam ||
        !startDate ||
        !endDate ||
        !selectedFile
      ) {
        const missingFields = [
          !name && "név",
          !playerPerTeam && "játékosok száma",
          !startDate && "kezdési dátum",
          !endDate && "befejezési dátum",
          !selectedFile && "kép",
        ]
          .filter(Boolean)
          .join(", ");
        throw new Error(`Hiányzó mezők: ${missingFields}`);
      }

      setIsSubmitting(true);
      const imageUrl = await uploadImage(selectedFile);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            image: imageUrl,
            playerPerTeam,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            description,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Game creation failed:", {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });
        throw new Error(
          `Játék létrehozása sikertelen (${response.status}): ${response.statusText}`
        );
      }

      toast.success("Játék sikeresen hozzáadva!");
      onSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ismeretlen hiba történt");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (startDate && date && date < startDate) {
      toast.error(
        "A befejezés dátuma nem lehet korábbi, mint a kezdés dátuma!"
      );
      return;
    }
    setEndDate(date);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Játék hozzáadása</CardTitle>
          <CardDescription>Játékot itt tudsz hozzáadni.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Játék neve</Label>
                <Input
                  id="name"
                  placeholder="Játék név"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="playerCount">
                  Játékosok száma csapatonként
                </Label>
                <Input
                  id="playerCount"
                  type="number"
                  value={playerPerTeam}
                  onChange={(e) => setPlayerPerTeam(Number(e.target.value))}
                  placeholder="5"
                  min={1}
                  max={100}
                  required
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="description">Leírás</Label>
                <Textarea
                  placeholder="Leírás"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Ez a leírás fog megjelenni a játék oldalán.
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Kezdés időpontja</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate
                        ? startDate.toLocaleDateString()
                        : "Válassz dátumot"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Befejezés időpontja</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate
                        ? endDate.toLocaleDateString()
                        : "Válassz dátumot"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={handleEndDateSelect}
                      disabled={(date) =>
                        startDate ? date < startDate : false
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Kép</Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Mégse
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Feltöltés..." : "Hozzáadás"}
          </Button>
        </CardFooter>
      </Card>
      {children}
    </div>
  );
};

export default AddGameModal;
