"use client";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { toast, useToast } from "@/components/ui/use-toast";
import { Snippet } from "@prisma/client";
import { MouseEvent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { RxCopy } from "react-icons/rx";
import { TECHNO_MAPPER } from "@/constant";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export function SnippetDetail(p: { snippet: Snippet }) {
  const progLngItem = TECHNO_MAPPER[p.snippet.technology];

  const copyCodeToClipboard = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(p.snippet.content);
    toast({
      duration: 1000,
      title: "Code copied into clipboard",
    });
  };

  const buttonCopyClipboard = (
    <div onClick={copyCodeToClipboard} className="icon-box self-end">
      <RxCopy />
    </div>
  );

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

  const dropdownMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger className="icon-box focus-visible:border-0">
        <BiDotsVerticalRounded className="w-7 h-7" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Update</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  return (
    <div>
      <div className="flex justify-end mx-1 my-4">{dropdownMenu}</div>
      <div className="p-8 mb-44 relative border-2 border-main-500 rounded-xl">
        <div>
          {title}
          <div className="flex flex-col">
            {buttonCopyClipboard}
            {codeHightLighter}
          </div>
        </div>
      </div>
    </div>
  );
}
