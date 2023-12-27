"use client";

import { SearchBar } from "../SearchBar/SearchBar";

export function SnippetSearch(p: { placeholder: string }) {
  return (
    <div>
      <SearchBar placeholder={p.placeholder} onChange={(t) => console.log(t)} />
      {/*  a list of snippets that we can filter */}
    </div>
  );
}
