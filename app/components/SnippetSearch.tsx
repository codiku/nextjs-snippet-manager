"use client";
import { SearchBar } from "@/components/SearchBar";
import SnippetList from "@/components/SnippetList";
import { Snippet } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

export function SnippetSearch(p: { snippets: Snippet[] }) {
  const [snippets] = useState<Snippet[]>(p.snippets);
  const [currSearchQuery, setCurrSearchQuery] = useState<string>("");
  const filteredSnippets = snippets.filter((s) =>
    [s.language, s.title, s.content].some((field) =>
      field.toLowerCase().includes(currSearchQuery?.toLowerCase())
    )
  );

  return (
    <main className="flex flex-col h-[90vh] ">
      <SearchBar onChange={setCurrSearchQuery} />
      <div className="overflow-y-auto ">
        {filteredSnippets.length > 0 ? (
          <SnippetList snippets={filteredSnippets} />
        ) : (
          <div className="h-full flex flex-col justify-center items-center">
            {"You don't have any snippet !"}
            <Link
              href="/snippets/create"
              className="underline underline-offset-4 text-white;"
            >
              Start by creating one
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
