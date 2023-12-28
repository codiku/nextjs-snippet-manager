"use client";
import { SNIPPETS_METADATA } from "@/app/constant";
import { Snippet } from "@prisma/client";
import Image from "next/image";
import { Prism as SynthaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdDelete, MdEdit } from "react-icons/md";
import { RxCopy } from "react-icons/rx";
import Link from "next/link";
import { MouseEvent } from "react";
import { toast } from "sonner";

export function SnippetDetail(p: { snippet: Snippet }) {
  const snippetMetadata = SNIPPETS_METADATA[p.snippet.technology];

  const copyCodeToClipboard = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(p.snippet.content);
    toast("Code copied into clipboard");
  };

  const actionButtons = (
    <div className="flex justify-end space-x-4">
      <Link
        href={"/snippets/update/" + p.snippet.id}
        className="icon-box self-end flex flex-col"
      >
        <MdEdit />
        Edit
      </Link>
      <div className="icon-box self-end flex flex-col">
        <MdDelete />
        Delete
      </div>
      <div
        className="icon-box self-end flex flex-col"
        onClick={copyCodeToClipboard}
      >
        <RxCopy />
        Copy
      </div>
    </div>
  );

  const codeHighLighter = (
    <SynthaxHighlighter
      showLineNumbers
      style={theme}
      language={p.snippet.language}
    >
      {p.snippet.content}
    </SynthaxHighlighter>
  );
  const title = (
    <div className="flex space-x-4">
      <Image
        className="w-10"
        src={snippetMetadata.src}
        alt="Programming language image"
      />
      <h1>{p.snippet.title}</h1>
    </div>
  );

  const deleteDialog = (
    <div className="p-8 rounded-lg flex shadow-xl flex-col items-center justify-center absolute top-72 h-56 left-[40%] bg-white">
      <div className="text-xl font-bold mb-4">Delete snippet</div>
      <div>Are you sure you want to delete the snippet ?</div>
      <div className="space-x-20 mt-14">
        <button className="bg-main-400">Cancel</button>
        <button className="bg-red-500 hover:bg-red-500/80">Delete</button>
      </div>
    </div>
  );

  return (
    <div>
      {title}
      <div className="mt-10">
        {actionButtons}
        {codeHighLighter}
      </div>
      {deleteDialog}
    </div>
  );
}
