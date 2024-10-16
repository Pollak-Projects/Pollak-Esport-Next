import Info from "@/app/(home)/components/Info";

export default function Home() {
  return (
    <>
      <Info />
      <div className="w-full bottom-10 px-10 absolute flex justify-between flex-wrap items-end gap-5 max-md:relative max-md:mt-20">
        <div className="text-[7rem] max-md:text-7xl leading-none  font-black">
          Pollák <br /> E-sport
        </div>
        <div className="text-5xl italic max-md:text-3xl">
          2024.11.1 - 2024.11.10
        </div>
      </div>
    </>
  );
}
