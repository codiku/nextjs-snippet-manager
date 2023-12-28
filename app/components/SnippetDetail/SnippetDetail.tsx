"use client";
import { Snippet } from "@prisma/client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SNIPPETS_METADATA } from "@/app/constant";
import Image from "next/image";

export function SnippetDetail(p: { snippet: Snippet }) {
  const progLngItem = SNIPPETS_METADATA[p.snippet.technology];

  const codeHightLighter = (
    <SyntaxHighlighter
      showLineNumbers
      language={p.snippet.language}
      style={theme}
    >
      {p.snippet.content}
    </SyntaxHighlighter>
  );
  const title = (
    <div className="flex space-x-4">
      <Image
        className="w-10  -top-10 right-[10%] "
        src={progLngItem.src}
        alt="Prog language image"
      />
      <h1>{p.snippet?.title}</h1>
    </div>
  );

  return (
    <div>
      <div className="p-8 mb-44 relative border-2 border-main-500 rounded-xl">
        <div>
          {title}
          <div className="flex flex-col mt-5">{codeHightLighter}</div>
        </div>
      </div>
    </div>
  );
}
