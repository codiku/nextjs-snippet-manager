"use client";
import { SNIPPETS_METADATA } from "@/app/constant";
import { Snippet } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Prism as SynthaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdEdit, MdDelete } from "react-icons/md";
import { RxCopy } from "react-icons/rx";
import { toast } from "sonner";
import { MouseEvent } from "react";

export function SnippetDetail(p: { snippet: Snippet }) {
  const snippetMetadata = SNIPPETS_METADATA[p.snippet.technology];

  const copyCodeIntoClipboard = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(p.snippet.content);
    toast.info("Code copied into clipboard");
  };
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

  const actionButtons = (
    <div className="flex justify-end space-x-4">
      <Link
        href={`/snippets/update/${p.snippet.id}`}
        className="icon-box flex flex-col"
      >
        <MdEdit />
        Edit
      </Link>
      <div className="icon-box flex flex-col">
        <MdDelete />
        Delete
      </div>
      <div className="icon-box flex flex-col" onClick={copyCodeIntoClipboard}>
        <RxCopy />
        Copy
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
    </div>
  );
}
