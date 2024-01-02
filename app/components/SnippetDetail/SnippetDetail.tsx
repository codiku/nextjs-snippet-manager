"use client";
import { SNIPPETS_METADATA } from "@/app/constant";
import { $Enums, Snippet } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Prism as SynthaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdEdit, MdDelete } from "react-icons/md";
import { RxCopy } from "react-icons/rx";
import { toast } from "sonner";
import { MouseEvent, useState } from "react";
import { deleteSnippet } from "@/app/api/snippet/[id]/service";
import { useRouter } from "next/navigation";

export function SnippetDetail(p: { snippet: Snippet }) {
  const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);
  const snippetMetadata = SNIPPETS_METADATA[p.snippet.technology];
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();
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
      <div
        className="icon-box flex flex-col"
        onClick={() => setShowDeleteDialog(true)}
      >
        <MdDelete />
        Delete
      </div>
      <div className="icon-box flex flex-col" onClick={copyCodeIntoClipboard}>
        <RxCopy />
        Copy
      </div>
    </div>
  );

  const handleDeleteSnippet = async () => {
    const { data } = await deleteSnippet(p.snippet.id);
    if (data) {
      toast.success("Snippet deleted successfully");
      router.refresh();
      router.push("/");
    }
  };

  const deleteDialog = (
    <div className="top-0 left-0 fixed h-screen w-screen bg-main-600/50">
      <div className="p-8 rounded-lg flex shadow-xl flex-col items-center justify-center absolute top-72 h-56 left-[40%] bg-white">
        <div className="text-xl font-bold mb-4">Delete snippet</div>
        <div>Are you sure you want to delete the snippet ?</div>
        <div className="space-x-20 mt-14">
          <button
            className="bg-main-400 hover:bg-main-400/80"
            onClick={() => setShowDeleteDialog(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-400 hover:bg-red-400/80"
            onClick={handleDeleteSnippet}
          >
            Delete
          </button>
        </div>
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
      {showDeleteDialog && deleteDialog}
    </div>
  );
}
