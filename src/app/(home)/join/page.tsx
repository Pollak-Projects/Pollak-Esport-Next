"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

const JoinTeam = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          {loading ? (
            <Skeleton className="h-6 w-3/4" />
          ) : (
            <>
              <CardTitle>Csatlakozás csapathoz</CardTitle>
              <CardDescription>
                Csapathoz való csatlakozáshoz add meg a csapatvezetőtől kapott
                kódot!
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <form>
              <div className="grid w-full items-center gap-4">
                <InputOTP
                  required
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <div className="items-top flex space-x-2">
                  <Checkbox required id="terms" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Elfogadom az ÁSZF-et.
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Ezzel beleegyezel, hogy betartod az ÁSZF-et.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {loading ? (
            <>
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </>
          ) : (
            <>
              <Button variant="outline">Mégse</Button>
              <Button
                type="submit"
                onClick={() =>
                  toast("Sikeresen csatlakoztál a csapathoz!", {
                    description: new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    action: {
                      label: "Törlés",
                      onClick: () => console.log("Értesítés törölve!"),
                    },
                  })
                }
              >
                Csatlakozás
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default JoinTeam;
