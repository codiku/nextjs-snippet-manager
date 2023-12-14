"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "sonner";
import { Snippet } from "@prisma/client";
import { MouseEvent, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { RxCopy } from "react-icons/rx";
import { TECHNO_MAPPER } from "@/constant";
import Image from "next/image";

import ky from "ky";
import { ApiResponse } from "@/types/response";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SnippetDetail(p: { snippet: Snippet }) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const progLngItem = TECHNO_MAPPER[p.snippet.technology];
  const handleDeleteSnippet = async () => {
    setIsDialogOpen(false);
    const response = await ky
      .delete("/api/snippets/" + p.snippet.id)
      .json<ApiResponse<Snippet>>();

    toast[response.error ? "error" : "info"](
      response.error ? "Snippet created successfully" : response.message
    );
    if (!response.error) {
      router.push("/");
      router.refresh();
    }
  };
  const copyCodeToClipboard = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(p.snippet.content);
    toast("Code copied into clipboard");
  };

  const actionButtons = (
    <div className="flex justify-end">
      <Link
        href={"/snippets/update/" + p.snippet.id}
        className="icon-box self-end flex flex-col"
      >
        <MdEdit />
        Edit
      </Link>
      <div
        onClick={() => setIsDialogOpen(true)}
        className="icon-box self-end flex flex-col"
      >
        <MdDelete />
        Delete
      </div>
      <div
        onClick={copyCodeToClipboard}
        className="icon-box self-end flex flex-col"
      >
        <RxCopy />
        Copy
      </div>
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

  const confirmDeleteDialog = (
    <div
      className={`${
        isDialogOpen ? "block" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed flex justify-center items-center left-0 z-50  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-4 md:p-5 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Delete snippet ?
            </h3>
            <button
              onClick={handleDeleteSnippet}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              Yes, do it.
            </button>
            <button
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setIsDialogOpen(false)}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <div className="p-8 mb-44 relative border-2 border-main-500 rounded-xl">
        <div>
          {title}
          <div className="flex flex-col">
            {actionButtons}
            {codeHightLighter}
          </div>
        </div>
      </div>
      {confirmDeleteDialog}
    </div>
  );
}
