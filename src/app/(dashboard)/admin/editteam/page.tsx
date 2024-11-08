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
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component
import { SquarePen } from "lucide-react";

const EditTeam = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Csapat sikeresen szerkesztve", {
      description: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      action: {
        label: "Törlés",
        onClick: () => console.log("Értesítés törölve!"),
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-[600px]">
        <CardHeader>
          {loading ? (
            <>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </>
          ) : (
            <>
              <CardTitle>Csapatok szerkesztése</CardTitle>
              <CardDescription>
                Csapatot itt tudsz szerkeszteni.
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <>
              <Skeleton className="h-8 w-full mb-4" />
              <Skeleton className="h-8 w-full mb-4" />
              <Skeleton className="h-8 w-full mb-4" />
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Csapatok</Label>
                  <Table>
                    <TableCaption>Nincs több csapat</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Csapat neve</TableHead>
                        <TableHead>Tulajdonos</TableHead>
                        <TableHead>Létszám</TableHead>
                        <TableHead className="text-right">Kezelés</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Iron 8</TableCell>
                        <TableCell>Kis János</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell className="text-right">
                          {" "}
                          <Button variant="ghost">
                            <SquarePen />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {loading ? (
            <>
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </>
          ) : (
            <>
              <Button variant="outline" disabled={loading} aria-label="Mégse">
                Mégse
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                aria-label="Mentés"
              >
                Mentés
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditTeam;
