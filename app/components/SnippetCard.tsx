import { FiArrowUpRight } from "react-icons/fi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { RxCopy } from "react-icons/rx";
import { Snippet } from "@prisma/client";
import { PROG_LNG } from "@/constant";
import Image from "next/image";

export function SnippetCard(p: { snippet: Snippet }) {
  const progLngItem = PROG_LNG[p.snippet.language];
  const radialGradient = (
    <div
      style={{
        background: `linear-gradient(to bottom right, ${progLngItem.color} 5%, #0A0B0F 50%)`,
      }}
      className={`shadow-2xl rounded-3xl h-full w-full opacity-20 absolute`}
    ></div>
  );

  const cardBody = (
    <div className="px-5 py-6 flex flex-col justify-end h-full  ">
      <Image
        className="w-24 absolute -top-10 left-10"
        src={progLngItem.src}
        alt="Prog language image"
      />
      <div>
        <div className="font-semibold text-md text-main-100 uppercase">
          {p.snippet.language}
        </div>
        <div className="flex justify-between">
          <div className="text-sm">{p.snippet.title}</div>
          <RxCopy />
        </div>
      </div>
    </div>
  );
  return (
    <div className="cursor-pointer relative h-52 w-60 bg-main-900 rounded-3xl">
      {radialGradient}
      {cardBody}
    </div>
  );
}
