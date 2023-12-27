"use client";
import { SearchBar } from "../SearchBar/SearchBar";
import SnippetList from "../SnippetList/SnippetList";
import { Snippet } from "@prisma/client";

export function SnippetSearch(p: { placeholder: string; snippets: Snippet[] }) {
  return (
    <div className="">
      <SearchBar placeholder={p.placeholder} onChange={(t) => console.log(t)} />
      {/*  a list of snippets that we can filter */}
      <div className=" overflow-y-auto h-[80vh] pb-20">
        <SnippetList snippets={p.snippets} />
      </div>
    </div>
  );
}
