import Info from "@/components/Info";

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-t via-purple-900/30 from-purple-950/60 via-10% pt-10  to-70% to-background h-full">
      <Info />
      <div className="w-full bottom-10 px-10 absolute flex justify-between flex-wrap items-end gap-5">
        <div className="text-[7rem] max-md:text-7xl leading-none  font-black">
          Pollák <br /> Esport
        </div>
        <div className="text-5xl italic max-md:text-3xl">
          2024.11.1 - 2024.11.10
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="w-full bg-gradient-to-t via-purple-900/30 from-purple-950/60 via-10% to-70% to-slate-950 h-full pt-10">
<div className="flex flex-col gap-10">
  <div className="flex items-center justify-center  gap-10">
    <div className="">
      <Image src={logo} alt="logo" width={250} height={250} />
    </div>
    <div className="text-[8rem] max-md:text-7xl leading-none font-black">
      Pollák <br /> Esport
    </div>
  </div>
  <div className="italic text-3xl text-center">
    2024.11.1 - 2024.11.10
  </div>
</div>
</div> */
}
