"use client";
import { useToast } from "@/components/ui/use-toast";
import { Snippet } from "@prisma/client";
import { MouseEvent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { RxCopy } from "react-icons/rx";
import { TECHNO_MAPPER } from "@/constant";
import Image from "next/image";
export function SnippetDetail(p: { snippet: Snippet }) {
  const { toast } = useToast();
  const progLngItem = TECHNO_MAPPER[p.snippet.technology];

  const copyCodeToClipboard = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(p.snippet.content);
    toast({
      duration: 1000,
      title: "Code copied into clipboard",
    });
  };
  return (
    <div className="p-8 mb-44 relative border-2 border-main-500 rounded-xl">
      <div>
        <div className="flex space-x-4">
          <Image
            className="w-10  -top-10 right-[10%] "
            src={progLngItem.src}
            alt="Prog language image"
          />
          <h1>{p.snippet?.title}</h1>
        </div>
        <div className="flex flex-col ">
          <div
            onClick={copyCodeToClipboard}
            className="text-white self-end rounded-lg border-2 border-main-700 w-14 h-14 hover:bg-main-500 flex justify-center items-center"
          >
            <RxCopy />
          </div>
          <SyntaxHighlighter
            showLineNumbers
            language={p.snippet.language}
            style={theme}
          >
            {p.snippet.content}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
