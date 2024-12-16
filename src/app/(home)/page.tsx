import Info from "@/app/(home)/components/Info";
import { cn } from "@/lib/utils";

const showInfo = false;

export default function Home() {
  return (
    <div className="w-full pt-[100px] pb-10 h-screen px-10 flex justify-between max-md:flex-col">
      <div
        className={cn(
          "text-[7rem] h-full items-end flex max-md:text-7xl leading-none font-black",
          { "max-md:hidden": showInfo }
        )}
      >
        Pollák <br /> E-sport
      </div>
      <div className="h-full flex justify-between flex-col">
        {showInfo ? <Info /> : <div></div>}

        <div className="text-5xl w-full justify-end flex italic max-md:text-3xl ">
          2024.11.1 - 2024.11.10
        </div>
      </div>
    </div>
  );
}
