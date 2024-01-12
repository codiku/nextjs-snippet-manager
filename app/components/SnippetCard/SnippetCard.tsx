"use client";
import { SNIPPETS_METADATA } from "@/app/constant";
import { Snippet } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { RxCopy } from "react-icons/rx";
import { toast } from "sonner";

export function SnippetCard(p: { snippet: Snippet }) {
  const snippetMetadata = SNIPPETS_METADATA[p.snippet.technology];

  const copyCodeIntoClipboard = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(p.snippet.content);
    toast.info("Code copied into clipboard");
  };
  const radialGradient = (
    <div
      style={{
        background: `radial-gradient(circle at center, ${snippetMetadata.color} 15%, #0A0B0F 70%)`,
      }}
      className="absolute opacity-20 h-full w-full -top-20 -left-20"
    />
  );

  const cardBody = (
    <div className="flex flex-col justify-end h-full">
      <div
        className="hover:bg-main-700 px-5 py-4 rounded-b-3xl"
        onClick={copyCodeIntoClipboard}
      >
        <div className="font-semibold text-md text-main-100 uppercase">
          {p.snippet.technology}
        </div>
        <div className="flex justify-between text-white">
          <div className="text-sm">{p.snippet.title} </div>
          <RxCopy />
        </div>
      </div>
    </div>
  );
  return (
    <Link
      href={`/snippets/${p.snippet.id}`}
      className="block shadow-xl bg-main-900 h-52 w-60 rounded-3xl transition transform hover:scale-105"
    >
      <div className="overflow-hidden relative h-full w-full rounded-tl-3xl">
        {radialGradient}
        {cardBody}
      </div>
      <Image
        src={snippetMetadata.src}
        alt="Programming language"
        className="w-24 absolute -top-10 left-10"
      />
    </Link>
  );
}
