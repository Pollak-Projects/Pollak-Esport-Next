import Info from "@/app/(home)/components/Info";

export default function Home() {
  return (
    // <div className="pt-[100px]">
    //   <Info />
    //   <div className="w-full bottom-10 px-10 absolute flex justify-between flex-wrap items-end gap-5 max-md:relative max-md:mt-20">
    //     <div className="text-[7rem] max-md:text-7xl leading-none  font-black">
    //       Pollák <br /> E-sport
    //     </div>
    //     <div className="text-5xl italic max-md:text-3xl">
    //       2024.11.1 - 2024.11.10
    //     </div>
    //   </div>
    // </div>

    <div className="w-full pt-[100px] pb-10 h-screen px-10 flex justify-between max-md:flex-col">
      <div className="text-[7rem] h-full items-end flex max-md:text-7xl leading-none max-md:hidden  font-black">
        Pollák <br /> E-sport
      </div>
      <div className="h-full flex justify-between flex-col">
        <Info />
        <div className="text-5xl w-full justify-end flex italic max-md:text-3xl ">
          2024.11.1 - 2024.11.10
        </div>
      </div>
    </div>
  );
}
