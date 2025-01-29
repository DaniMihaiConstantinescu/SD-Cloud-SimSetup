import SelectBar from "@/components/select-bar";
import { cn } from "@/lib/utils";

export default function Home() {

  return (
    <main className={cn("min-h-screen min-w-screen bg-custom-gradient",
      "flex flex-col items-center gap-16",
      "px-6 md:px-24 py-24 md:py-36"
    )}
    >
      <h1 className="text-7xl font-bold font-kaisei text-sd-primary">SIM SHARE</h1>
      <SelectBar />
    </main>
  );
}
