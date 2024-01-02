"use client";
import { RxCopy } from "react-icons/rx";
import { Snippet } from "@prisma/client";
import { SNIPPETS_METADATA } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { toast } from "sonner";

export function SnippetCard(p: { snippet: Snippet }) {
  const progLngItem = SNIPPETS_METADATA[p.snippet.technology];

  const copyCodeToClipboard = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText("npx snipia add " + p.snippet.name);
    toast("Command copied into clipboard");
  };
  const cardBody = (
    <div className="flex flex-col justify-end h-full ">
      <div
        className="hover:bg-main-700 px-5 py-4 rounded-b-3xl"
        onClick={copyCodeToClipboard}
      >
        <div className="font-semibold text-md text-main-100 uppercase">
          {p.snippet.technology}
        </div>
        <div className="flex justify-between text-white">
          <div className="text-sm line-clamp-3  pr-1 ">{p.snippet.title}</div>
          <div className="w-5 h-5">
            <RxCopy />
          </div>
        </div>
      </div>
    </div>
  );

  const radialGradient = (
    <div
      style={{
        background: `radial-gradient(circle at center, ${progLngItem.color} 15%, #0A0B0F 70%)`,
      }}
      className={` opacity-20 absolute  h-full w-full -top-20 -left-20`}
    />
  );
  return (
    <Link
      href={`/snippets/${p.snippet.id}`}
      className="relative cursor-pointer shadow-xl bg-main-900 h-52 w-60 rounded-3xl transition transform hover:scale-105 "
    >
      <div className="overflow-hidden relative rounded-tl-3xl  h-full w-full">
        {radialGradient}
        {cardBody}
      </div>
      <Image
        className="w-24 absolute -top-10 left-10"
        src={progLngItem.src}
        alt="Prog language image"
      />
    </Link>
  );
}
