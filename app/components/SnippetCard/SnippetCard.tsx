"use client";
import { RxCopy } from "react-icons/rx";
import { Snippet } from "@prisma/client";
import { SNIPPETS_METADATA } from "@/app/constant";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { toast } from "sonner";
import tailwindConf from "@/tailwind.config";
const colors = tailwindConf.theme.extend.colors;
export function SnippetCard(p: { snippet: Snippet }) {
  const snippetMetaData = SNIPPETS_METADATA[p.snippet.technology];

  const copyCodeToClipboard = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(p.snippet.content);
    toast("Code copied into clipboard");
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
        <div className="flex justify-between text-white  ">
          <div className="text-sm ">{p.snippet.title}</div>
          <RxCopy />
        </div>
      </div>
    </div>
  );

  const radialGradient = (
    <div
      style={{
        background: `radial-gradient(circle at center, ${snippetMetaData.color} 15%, ${colors.main[900]} 70%)`,
      }}
      className={` opacity-20 absolute  h-full w-full -top-20 -left-20`}
    />
  );
  return (
    <Link
      href={`#`}
      className="block shadow-xl bg-main-900 h-52 w-60 rounded-3xl transition transform hover:scale-105"
    >
      <div className="overflow-hidden relative rounded-tl-3xl h-full">
        {radialGradient}
        {cardBody}
      </div>
      <Image
        className="w-24 absolute -top-10 left-10"
        src={snippetMetaData.src}
        alt="Prog language image"
      />
    </Link>
  );
}
