"use client";
import { Setup } from "@/common/types";
import SelectBar from "@/components/select-bar";
import SetupTable from "@/components/setup-table";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Home() {

  const [setups, setSetups] = useState<Setup[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <main className={cn("min-h-screen min-w-screen bg-custom-gradient",
      "flex flex-col items-center gap-16",
      "px-6 md:px-24 py-24 md:py-36"
    )}
    >
      <h1 className="text-7xl font-bold font-kaisei text-sd-primary">SIM SHARE</h1>
      <SelectBar setSetups={setSetups} setIsLoading={setIsLoading} />
      <SetupTable isLoading={isLoading} setups={setups} />
    </main>
  );
}
