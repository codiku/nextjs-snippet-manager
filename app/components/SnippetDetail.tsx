"use client";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { toast } from "@/components/ui/use-toast";
import { Snippet } from "@prisma/client";
import { MouseEvent, useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ky from "ky";
import { ApiResponse } from "@/types/response";
import { useRouter } from "next/navigation";

export function SnippetDetail(p: { snippet: Snippet }) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const progLngItem = TECHNO_MAPPER[p.snippet.technology];

  const handleDeleteSnippet = async () => {
    setIsDialogOpen(false);
    const response = await ky
      .delete("/api/snippets/" + p.snippet.id)
      .json<ApiResponse<Snippet>>();

    toast({
      duration: 1000,
      description: response.message,
      variant: response.error ? "destructive" : "default",
    });
    if (!response.error) {
      router.push("/");
      router.refresh();
    }
  };
  const copyCodeToClipboard = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(p.snippet.content);
    toast({
      duration: 1000,
      description: "Code copied into clipboard",
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
        <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
          <MdOutlineDeleteOutline className="w-5 h-5 text-destructive" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const confirmDeleteDialog = (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-main-800">
            Delete snippet ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            snippet.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteSnippet}
            className="bg-destructive"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
      {confirmDeleteDialog}
    </div>
  );
}
