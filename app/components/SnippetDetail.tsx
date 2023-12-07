"use client";
import { useToast } from "@/components/ui/use-toast";
import { Snippet } from "@prisma/client";
import { MouseEvent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { RxCopy } from "react-icons/rx";

export function SnippetDetail(p: { snippet: Snippet }) {
  const { toast } = useToast();

  const copyCodeToClipboard = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(p.snippet.content);
    toast({
      duration: 1000,
      title: "Code copied into clipboard",
    });
  };
  return (
    <div>
      <div className="p-8 mt-10 w-[80‰] border-2 border-main-500 rounded-xl">
        <div className="text-2xl font-bold mb-6">{p.snippet?.title}</div>
        <div className="flex flex-col ">
          <div
            onClick={copyCodeToClipboard}
            className="self-end rounded-lg border-2 border-main-700 w-14 h-14 hover:bg-main-500 flex justify-center items-center"
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
