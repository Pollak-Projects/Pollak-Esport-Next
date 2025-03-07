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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { User } from "next-auth";
import { useAuth } from "@/hooks/useAuth";

interface ExtendedUser extends User {
  id?: string;
}
  const { user } = useAuth() as { user: ExtendedUser | null };
const JoinTeam = () => {
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

    if (!checked) {
      toast.error("Először fogadd el az ÁSZF-et!");
      return;
    }

    setLoading(true);
    setMessage("");
    
    if (!user) {
      toast.error("A művelethez be kell jelentkezned!");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/join/${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.id
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setCode("");
        setChecked(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Csatlakozás csapathoz</CardTitle>
          <CardDescription>
            Csapathoz való csatlakozáshoz add meg a csapatvezetőtől kapott
            kódot!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <InputOTP
                value={code}
                onChange={handleCodeChange}
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
                <Checkbox
                  checked={checked}
                  onCheckedChange={(checked) => setChecked(checked === true)}
                  required
                  id="terms"
                />
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

              {message && (
                <p className="text-red-500 text-sm">{message}</p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
          >
            Mégse
          </Button>
          <Button
            type="submit"
            disabled={loading || !checked}
            onClick={handleSubmit}
          >
            {loading ? "Feldolgozás..." : "Csatlakozás"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JoinTeam;