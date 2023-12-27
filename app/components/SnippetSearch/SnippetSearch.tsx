"use client";

import { SearchBar } from "../SearchBar/SearchBar";

export function SnippetSearch(p: { placeholder?: string }) {
  return (
    <div>
      <SearchBar
        placeholder={p.placeholder}
        onChange={(query) => console.log(query)}
      />
    </div>
  );
}
